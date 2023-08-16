<?php

namespace App\Http\Controllers\Api\Auth\Admin;

use App\Http\Resources\AdminTrackerResource;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\AdminTracker;
use App\Models\Status;

class DeleteAdminTrackerController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $limit = $request->perPage ? $request->perPage : 5;
        $idsToDelete = $request->input();
        $sortBy = $request->sort ? $request->sort : 'created_at';
        $search = $request->search ? $request->search : '';

        Status::whereIn('tracker_id', $idsToDelete)
            ->delete();

        AdminTracker::whereIn('id', $idsToDelete)
            ->delete();

        $trackers =  AdminTracker::where(function ($query) use ($search) {
            $query->where('tracker', 'like', "%$search%");
        })
            ->with('userTracker')
            ->orderBy($sortBy, 'DESC')
            ->paginate($limit);

        $resource = new AdminTrackerResource($trackers);

        return response()->json([
            "status" => true,
            "body" => $resource,
            "message" => "Трекер удален!"
        ]);
    }
}
