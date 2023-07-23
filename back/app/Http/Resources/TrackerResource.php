<?php

namespace App\Http\Resources;

use App\Http\Requests\Api\Auth\AddressRequest;
use Illuminate\Http\Resources\Json\JsonResource;

class TrackerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'data' => $this->resource->map(function ($item) {
                return [
                    'id' => $item->id,
                    'name' => $item->name,
                    'tracker' => $item->tracker,
                    'street' => $item->streetId,
                    'quantity' => $item->quantity,
                    'date' => $item->created_at,
                    'address' => $item->address ? new AddressInstanceResource($item->address) : null
                ];
            }),
            'meta' => [
                'total' => $this->resource->total(),
                'perPage' => $this->resource->perPage(),
                'currentPage' => $this->resource->currentPage(),
                'lastPage' => $this->resource->lastPage(),
            ],
        ];
    }
}
