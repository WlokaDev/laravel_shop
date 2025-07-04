<?php

namespace App\Http\Controllers;

use App\Data\Auth\LoginData;
use App\Enums\ResponseCodeEnum;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class AuthController extends Controller
{
    public function loginView(): Response
    {
        return Inertia::render('Auth/Login/Page');
    }

    public function login(LoginData $data): RedirectResponse
    {
        try {
            if (Auth::attempt($data->only('email', 'password')->toArray())) {
                session()?->regenerate();

                return redirect()->route('home');
            }

            return back()->with('response', [
                'status' => ResponseCodeEnum::UNAUTHORIZED,
            ]);
        } catch (Exception $e) {
            $this->reportError($e);

            return back()->with('response', [
                'status' => ResponseCodeEnum::BAD_REQUEST
            ]);
        }
    }

    public function logout(Request $request): RedirectResponse
    {
        try {
            auth()->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return response()->redirectToRoute('home');
        } catch (Exception $exception) {
            $this->reportError($exception);

            return back()->with('response', [
                'code' => ResponseCodeEnum::BAD_REQUEST
            ]);
        }
    }
}
