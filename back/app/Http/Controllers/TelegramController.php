<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\TelegramService;

class TelegramController extends Controller
{
    public function sendMessage(Request $request)
    {
        $phoneNumber = $request->input('phone'); // номер телефона из запроса
        $message = $request->input('message');   // сообщение из запроса

        $telegramService = new TelegramService();
        $telegramService->sendMessage($phoneNumber, $message); // отправка сообщения

        return response()->json(['status' => 'Сообщение отправлено!']);
    }
}
