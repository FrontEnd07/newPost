<?php

namespace App\Http\Controllers\Api\Auth\Tracker;

use App\Http\Resources\TrackerResource;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Tracker;

class GetTrackerController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $user = $request->user()->id;

        $limit = $request->perPage ? $request->perPage : 10;
        $sortBy = $request->sort ? $request->sort : 'created_at';
        $search = $request->search ? $request->search : '';

        $trackers = Tracker::join('addresses', 'trackers.streetId', '=', 'addresses.id')
            ->when($sortBy === 'street', function ($query) {
                $query->orderBy('addresses.street', 'DESC');
            })
            ->when($request->search, function ($query) use ($search) {
                $query->where(function ($innerQuery) use ($search) {
                    $innerQuery->where('trackers.name', 'LIKE', "%{$search}%")
                        ->orWhere('trackers.tracker', 'LIKE', "%{$search}%")
                        ->orWhere('addresses.street', 'LIKE', "%{$search}%");
                });
            })
            ->when($sortBy !== "street", function ($query) use ($user, $sortBy) {
                $query->orderBy('trackers.' . $sortBy, 'DESC');
            })
            ->where('trackers.userId', $user)
            ->paginate($limit, ['trackers.*']);

        $resource = new TrackerResource($trackers);

        return response()->json([
            "status" => true,
            "body" => $resource,
        ]);
    }
}
