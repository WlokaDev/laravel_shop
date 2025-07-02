<?php

namespace App\Interfaces\Repositories;

use Illuminate\Pagination\LengthAwarePaginator;

interface ProductRepositoryInterface
{
    public function paginateWithSearch(bool $onlyActive = true): LengthAwarePaginator;
}
