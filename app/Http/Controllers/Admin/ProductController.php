<?php

namespace App\Http\Controllers\Admin;

use App\Data\Products\SaveProductData;
use App\Enums\ResponseCodeEnum;
use App\Http\Resources\Admin\Categories\CategoryResource;
use App\Http\Resources\Admin\Products\ProductCollection;
use App\Http\Resources\Admin\Products\ProductResource;
use App\Interfaces\Repositories\ProductRepositoryInterface;
use App\Interfaces\Services\ProductServiceInterface;
use App\Models\Category;
use App\Models\Product;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function __construct(
        private readonly ProductRepositoryInterface $productRepository,
        private readonly ProductServiceInterface $productService
    ) {
    }

    public function index(Request $request): Response|RedirectResponse
    {
        $data = $this->productRepository->paginateWithSearch(
            false
        );

        if ($request->get('page', 1) > $data->lastPage()) {
            return response()->redirectToRoute('admin.products.index', [
                ...$request->query(),
                'page' => $data->lastPage()
            ]);
        }

        return Inertia::render('Admin/Products/List/Page', [
            'query_params' => $request->query(),
            'data' => ProductCollection::make($data)
        ]);
    }

    public function create(): Response
    {
        $categories = CategoryResource::collection(
            Category::all()
        );

        return Inertia::render('Admin/Products/Create/Page', [
            'categories' => $categories
        ]);
    }

    public function store(SaveProductData $data): RedirectResponse
    {
        try {
            $this->productService->assignAttributes($data);

            return response()->redirectToRoute('admin.products.index');
        } catch (Exception $exception) {
            $this->reportError($exception);

            return back()->with('response', [
                'code' => ResponseCodeEnum::BAD_REQUEST,
            ]);
        }
    }

    public function edit(Product $product): Response
    {
        $product->loadMissing('category', 'media');

        $categories = CategoryResource::collection(
            Category::all()
        );

        return Inertia::render('Admin/Products/Edit/Page', [
            'product' => ProductResource::make($product),
            'categories' => $categories
        ]);
    }

    public function update(SaveProductData $data, Product $product): RedirectResponse
    {
        try {
            $this->productService
                ->setProduct($product)
                ->assignAttributes($data);

            return response()->redirectToRoute('admin.products.index');
        } catch (Exception $exception) {
            $this->reportError($exception);

            return back()->with('response', [
                'code' => ResponseCodeEnum::BAD_REQUEST,
            ]);
        }
    }

    public function destroy(Product $product): RedirectResponse
    {
        try {
            $this->productService->setProduct($product)->delete();

            return back()->with('response', [
                'code' => ResponseCodeEnum::OK,
            ]);
        } catch (Exception $exception) {
            $this->reportError($exception);

            return back()->with('response', [
                'code' => ResponseCodeEnum::BAD_REQUEST,
            ]);
        }
    }
}
