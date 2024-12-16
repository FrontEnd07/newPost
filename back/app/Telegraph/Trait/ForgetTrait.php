<?php

namespace App\Telegraph\Trait;


trait ForgetTrait
{
    protected function forget(): void
    {
        $this->chat->storage()->forget("notify");
        $this->chat->storage()->forget("tracker");
        $this->chat->storage()->forget("signin");
        $this->chat->storage()->forget("chat_id");
        $this->chat->storage()->forget("verificationAddress");
    }
}
