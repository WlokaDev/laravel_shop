<?php

namespace App\Http\Controllers;

use App\Http\Resources\Admin\Products\ProductResource;
use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function show(Product $product): Response
    {
        $product->loadMissing('category', 'media');

        return Inertia::render('Products/Details/Page', [
            'product' => ProductResource::make($product),
        ]);
    }
}
