<?php

namespace App\Http\Resources\Admin\Products;

use App\Http\Resources\Admin\Categories\CategoryResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Product
 */
class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'category' => $this->whenLoaded('category', fn() => CategoryResource::make($this->category)),
            'category_id' => $this->category_id,
            'slug' => $this->slug,
            'description' => $this->description,
            'price' => $this->price,
            'status' => $this->status,
            'discounted_price' => $this->discounted_price,
            'sku' => $this->sku,
            'created_at' => $this->created_at,
            'media' => $this->whenLoaded('media', fn() => ProductMediaResource::collection($this->media)),
            'main_media' => $this->whenLoaded('mainMedia', fn() => ProductMediaResource::make($this->mainMedia)),
        ];
    }
}
