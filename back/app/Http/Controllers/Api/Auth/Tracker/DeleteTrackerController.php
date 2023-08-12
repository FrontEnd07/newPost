<?php

namespace App\Http\Controllers\Api\Auth\Tracker;

use App\Http\Resources\TrackerResource;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Tracker;

class DeleteTrackerController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $limit = $request->perPage ? $request->perPage : 10;
        $idsToDelete = $request->input();
        $user = $request->user()->id;

        Tracker::where('userId', $user)
            ->whereIn('id', $idsToDelete)
            ->delete();

        $trackers = Tracker::where(["userId" => $user])
            ->orderBy('created_at')
            ->paginate($limit);

        $resource = new TrackerResource($trackers);

        return response()->json([
            "status" => true,
            "body" => $resource,
        ]);
    }
}
