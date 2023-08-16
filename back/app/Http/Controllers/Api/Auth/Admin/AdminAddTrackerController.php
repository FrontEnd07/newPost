<?php

namespace App\Http\Controllers\Api\Auth\Admin;

use App\Http\Requests\Api\Auth\AdminAddTrackerRequest;
use App\Http\Resources\AdminTrackerResource;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use App\Models\AdminTracker;
use Illuminate\Support\Str;
use App\Models\Status;
use App\Models\User;

class AdminAddTrackerController extends Controller
{
    public $timestamps = true;
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(AdminAddTrackerRequest $request)
    {
        $id = null;
        $imageName = null;

        if (!empty($request->phone)) {
            $id =  User::where("phone", $request->phone)->first()->id;
        }

        if ($request->image) {
            $imageName = Str::random(32) . "." . $request->image->getClientOriginalExtension();
            Storage::disk("public")->put($imageName, file_get_contents($request->image));
        }

        $limit = $request->perPage ? $request->perPage : 5;

        foreach ($request->tracker as $item) {
            $tracker = new AdminTracker();
            $status = new Status();
            if (!$tracker->where("tracker", $item)->exists()) {
                $tracker->user_id = $id;
                $tracker->image = $imageName;
                $tracker->tracker = $item;
                $tracker->save();
            }
            $status->status = $request->status;
            $status->tracker_id = $tracker->where("tracker", $item)->first()->id;
            $status->save();
        }

        $resource = new AdminTrackerResource(AdminTracker::orderBy("id", "desc")
            ->paginate($limit));

        return response()->json([
            "status" => true,
            "body" => $resource,
            "message" => "Трекеры успешно добавлены!",
        ]);
    }
}
