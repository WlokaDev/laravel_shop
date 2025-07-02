<?php

namespace App\Models;

use App\Enums\ProductStatusEnum;
use App\Traits\HasSlug;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;

/**
 * @property-read int $id
 * @property string $name
 * @property ProductStatusEnum $status
 * @property int $category_id
 * @property string $slug
 * @property string|null $description
 * @property int|null $price
 * @property int|null $discounted_price
 * @property string|null $sku
 * @property-read Carbon $created_at
 * @property-read Carbon $updated_at
 *
 * @property-read Category $category
 * @property-read User $user
 * @property-read ProductMedia[]|Collection $media
 * @property-read ProductMedia|null $mainMedia
 */
class Product extends Model
{
    use HasFactory;
    use SoftDeletes;
    use HasSlug;

    protected $guarded = ['id'];

    protected $casts = [
        'status' => ProductStatusEnum::class,
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function media(): HasMany
    {
        return $this->hasMany(ProductMedia::class);
    }

    public function mainMedia(): HasOne
    {
        return $this->hasOne(ProductMedia::class)->where('order', 0);
    }
}
