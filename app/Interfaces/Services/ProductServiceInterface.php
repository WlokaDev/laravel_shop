<?php

namespace App\Interfaces\Services;

use App\Data\Products\SaveProductData;
use App\Models\Product;

interface ProductServiceInterface
{
    public function assignAttributes(SaveProductData $data): self;

    public function getProduct(): Product;

    public function setProduct(Product $product): self;

    public function delete(): void;
}
