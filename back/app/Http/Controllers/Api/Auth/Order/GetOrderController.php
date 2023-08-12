<?php

namespace App\Http\Controllers\Api\Auth\Order;

use App\Http\Resources\OrderResource;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;

class GetOrderController extends Controller
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

        $order = Order::where(function ($query) use ($search) {
            $query->where('link', 'like', "%$search%")
                ->orWhere('price', 'like', "%$search%")
                ->orWhere('parametrs', 'like', "%$search%");
        })
            ->orderBy($sortBy, 'DESC')
            ->where(["userId" => $user])
            ->paginate($limit);

        $resource = new OrderResource($order);

        return response()->json([
            "status" => true,
            "body" => $resource,
        ]);
    }
}
