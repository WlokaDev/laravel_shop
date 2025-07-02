<?php

namespace App\Repositories;

use App\Enums\ProductStatusEnum;
use App\Interfaces\Repositories\ProductRepositoryInterface;
use App\Models\Product;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class ProductRepository implements ProductRepositoryInterface
{
    public function paginateWithSearch(bool $onlyActive = true): LengthAwarePaginator
    {
        return QueryBuilder::for(Product::class)
            ->when($onlyActive, fn(Builder $query) => $query->where('status', ProductStatusEnum::ACTIVE))
            ->allowedFilters([
                AllowedFilter::callback('search', static fn(Builder $query, string $value) => $query
                    ->where('name', 'like', sprintf('%%%s%%', $value))
                    ->orWhere('description', 'like', sprintf('%%%s%%', $value))
                    ->orWhere('sku', 'like', sprintf('%%%s%%', $value))
                ),
            ])
            ->with('mainMedia')
            ->paginate();
    }
}
