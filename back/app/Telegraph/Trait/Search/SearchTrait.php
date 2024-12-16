<?php

namespace App\Telegraph\Trait\Search;

use App\Telegraph\Trait\Search\KeyboardTrait;
use DefStudio\Telegraph\Enums\ChatActions;
use App\Telegraph\Trait\Search\PhotoTrait;
use App\Telegraph\Trait\Search\AddTrackerTrait;
use Illuminate\Support\Facades\Log;
use App\Models\AdminTracker;
use Carbon\Carbon;

trait SearchTrait
{
    use KeyboardTrait;
    use PhotoTrait;
    use AddTrackerTrait;

    public function trackerMessage()
    {
        $isTracker = $this->chat->storage()->get('tracker');

        if ($this->isTrackerMessage() && $isTracker) {
            $this->forget();
            $this->chat->action(ChatActions::TYPING)->send();
            if ($this->isTrackerAdmin()) {
                $this->chat->message('К сожалению, мы пока не получили номер для отслеживания посылки.')->send();
                return;
            }

            $photo = $this->sendPostPhoto($this->message->text());

            if ($photo !== 'false') {
                $this->handleValidPhoto($photo);
            } elseif ($this->getTracker() !== null) {
                $this->handleInvalidPhoto();
            }
            
        }
    }

    protected function addButtonKeyboard()
    {
        $isTracker = $this->isTrackerTg($this->message->text(), $this->message->chat()->id());

        if ($isTracker)
            return $this->deleteTrackerKeyboard($this->message->text());

        if (!$isTracker)
            return $this->saveTrackerKeyboard($this->message->text());
    }

    protected function handleValidPhoto($photo)
    {
        $text = $this->getTracker() ? $this->buildTrackerMessage($this->getTracker()->statuses) : "Доставляется в Таджикистан";
        $this->chat->photo($photo)->message($text)->keyboard($this->addButtonKeyboard())->send();
    }

    protected function handleInvalidPhoto()
    {
        $this->chat->message($this->buildTrackerMessage($this->getTracker()->statuses))->keyboard($this->addButtonKeyboard())->send();
    }

    protected function isTrackerAdmin(): bool
    {
        return $this->sendPostPhoto($this->message->text()) === 'false' && $this->getTracker() === null;
    }

    protected function getTracker()
    {
        return AdminTracker::where('tracker', "=", $this->message->text())->with('statuses')->first();
    }

    protected function buildTrackerMessage($statuses): string
    {
        $text = '';

        foreach ($statuses as $message) {
            $date = Carbon::parse($message->created_at)->isoFormat('DD MMMM YYYY', 'Do MMMM YYYY');
            $text .= "<b>Статус:</b> " . $message->status . "\n<b>Дата: </b>" . $date . "\n";
        }

        return $text;
    }

    public function search()
    {
        $this->forget();
        $this->chat->storage()->set('tracker', true);
        $this->chat->action(ChatActions::TYPING)->send();

        $type = $this->getChatType();
        $fromId = $this->getFromId();


        if ($type != "private")
            return $this->handleNonPrivateChat();

        $this->handlePrivateChat($fromId);

        if ($this->data->get('tracker'))
            $this->chat->deleteMessage($this->messageId)->send();
    }

    protected function handlePrivateChat(int $fromId): void
    {
        $this->chat->action(ChatActions::TYPING)->send();
        $this->chat->message('Введите трэк-номер:')->reply($this->messageId)->send();
        $this->chat->storage()->set('tracker', true);
        $this->chat->storage()->set('chat_id', $fromId);
    }

    protected function handleNonPrivateChat(): void
    {
        $message = $this->chat->message('Эта функция доступна только в приватном чате с ботом.')->send();
        $messageId = $message->telegraphMessageId();

        sleep(10);

        $this->chat->deleteMessage($this->messageId)->send();
        $this->chat->deleteMessage($messageId)->send();
    }

    protected function isTrackerMessage(): bool
    {
        return $this->chat->storage()->get("tracker") && $this->chat->storage()->get('chat_id') == $this->message->from()->id();
    }
}
