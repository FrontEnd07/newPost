<?php

namespace App\Http\Controllers\Api\Auth\Admin\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Http\Resources\OrderResource;

class DeleteOrderController extends Controller
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

        Order::whereIn("id", $idsToDelete)->delete();

        $order = Order::orderBy("id", 'DESC')->paginate($limit);
        $resource = new OrderResource($order);

        return response()->json([
            "status" => true,
            "body" => $resource,
        ]);
    }
}
