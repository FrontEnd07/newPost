<?php

namespace App\Http\Controllers\Api\Auth\Tracker;

use App\Models\Tracker;
use App\Http\Controllers\Controller;
use App\Http\Resources\TrackerResource;
use App\Http\Requests\Api\Auth\TrackerRequest;

class AddTrackerController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(TrackerRequest $request)
    {
        $user = $request->user()->id;
        $adding = Tracker::create(array_merge(
            $request->only("tracker", "name", "quantity", "streetId"),
            ['userId' => $user],
        ));

        $limit = $request->perPage ? $request->perPage : 10;

        $resource = new TrackerResource(
            $adding->where(["userId" => $user])
                ->orderBy("id")
                ->paginate($limit)
        );

        return response()->json([
            "status" => true,
            "body" => $resource,
            "message" => "Трекер добавлен"
        ]);
    }
}
