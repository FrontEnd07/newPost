<?php

namespace App\Telegraph\Trait;

use DefStudio\Telegraph\Enums\ChatActions;
use DefStudio\Telegraph\Models\TelegraphChat;
use Illuminate\Support\Facades\Log;

trait NotifyTrait
{

    public function notify()
    {
        $this->forget();
        if (!$this->isAuthorized())
            return $this->chat->message("Вы не имеете доступа к этой функции =(")->send();

        $this
            ->chat
            ->action(ChatActions::TYPING)
            ->send();

        $this
            ->chat
            ->message('Введите сообщения который нужно оповещать?')
            ->reply($this->messageId)
            ->send();

        $this
            ->chat
            ->storage()
            ->set('notify', true);
    }

    public function notifyMessage()
    {
        if ($this->chat->storage()->get('notify') && $this->isAuthorized()) {
            $text = $this->message->text();
            $this->sendNotify();

            TelegraphChat::all()->each(function ($chat) use ($text) {
                $chat->copyMessage($this->message->chat()->id(), $this->messageId)->send();
            });
        }
    }

    public function sendNotify()
    {
        $this->chat->action(ChatActions::TYPING)->send();
        $this->forget();
    }

    private function isAuthorized(): bool
    {
        return $this->message->from()->id() === 300150253;
    }
}
