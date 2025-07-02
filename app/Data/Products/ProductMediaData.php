<?php

namespace App\Data\Products;

use Illuminate\Http\UploadedFile;
use Illuminate\Validation\Rule;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\MergeValidationRules;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\LaravelData\Support\Validation\ValidationContext;

#[MergeValidationRules]
#[MapName(SnakeCaseMapper::class)]
class ProductMediaData extends Data
{
    public function __construct(
        public ?int $id = null,
        public ?UploadedFile $file = null,
        public int $order = 0,
        public bool $delete = false,
    ) {
    }

    public static function rules(ValidationContext $context): array
    {
        return [
            'id' => [
                'nullable',
                Rule::requiredIf(static fn() => data_get($context->fullPayload, 'file') === null),
                'exists:product_media,id'
            ],
            'file' => [
                'nullable',
                'max:2048',
                'image',
                Rule::requiredIf(static fn() => data_get($context->fullPayload, 'id') === null)
            ],
        ];
    }
}
