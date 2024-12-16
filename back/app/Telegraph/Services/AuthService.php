<?php

namespace App\Telegraph\Services;

use App\Models\Attach;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;

class AuthService
{
    public function checkToken($token): string
    {
        $parts = explode('|', $token);
        if (count($parts) < 2) {
            return "Токен недействителен. Пользователь не найден.";
        }

        [$userId, $userToken] = $parts;
        $hashedToken = hash('sha256', $userToken);

        $token = PersonalAccessToken::where('id', $userId)->where('token', $hashedToken)->first();

        if (!$token) {
            return "Токен недействителен. Пользователь не найден.";
        }

        Auth::loginUsingId($userId);

        Attach::updateOrInsert(
            ['user_id' => $token->tokenable_id, 'chat_id' => request()->chat()->id()],
            ['user_id' => $token->tokenable_id, 'chat_id' => request()->chat()->id(), 'created_at' => now(), 'updated_at' => now()]
        );

        return "Токен действителен. Пользователь прикреплен.";
    }
}
