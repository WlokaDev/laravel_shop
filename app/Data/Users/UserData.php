<?php

namespace App\Data\Users;

use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\MergeValidationRules;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\LaravelData\Support\Validation\ValidationContext;

#[MergeValidationRules]
#[MapName(SnakeCaseMapper::class)]
class UserData extends Data
{
    public function __construct(
        public string $name,
        public string $email,
        public ?string $password = null
    ) {
    }

    public static function rules(ValidationContext $context = null): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['nullable', 'string', 'min:8', 'confirmed']
        ];
    }
}
