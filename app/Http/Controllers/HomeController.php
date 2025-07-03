<?php

namespace App\Http\Controllers;

use App\Http\Resources\Admin\Products\ProductCollection;
use App\Interfaces\Repositories\ProductRepositoryInterface;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __construct(private readonly ProductRepositoryInterface $productRepository)
    {
    }

    public function index(Request $request): Response|RedirectResponse
    {
        return Inertia::render('Home/Page', [
            'data' => ProductCollection::make(
                $this->productRepository->paginateWithSearch()
            )
        ]);
    }
}
