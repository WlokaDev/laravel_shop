<?php

namespace App\Providers;

use App\Interfaces\Repositories\CartRepositoryInterface;
use App\Interfaces\Repositories\ProductRepositoryInterface;
use App\Repositories\CartRepository;
use App\Repositories\ProductRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    public $bindings = [
        ProductRepositoryInterface::class => ProductRepository::class,
        CartRepositoryInterface::class => CartRepository::class,
    ];
}
