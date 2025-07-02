<?php

namespace App\Providers;

use App\Interfaces\Services\ProductServiceInterface;
use App\Services\ProductService;
use Illuminate\Support\ServiceProvider as SupportServiceProvider;

class ServiceProvider extends SupportServiceProvider
{
    public $bindings = [
        ProductServiceInterface::class => ProductService::class,
    ];
}
