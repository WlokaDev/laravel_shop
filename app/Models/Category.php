<?php

namespace App\Models;

use App\Traits\HasSlug;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;

/**
 * @property-read int $id
 * @property string $name
 * @property string $slug
 * @property-read Carbon $created_at
 * @property-read Carbon $updated_at
 *
 * @property-read Collection|Product[] $products
 */
class Category extends Model
{
    use SoftDeletes;
    use HasFactory;
    use HasSlug;

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }
}
