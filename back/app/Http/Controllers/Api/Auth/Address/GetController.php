<?php

namespace App\Http\Controllers\Api\Auth\Address;

use App\Http\Resources\AddressResource;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Address;

class GetController extends Controller
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
        $resource = new AddressResource(Address::where(["userId" => $user])
            ->orderBy('created_at', 'desc')
            ->get());

        return response()->json([
            "status" => true,
            "body" => $resource,
        ]);
    }
}
