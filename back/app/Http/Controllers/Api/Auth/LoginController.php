<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Auth\LoginRequest;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\UserResource;
use App\Models\User;

class LoginController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(LoginRequest $request)
    {
        if (!Auth::attempt($request->only(["phone", "password"]))) {
            return response()->json([
                "status" => false,
                "message" => "Телефон или пароль не совпадают с нашей записью."
            ], 401);
        }
        
        $user = User::where("phone", $request->phone)->first();
        $userInfo = new UserResource($user);

        return response()->json([
            "status" => true,
            "message" => "Пользователь успешно авторизовался",
            "user" => $userInfo,
            "token" => $user->createToken("API TOKEN")->plainTextToken
        ], 200);
    }
}
