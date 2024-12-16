<?php

namespace App\Telegraph\Trait;

use DefStudio\Telegraph\Keyboard\Keyboard;

trait PriceTrait
{

    public function price()
    {
        $this->chat
            ->editMedia($this->messageId)
            ->photo('https://www.oknavpermi.ru/system/ckeditor_assets/pictures/142187/content_acc-revenue-icon.png')
            ->send();

        $this->chat
            ->editCaption($this->messageId)
            ->message(
                '
            🔹<b>Гуанчжоу -> Душанбе, Худжанд:</b> 
🔹🔹3.5$ за килограмм📦
🔹🔹300$ за кубический метр 📐

🔹<b>Иву -> Душанбе, Худжанд:</b>
🔹🔹До 20 килограмм: 3.5$ 📦
🔹🔹От 20 до 30 килограмм: 3.2$ 📦
🔹🔹Свыше 30 килограмм: 3$ 📦
🔹🔹Кубический метр: 300$ 📐'
            )
            ->keyboard($this->priceKeyboard())
            ->send();
    }


    protected function priceKeyboard()
    {
        return Keyboard::make()
            ->button('🔙 Назад')
            ->action('MenuBack');
    }
}
