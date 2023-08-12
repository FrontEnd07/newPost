<?php

namespace App\Http\Controllers\Api\Auth\Order;

use App\Http\Requests\Api\Auth\OrderRequest;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\OrderResource;
use App\Http\Controllers\Controller;
use Illuminate\Support\Str;
use App\Models\Order;

class AddOrderController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(OrderRequest $request)
    {
        $imageName = Str::random(32) . "." . $request->image->getClientOriginalExtension();
        $user = $request->user()->id;
        $adding = Order::create(array_merge(
            $request->only("link", "price", "quantity", "streetId", "parametrs"),
            ['image' => $imageName],
            ['userId' => $user],
        ));

        $limit = $request->perPage ? $request->perPage : 10;

        Storage::disk("public")->put($imageName, file_get_contents($request->image));

        $resource = new OrderResource($adding->where(["userId" => $user])
            ->orderBy("id", "desc")
            ->paginate($limit));

        return response()->json([
            "status" => true,
            "body" => $resource,
            "message" => "Заказ добавлен"
        ]);
    }
}
