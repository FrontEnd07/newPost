<?php

namespace App\Http\Controllers\Api\Auth\Address;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Address;
use App\Http\Resources\AddressResource;

class DeleteController extends Controller
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
        Address::where("id", $request->id)->where("userId", $user)->delete();

        $resource = new AddressResource(Address::where(["userId" => $user])
            ->orderBy('created_at', 'desc')
            ->get());

        return response()->json([
            "status" => true,
            "body" => $resource,
            "message" => "Успешно удаленно",
        ]);
    }
}
