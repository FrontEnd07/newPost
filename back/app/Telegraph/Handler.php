<?php

namespace App\Telegraph;

use DefStudio\Telegraph\Handlers\WebhookHandler;
use DefStudio\Telegraph\Enums\ChatActions;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Stringable;
use App\Telegraph\Trait\MenuTrait;
use App\Telegraph\Trait\AddressTrait;
use App\Telegraph\Trait\Search\SearchTrait;
use App\Telegraph\Trait\ForgetTrait;
use App\Telegraph\Trait\NotifyTrait;
use App\Telegraph\Trait\SigninTrait;
use App\Telegraph\Trait\PriceTrait;
use App\Telegraph\Trait\ContactTrait;
use App\Telegraph\Trait\AddressVerificationTrait;

class Handler extends WebhookHandler
{
   use MenuTrait;
   use AddressTrait;
   use SearchTrait;
   use ForgetTrait;
   use NotifyTrait;
   use SigninTrait;
   use PriceTrait;
   use ContactTrait;
   use AddressVerificationTrait;

   public function start()
   {
      $this->chat->action(ChatActions::TYPING)->send();
      $this->reply("Готов к работе");
   }

   protected function handleChatMessage(Stringable $text): void
   {
      if ($this->getChatType() == "private") {
         $this->trackerMessage();
         $this->notifyMessage();
         $this->messageVerificationAddress();
         $this->isReplyToQuestion();
         // Log::info($this->message->toArray());
      }
   }

   protected function getChatType(): string
   {
      if ($this->callbackQuery) {
         return $this->callbackQuery->message()->chat()->type();
      }
      return $this->message->chat()->type();
   }

   protected function getFromId(): int
   {
      if ($this->callbackQuery) {
         return $this->callbackQuery->message()->chat()->id();
      }
      return $this->message->from()->id();
   }
}
