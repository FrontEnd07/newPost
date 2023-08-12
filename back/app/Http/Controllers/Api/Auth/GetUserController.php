<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Requests\Api\Auth\GetUserRequest;
use App\Http\Resources\GetUserResource;
use App\Http\Controllers\Controller;
use App\Models\User;

class GetUserController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(GetUserRequest $request)
    {
        $serach = $request->name;

        $user = User::where(function ($query) use ($serach) {
            $query->where('phone', 'like', "%$serach%");
        })->get();

        $resource = new GetUserResource($user);

        return response()->json([
            "status" => true,
            "body" => $resource
        ]);
    }
}
