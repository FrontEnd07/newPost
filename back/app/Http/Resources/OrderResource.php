<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class OrderResource extends JsonResource
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
                    'link' => $item->link,
                    'price' => $item->price,
                    'quantity' => $item->quantity,
                    'image' => asset('storage/' . $item->image),
                    'parametrs' => $item->parametrs,
                    'date' => $item->created_at,
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
