<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property-read int $total
 * @property-read int $count
 * @property-read int $per_page
 * @property-read int $current_page
 * @property-read int $last_page
 */
class PaginationResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'total' => $this->total,
            'count' => $this->count,
            'per_page' => $this->per_page,
            'current_page' => $this->current_page,
            'total_pages' => $this->last_page,
        ];
    }
}
