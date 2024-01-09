<?php

namespace App\Telegram;

use DefStudio\Telegraph\Handlers\WebhookHandler;
use App\Http\Resources\AdminTrackerResource;
use DefStudio\Telegraph\Keyboard\Keyboard;
use DefStudio\Telegraph\Enums\ChatActions;
use DefStudio\Telegraph\Keyboard\Button;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Stringable;
use App\Models\AdminTracker;
use Carbon\Carbon;

class Handler extends WebhookHandler
{
   public function start()
   {
      $this->chat->action(ChatActions::TYPING)->send();
      $this->reply("Готов к работе");
   }

   protected function handleUnknownCommand(Stringable $text): void
   {
      $this->chat->action(ChatActions::TYPING)->send();
      $this->chat->html("Я не могу понять вашу команду: $text")->send();
   }

   protected function handleChatMessage(Stringable $text): void
   {
      if ($this->chat->storage()->get("tracker")) {
         $this->chat->action(ChatActions::TYPING)->send();
         $this->chat->storage()->set("tracker", null);

         $getTracker = AdminTracker::where('tracker', "=", $this->message->text())->with('statuses')->first();
         if ($getTracker !== null) {
            $text = '';

            foreach ($getTracker->statuses as $message) {
               $date = Carbon::parse($message->created_at)->isoFormat('DD MMMM YYYY', 'Do MMMM YYYY');
               $text .= "<b>Статус:</b> " . $message->status . "\n" . $date . "\n";
            }

            $this->chat->message($text)->send();
         } else {
            $this->chat->message('К несчастью, пока что мы не получили этот трек-номер.')->send();
         }

         Log::info(
            $getTracker
         );
      }
   }

   public function search()
   {
      $this->chat->action(ChatActions::TYPING)->send();
      $this->chat->message('Введите трэк-номер:')->reply($this->messageId)->send();
      $this->chat->storage()->set('tracker', true);
      Log::info(json_encode($this->message->toArray()));
   }

   public function signin()
   {
      $this->chat->action(ChatActions::TYPING)->send();
      $this->chat->message('Это функция пока не реализовано =(')->send();
   }
}
