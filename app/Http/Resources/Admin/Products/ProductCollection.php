<?php

namespace App\Http\Resources\Admin\Products;

use App\Http\Resources\PaginationResource;
use App\Http\Resources\ResourceCollection;

class ProductCollection extends ResourceCollection
{
    public function toArray(): array
    {
        return [
            'data' => ProductResource::collection($this->collection),
            'pagination' => PaginationResource::make($this->resource),
        ];
    }
}
