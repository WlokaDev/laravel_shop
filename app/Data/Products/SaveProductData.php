<?php

namespace App\Data\Products;

use App\Enums\ProductStatusEnum;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\MergeValidationRules;
use Spatie\LaravelData\Attributes\Validation\Exists;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Casts\EnumCast;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\LaravelData\Support\Validation\ValidationContext;

#[MergeValidationRules]
#[MapName(SnakeCaseMapper::class)]
class SaveProductData extends Data
{
    public function __construct(
        #[Exists(Category::class, 'id')]
        public int $categoryId,
        public string $name,
        public ?string $description = null,
        public ?float $price = null,
        public ?float $discountedPrice = null,
        public ?string $sku = null,
        #[WithCast(EnumCast::class)]
        public ProductStatusEnum $status,
        #[DataCollectionOf(ProductMediaData::class)]
        public ?DataCollection $media = null,
    ) {
    }

    public static function rules(ValidationContext $context = null): array
    {
        return [
            'category_id' => ['required', 'integer'],
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'price' => ['required_if:status,active', 'numeric', 'min:0'],
            'discounted_price' => ['nullable', 'numeric', 'min:0'],
            'sku' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique(Product::class, 'sku')->ignore(request()->route('product'))
            ],
            'status' => ['required', new Enum(ProductStatusEnum::class)],
            'media' => ['nullable', 'array'],
        ];
    }

    public function toArray(): array
    {
        return [
            ...parent::toArray(),
            'price' => $this->price !== null ? $this->price * 100 : null,
            'discounted_price' => $this->discountedPrice !== null ? $this->discountedPrice * 100 : null,
        ];
    }
}
