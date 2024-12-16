<?php

namespace App\Telegraph\Trait\Search;

use App\Models\Tracker;
use App\Models\SaveTrackerTg;

trait AddTrackerTrait
{
    public function addTracker()
    {
        $tracker = $this->data->get('tracker');
        $isPhoto = count($this->callbackQuery->message()->photos());
        $messageText = 'Скопируйте текущий токен из <a href="https://poctainav.ru/">сайта</a> и отправьте:';
        $messageInfo = $this->callbackQuery->message();
        $chatId = $messageInfo->chat()->id();

        if ($this->isTracker($tracker)) {
            return $this->sendMessageWithKeyboard(
                $messageText,
                $this->webKeyboard($tracker),
                $isPhoto
            );
        }

        if (!$this->isTrackerTg($tracker, $chatId)) {
            $this->addTrackerDb($tracker, $chatId, $messageInfo->chat()->title());
        }

        return $this->sendMessageWithKeyboard(
            $messageInfo->text(),
            $this->deleteTrackerKeyboard($tracker),
            $isPhoto
        );
    }

    protected function sendMessageWithKeyboard(string $message, $keyboard, bool $isPhoto)
    {
        $message = $this
            ->chat
            ->message($message)
            ->keyboard($keyboard);

        return $isPhoto
            ? $message->editCaption($this->messageId)->send()
            : $message->edit($this->messageId)->send();
    }

    protected function isTracker($trackNumber): bool
    {
        return Tracker::where('tracker', $trackNumber)->exists();
    }

    public function isTrackerTg($trackNumber, $idTg): bool
    {
        return SaveTrackerTg::where([
            ['tracker', '=', $trackNumber],
            ['idTg', '=', $idTg]
        ])->exists();
    }

    protected function addTrackerDb($trackNumber, $idTg, $name): void
    {
        SaveTrackerTg::create([
            'idTg' => $idTg,
            'tracker' => $trackNumber,
            'name' => $name,
        ]);
    }

    public function deleteTrackerDb(): void
    {
        $tracker = $this->data->get('tracker');
        $messageInfo = $this->callbackQuery->message();
        $chatId = $messageInfo->chat()->id();
        $isPhoto = count($messageInfo->photos());

        SaveTrackerTg::where([
            ['tracker', '=', $tracker],
            ['idTg', '=', $chatId]
        ])->delete();

        $this->sendMessageWithKeyboard(
            $messageInfo->text(),
            $this->saveTrackerKeyboard($tracker),
            $isPhoto
        );
    }
}
