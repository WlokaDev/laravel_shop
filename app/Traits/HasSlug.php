<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Model;
use RuntimeException;

/**
 * @property string $slug
 */
trait HasSlug
{
    public static function bootHasSlug(): void
    {
        static::saved(static function (Model $model) {
            if (method_exists($model, 'generateSlug')) {
                if (!$model->slug || $model->isDirty('name')) {
                    $model->slug = $model->generateSlug($model);
                    $model->saveQuietly();
                }
            }
        });
    }

    private function generateSlug(): string
    {
        if (!$this->id) {
            throw new RuntimeException('Cannot generate slug for unsaved model.');
        }

        return str($this->getAttribute($this->slugColumn ?? 'name'))
            ->append(sprintf('-%d', $this->id))
            ->slug();
    }
}
