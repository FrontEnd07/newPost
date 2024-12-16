<?php

namespace App\Services;

use danog\MadelineProto\Exception;

class TelegramService
{
    protected $MadelineProto;

    public function __construct()
    {
        $sessionFile = storage_path('app/telegram_session.madeline');
        $this->MadelineProto = new \danog\MadelineProto\API($sessionFile);
        $this->MadelineProto->start();
    }

    public function sendMessage($phoneNumber, $message)
    {
        try {
            $result = $this->MadelineProto->contacts->importContacts(['contacts' => [['_' => 'inputPhoneContact', 'client_id' => time(), 'phone' => $phoneNumber]]]);
            if (count($result['imported']) > 0) {
                $user_id = $result['imported'][0]['user_id'];
                // Отправляем сообщение
                $this->MadelineProto->messages->sendMessage([
                    'peer' => $user_id,
                    'message' => $message,
                    'parse_mode' => 'html'
                ]);
            }
        } catch (Exception $e) {
            throw new \Exception('Ошибка отправки сообщения: ' . $e->getMessage());
        }
    }
}
