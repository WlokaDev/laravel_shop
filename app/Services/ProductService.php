<?php

namespace App\Services;

use App\Data\Products\ProductMediaData;
use App\Data\Products\SaveProductData;
use App\Enums\MediaProviderEnum;
use App\Enums\MediaTypeEnum;
use App\Interfaces\Services\ProductServiceInterface;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Spatie\LaravelData\DataCollection;

class ProductService implements ProductServiceInterface
{
    public function __construct(private Product $product = new Product())
    {
    }

    public function assignAttributes(SaveProductData $data): ProductServiceInterface
    {
        DB::transaction(function () use ($data) {
            $this->product
                ->fill($data->except('media')->toArray())
                ->user()->associate(auth()->user())
                ->save();

            if ($data->media) {
                $this->syncMedia($data->media);
            }
        });

        return $this;
    }

    private function syncMedia(DataCollection $dataCollection): void
    {
        // Media to delete
        $idsToDelete = $dataCollection->toCollection()->whereNotNull('id')->where('delete', true)->pluck('id');
        $mediaToDelete = $this->product->media()->whereIn('id', $idsToDelete)->get();

        foreach ($mediaToDelete as $media) {
            Storage::disk($media->provider)->delete($media->path);
            $media->forceDelete();
        }

        // Media to reorder
        $dataCollection
            ->toCollection()
            ->whereNotNull('id')
            ->where('delete', false)
            ->each(fn(ProductMediaData $media) => $this->product->media()->where('id', $media->id)->update([
                'order' => $media->order
            ]));

        // Media to create
        $dataCollection
            ->toCollection()
            ->whereNull('id')
            ->each(function (ProductMediaData $media) {
                $path = $media->file->store(sprintf('/products/%s', $this->product->getKey()));

                $this->product->media()->create([
                    'type' => MediaTypeEnum::IMAGE,
                    'provider' => MediaProviderEnum::from(config('filesystems.default')),
                    'path' => $path,
                    'order' => $media->order,
                ]);
            });
    }

    public function delete(): void
    {
        DB::transaction(function () {
            $this->product->media()->delete();
            $this->product->delete();
        });
    }

    public function getProduct(): Product
    {
        return $this->product;
    }

    public function setProduct(Product $product): ProductServiceInterface
    {
        $this->product = $product;

        return $this;
    }
}
