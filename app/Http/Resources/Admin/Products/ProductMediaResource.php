<?php

namespace App\Http\Resources\Admin\Products;

use App\Models\ProductMedia;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

/**
 * @mixin ProductMedia
 */
class ProductMediaResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'product_id' => $this->product_id,
            'product' => $this->whenLoaded('product', fn() => ProductResource::make($this->product)),
            'type' => $this->type,
            'provider' => $this->provider,
            'order' => $this->order,
            'url' => Storage::url($this->path)
        ];
    }
}
