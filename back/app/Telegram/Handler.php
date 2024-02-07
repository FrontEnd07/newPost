<?php

namespace App\Telegram;

use DefStudio\Telegraph\Handlers\WebhookHandler;
use DefStudio\Telegraph\Models\TelegraphChat;
use DefStudio\Telegraph\Enums\ChatActions;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Stringable;
use App\Models\AdminTracker;
use App\Models\Attach;
use Carbon\Carbon;

class Handler extends WebhookHandler
{
   public function start()
   {
      $this->chat->action(ChatActions::TYPING)->send();
      $this->reply("Готов к работе");
   }

   /* protected function handleUnknownCommand(Stringable $text): void
   {
      $this->chat->action(ChatActions::TYPING)->send();
      $this->chat->html("Я не могу понять вашу команду: $text")->send();
   } */
   
   protected function handleChatMessage(Stringable $text): void
   {
      if ($this->chat->storage()->get("tracker") && $this->chat->storage()->get('chat_id') == $this->message->from()->id()) {
         $this->chat->action(ChatActions::TYPING)->send();
         $this->forget();
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
      }

      if ($this->chat->storage()->get('notify')) {
         $this->chat->action(ChatActions::TYPING)->send();
         $this->forget();
         $text = $this->message->text();
         TelegraphChat::all()->each(function ($chat) use ($text) {
            $chat->html($this->message->text())->send();
         });
      }

      if ($this->chat->storage()->get('signin') && $this->message->chat()->type() == "private") {
         $this->chat->action(ChatActions::TYPING)->send();
         $this->forget();
         $checkToken = $this->checkToken(trim($this->message->text()));
         Log::info($checkToken);
         $this->chat->message($checkToken)->send();
      }

      if ($this->message->from()->username() == "Channel_Bot") {
         $this->chat->deleteMessage($this->messageId)->send();
         $this->chat->message('Писать от имени канала запрещено!')->send();
      }
   }

   protected function forget()
   {
      $this->chat->storage()->forget("notify");
      $this->chat->storage()->forget("tracker");
      $this->chat->storage()->forget('signin');
      $this->chat->storage()->forget('chat_id');
   }

   public function search()
   {
      $this->chat->action(ChatActions::TYPING)->send();
      $this->chat->message('Введите трэк-номер:')->reply($this->messageId)->send();
      $this->chat->storage()->set('tracker', true);
      $this->chat->storage()->set('chat_id', $this->message->from()->id());
      // Log::info(json_encode($this->message->toArray()));
   }

   public function notify()
   {
      if ($this->message->from()->id() === 300150253) {
         $this->chat->action(ChatActions::TYPING)->send();
         $this->chat->message('Введите сообщения который нужно оповещать?')->reply($this->messageId)->send();
         $this->chat->storage()->set('notify', true);
      } else {
         $this->chat->message("Вы не имеете доступа к этой функции =(")->send();
      }
   }

   public function signin()
   {
      $this->chat->action(ChatActions::TYPING)->send();
      if ($this->message->chat()->type() == "private") {
         $this->chat->storage()->set('signin', true);
         $this->chat->message('Скопируйте текущий токен из <a href="https://poctainav.ru/">сайта</a> и отправьте:')->send();
      } else {
         $this->chat->message('Это функция работает только в приватном чате с ботом.')->send();
      }
   }

   public function checkToken($token)
   {
      $parts = explode('|', $token);

      if (isset($parts[0]) && isset($parts[1])) {
         $userId = $parts[0];
         $userToken = $parts[1];

         $hashedToken = hash('sha256', $userToken);

         $token = \Laravel\Sanctum\PersonalAccessToken::where('id', $userId)
            ->where('token', $hashedToken)
            ->first();

         if ($token) {
            // Если токен найден, можно выполнить какие-то дополнительные действия
            // Например, залогинить пользователя
            Auth::loginUsingId($userId);

            $data = [
               'user_id' => $token->tokenable_id,
               'chat_id' => $this->message->chat()->id(),
               'name' => '[' . $this->message->chat()->type() . '] ' . $this->message->from()->username(),
            ];

            Attach::firstOrCreate($data);
            // Log::info(json_encode($this->message->toArray()));
            return "Токен действителен. Пользователь прикреплен.";
         }
      }

      return "Токен недействителен. Пользователь не найден.";
   }
}
