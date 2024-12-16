<?php

namespace App\Telegraph\Services;

use DefStudio\Telegraph\Models\TelegraphChat;

class NotificationService
{
    public function sendMediaToAllChats($message, $text)
    {
        $mediaMethod = $this->getMediaMethod($message);

        // Если метод медиа не определён, отправляем текстовое сообщение
        if (!$mediaMethod) {
            TelegraphChat::all()->each(function (TelegraphChat $chat) use ($text) {
                $chat->message($text)->send();
            });
            return;
        }

        // Если метод определён, отправляем медиа (если оно существует)
        TelegraphChat::all()->each(function (TelegraphChat $chat) use ($message, $text, $mediaMethod) {
            $mediaId = $this->getMediaId($message, $mediaMethod);

            if ($mediaId) {
                $chat->$mediaMethod($mediaId)->html($text)->send();
            } else {
                $chat->message($text)->send(); // Если медиа не найдено, отправить текст
            }
        });
    }

    private function getMediaMethod($message): ?string
    {
        return match (true) {
            $message->photos() && count($message->photos()) > 0 => 'photo',
            $message->video() => 'video',
            $message->document() => 'document',
            default => null,
        };
    }

    private function getMediaId($message, string $mediaMethod): ?string
    {
        return match ($mediaMethod) {
            'photo' => $message->photos()[0]->id() ?? null,
            'video' => $message->video()->id() ?? null,
            'document' => $message->document()->id() ?? null,
            default => null,
        };
    }
}
