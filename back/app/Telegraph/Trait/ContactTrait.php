<?php

namespace App\Telegraph\Trait;

use DefStudio\Telegraph\Keyboard\Keyboard;
use DefStudio\Telegraph\Keyboard\Button;

trait ContactTrait
{
    public function contact()
    {
        $this->chat
            ->editMedia($this->messageId)
            ->photo('https://infoshkola.net/images/event/cf309bb8ad9e.png')
            ->send();

        $this->chat
            ->editCaption($this->messageId)
            ->message(
                '
            <b>Контакты:</b>
Душанбе: +992900000093
Худжанд: +992929090904
Склад Худжанд: +992029090904
Оператор: @pochtainav'
            )
            ->keyboard($this->contactKeyboard())
            ->send();
    }

    protected function contactKeyboard()
    {
        return Keyboard::make()
            ->button('🔙 Назад')
            ->action('MenuBack');
    }
}
