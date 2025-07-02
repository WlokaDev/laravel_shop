<?php

namespace App\Http\Middleware;

use App\Http\Resources\AuthResource;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'flash' => [
                'response' => fn() => $request->session()->get('response', []),
            ],
            'locale' => app()->getLocale(),
            'auth' => fn() => $request->user() ? AuthResource::make($request->user()) : null,
            'translations' => fn() => array_merge(
                [
                    'form' => __('form'),
                    'validation' => __('validation'),
                    'utils' => __('utils'),
                ],
                $request->when($this->isAdmin($request), fn() => [
                    'products' => __('admin/products'),
                    'layout' => __('admin/layout'),
                ], fn() => [
                    'auth' => __('auth'),
                    'layout' => __('layout'),
                ])
            )
        ];
    }

    private function isAdmin(Request $request): bool
    {
        return str($request->path())->startsWith('admin');
    }
}
