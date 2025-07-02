<?php

namespace App\Traits;

use Illuminate\Support\Facades\Log;
use Throwable;

trait Reportable
{
    public function reportError(Throwable $exception, string $channel = 'single'): void
    {
        Log::channel($channel)->error(
            $exception->getMessage(),
            [
                'file' => $exception->getFile(),
                'line' => $exception->getLine(),
                'trace' => $exception->getTraceAsString(),
            ]
        );
    }
}
