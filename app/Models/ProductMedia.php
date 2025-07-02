<?php

namespace App\Models;

use App\Enums\MediaProviderEnum;
use App\Enums\MediaTypeEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;

/**
 * @property-read int $id
 * @property MediaProviderEnum $provider
 * @property int $product_id
 * @property MediaTypeEnum $type
 * @property string $path
 * @property int $order
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property Carbon|null $deleted_at
 *
 * @property-read Product $product
 */
class ProductMedia extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $guarded = ['id'];
    
    protected $casts = [
        'provider' => MediaProviderEnum::class,
        'type' => MediaTypeEnum::class,
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
