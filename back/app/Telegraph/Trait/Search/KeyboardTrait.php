<?php

namespace App\Telegraph\Trait\Search;

use DefStudio\Telegraph\Keyboard\Keyboard;
use DefStudio\Telegraph\Keyboard\Button;

trait KeyboardTrait
{
    public function saveTrackerKeyboard($tracker): Keyboard
    {
        return Keyboard::make()
            ->row([
                Button::make('Получать обновления ✅')
                    ->action('addTracker')
                    ->param('tracker', $tracker),
            ]);
    }

    public function deleteTrackerKeyboard($tracker): Keyboard
    {
        return Keyboard::make()
            ->row([
                Button::make('Удалить обновления ❌')
                    ->action('deleteTrackerDb')
                    ->param('tracker', $tracker),
            ]);
    }

    public function webKeyboard($tracker): Keyboard
    {
        return Keyboard::make()
            ->row([
                Button::make('🌐 Открыть веб-сайт')->webApp('https://poctainav.ru'),
            ])
            ->button('🔙 Назад')
            ->action('search')
            ->param('tracker', $tracker);
    }
}
