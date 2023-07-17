<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Requests\Api\Auth\RegisterFormRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\UserResource;
use App\Models\User;


class RegisterController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\RegisterFormRequest  $request
     * @return User
     */
    public function __invoke(RegisterFormRequest $request)
    {

        $user = User::create(array_merge(
            $request->only('name', 'phone', 'city'),
            ['password' => Hash::make($request->password)],
        ));

        $newUser = User::orderBy('created_at', 'desc')->first();
        $userResource = new UserResource($newUser);
        
        return response()->json([
            "status" => true,
            "message" => "Пользователь успешно создан",
            "user" => $userResource,
            "token" => $user->createToken("API TOKEN")->plainTextToken
        ], 200);
    }
}
