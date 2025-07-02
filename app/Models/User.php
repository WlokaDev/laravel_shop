<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $name
 * @property string $email
 * @property string $password
 * @property-read Carbon $email_verified_at
 * @property string|null $remember_token
 * @property string|null $role
 * @property-read Carbon $created_at
 * @property-read Carbon $updated_at
 * @property-read bool $is_admin
 *
 * @property-read Cart|null $cart
 */
class User extends Authenticatable
{
    use HasFactory;
    use Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function cart(): HasOne
    {
        return $this->hasOne(Cart::class);
    }

    public function isAdmin(): Attribute
    {
        return Attribute::get(fn() => $this->role === 'admin');
    }

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
