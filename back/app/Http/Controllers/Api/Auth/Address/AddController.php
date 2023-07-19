<?php

namespace App\Http\Controllers\Api\Auth\Address;

use App\Models\Address;
use App\Http\Controllers\Controller;
use App\Http\Resources\AddressResource;
use App\Http\Requests\Api\Auth\AddressRequest;

class AddController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(AddressRequest $request)
    {
        $user = $request->user()->id;
        $adding = Address::create(array_merge(
            $request->only("name", "phone", "city", "street"),
            ['userId' => $user],
        ));

        $resource = new AddressResource($adding->where(["userId" => $user])
            ->orderBy('created_at', 'desc')
            ->get());

        return response()->json([
            "status" => true,
            "body" => $resource,
            "message" => "Адрес добавлен"
        ]);
    }
}
