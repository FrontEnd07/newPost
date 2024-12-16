<?php

namespace App\Telegraph\Trait;


use DefStudio\Telegraph\Enums\ChatActions;

trait SigninTrait
{

    public function signin()
    {
        $this->chat->action(ChatActions::TYPING)->send();

        if (!$this->getChatType() !== "private")
            return $this
                ->chat
                ->message('Эта функция доступна только в приватном чате с ботом.')
                ->send();

        $this
            ->chat
            ->storage()
            ->set('signin', true);
        $this
            ->chat
            ->message('Скопируйте токен из <a href="https://poctainav.ru/">сайта</a> и отправьте его.')
            ->send();
    }
}
