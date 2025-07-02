<?php

namespace App\Traits;

trait Equatable
{
    public function isNot(self|array $value): bool
    {
        return !$this->is($value);
    }

    public function is(self|array $value): bool
    {
        if (is_array($value)) {
            return in_array($this, $value, true);
        }

        return $this === $value;
    }
}
