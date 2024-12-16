<?php

namespace App\Telegraph\Trait;

use Illuminate\Support\Facades\Log;
use DefStudio\Telegraph\Models\TelegraphChat;
use DefStudio\Telegraph\Keyboard\Keyboard;

trait AddressVerificationTrait
{
    public function verification()
    {
        $this->forget();

        $this->chat
            ->message('<b>Отправьте фото вашего заполненного адреса</b> 📸🏠')
            ->send();

        $this->chat->storage()->set('verificationAddress', true);
    }

    public function messageVerificationAddress()
    {
        $verificationAddress = $this->chat->storage()->get('verificationAddress');
        $arr = array(300150253, 467890935, 6478279399);
        

        if ($verificationAddress) {
            $this->forget();
            
            foreach ($arr as $val => $key) {
                TelegraphChat::where('chat_id', $key)->first()->forwardMessage($this->message->chat()->id(), $this->messageId)->send();
            }

            $this->chat->message('<b>Сообщение было отправлено, ожидайте ответа админа</b>⏳📨')->send();
        }

        
    }

    public function isReplyToQuestion()
    {
        $arr = array(300150253, 467890935, 6478279399);

        if ($this->isforwardFrom() && in_array($this->message->chat()->id(), $arr)) {
            $this->replyToQuestion($this->message->replyToMessage()->forwardFrom()->id());

            foreach ($arr as $val => $key) {
                if ($key != $this->message->chat()->id()) {
                    TelegraphChat::where('chat_id', $key)->first()->message('Оператор <b>' . $this->message->chat()->title() . '</b> ответил клиенту <b>' . $this->message->replyToMessage()->forwardFrom()->username() . '</b>')->send();
                } else {
                    TelegraphChat::where('chat_id', $key)->first()->message('<b>Сообщение было отправлено📨</b>')->send();
                }
            }
        }
    }

    protected function isforwardFrom()
    {
        return $this->message->replyToMessage() && $this->message->replyToMessage()->forwardFrom();
    }

    protected function replyToQuestion($chatId)
    {
        TelegraphChat::where('chat_id', $chatId)->first()->copyMessage($this->message->chat()->id(), $this->messageId)->keyboard($this->replyToQuestionKeyboard())->send();
    }

    protected function replyToQuestionKeyboard()
    {
        return Keyboard::make()
            ->when(true, fn (Keyboard $keyboard) => $keyboard
                ->button('✅ Проверить адрес еще раз')
                ->action('checkAgain'));
    }

    public function checkAgain()
    {
        $this->forget();
        $this->chat->message('<b>Отправьте фото вашего заполненного адреса</b> 📸🏠')->send();
        $this->chat->deleteMessage($this->messageId)->send();
        $this->chat->storage()->set('verificationAddress', true);
    }
}
