<?php

namespace App\Repositories;

use App\Interfaces\Repositories\CartRepositoryInterface;
use App\Models\Cart;
use Illuminate\Support\Facades\Auth;

class CartRepository implements CartRepositoryInterface
{
    public function getCartByUuid(string $uuid): ?Cart
    {
        // TODO: Implement getCartByUuid() method.
    }

    public function getCartByUser(Auth $user): ?Cart
    {
        // TODO: Implement getCartByUser() method.
    }
}
