<?php

namespace App\Http\Resources;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use JsonSerializable;
use Throwable;

abstract class ResourceCollection implements Arrayable, JsonSerializable
{
    protected mixed $resource;

    protected Collection $collection;

    /**
     * @throws Throwable
     */
    public function __construct(LengthAwarePaginator $data)
    {
        $this->resource = $this->collectResource($data);
        $this->collection = $data->getCollection();
    }

    /**
     * @throws Throwable
     */
    private function collectResource(LengthAwarePaginator $data): object
    {
        return (object)[
            'total' => $data->total(),
            'per_page' => $data->perPage(),
            'current_page' => $data->currentPage(),
            'last_page' => $data->lastPage(),
            'count' => $data->count(),
        ];
    }

    /**
     * @throws Throwable
     */
    final public static function make(LengthAwarePaginator $data): self
    {
        return new static($data);
    }

    public function jsonSerialize(): array
    {
        return $this->toArray();
    }
}
