<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\User;
use App\Models\AdminTracker;

class AdminTrackerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return  [
            "item" =>  $this->resource->map(function ($item) {
                return [
                    'id' => $item->id,
                    'tracker' => $item->tracker,
                    'image' => $item->image ? asset('storage/' . $item->image) : null,
                    'user' => $item->userData ? ["name" => $item->userData->name, "phone" => $item->userData->phone] : null,
                    'date' => $item->created_at,
                    'userTrackerInfo' => $item->userTracker ? ["name" => $item->userTracker->user->name, "phone" => $item->userTracker->user->phone] : null,
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
