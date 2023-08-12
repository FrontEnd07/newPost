<?php

namespace App\Http\Controllers\Api\Auth\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\AdminTracker;
use App\Http\Resources\AdminTrackerResource;

class GetAdminTrackerController extends Controller
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
        $limit = $request->perPage ? $request->perPage : 5;
        $sortBy = $request->sort ? $request->sort : 'created_at';
        $search = $request->search ? $request->search : '';

        $getTracket = AdminTracker::where(function ($query) use ($search) {
            $query->where('tracker', 'like', "%$search%");
        })
            ->with('userTracker')
            ->orderBy($sortBy, 'DESC')
            ->paginate($limit);

        $resource = new AdminTrackerResource($getTracket);

        return response()->json([
            "status" => true,
            "body" => $resource,
        ]);
    }
}
