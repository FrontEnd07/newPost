<?php

namespace App\Telegraph\Trait;

use DefStudio\Telegraph\Keyboard\Keyboard;
use DefStudio\Telegraph\Keyboard\Button;

trait MenuTrait
{
    public function MenuBack(): void
    {
        $this
            ->chat
            ->editMedia($this->messageId)
            // ->photo('https://yt4.ggpht.com/ytc/AKedOLRlEw8Tdx5J8QilJYLuvwRnz2AoAKjosojNhNF_xg=s900-c-k-c0x00ffffff-no-rj')
            ->photo('https://sun9-58.userapi.com/impg/zkoIuC7RWpzAlRQGDAeIluSEH-H1rdPyCKQB8g/9fwj16zIsb0.jpg?size=1024x768&quality=95&sign=a8abf33530d1f47352724cbd1daea950&type=album')
            ->send();

        $this
            ->chat
            ->editCaption($this->messageId)
            ->message("✋ <b>Добро пожаловать в сервис Почтаи нав!</b>\n\nГлавное меню:")
            ->keyboard($this->getMenuKeyboard())
            ->send();
    }


    public function Menu(): void
    {
        $this
            ->chat
            // ->photo('https://yt4.ggpht.com/ytc/AKedOLRlEw8Tdx5J8QilJYLuvwRnz2AoAKjosojNhNF_xg=s900-c-k-c0x00ffffff-no-rj')
            ->photo('https://sun9-58.userapi.com/impg/zkoIuC7RWpzAlRQGDAeIluSEH-H1rdPyCKQB8g/9fwj16zIsb0.jpg?size=1024x768&quality=95&sign=a8abf33530d1f47352724cbd1daea950&type=album')
            ->message("✋ <b>Добро пожаловать в сервис Почтаи нав!</b>\n\nГлавное меню:")
            ->keyboard($this->getMenuKeyboard())
            ->send();
    }


    public function getMenuKeyboardGroup(): Keyboard
    {
        return Keyboard::make()->buttons([
            Button::make('Перейти к боту и выполнить команду')->switchInlineQuery('/menu'),
        ]);
    }


    public function getMenuKeyboard(): Keyboard
    {
        return Keyboard::make()
            ->row([
                Button::make('📍 Адрес склада')->action('cnAddress'),
                Button::make('💰 Цена')->action('price')
            ])
            ->row([
                Button::make('📦 Заказать доставку')->action('gZhKhujand'),
                Button::make('🔍 Поиск трек-кода')->action('search'),
            ])
            ->row([
                Button::make('✅ Проверить адрес')->action('verification'),
                Button::make('☎️ Контакты')->action('contact'),
            ])
            ->row([
                Button::make('🌐 Веб сайт')->webApp('https://poctainav.ru')
            ]);
    }
}
