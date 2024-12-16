<?php

namespace App\Telegraph\Services;

use DefStudio\Telegraph\Keyboard\Keyboard;

class BackKeyboard
{
    public static function getReturn($action): Keyboard
    {
        return Keyboard::make()
            ->when(true, fn (Keyboard $keyboard) => $keyboard
                ->button('🔙 Назад')
                ->action($action)
                ->param('back', 1));
    }
}
