<?php

namespace App\Interfaces\Repositories;

use App\Models\Cart;
use Illuminate\Support\Facades\Auth;

interface CartRepositoryInterface
{
    public function getCartByUuid(string $uuid): ?Cart;

    public function getCartByUser(Auth $user): ?Cart;
}
