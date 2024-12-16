<?php

namespace App\Http\Controllers\Api\Auth\Admin;

use App\Http\Requests\Api\Auth\AdminAddTrackerRequest;
use DefStudio\Telegraph\Models\TelegraphChat;
use App\Http\Resources\AdminTrackerResource;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use App\Services\NumberService;
use App\Models\SaveTrackerTg;
use App\Models\AdminTracker;
use Illuminate\Support\Str;
use App\Models\Tracker;
use GuzzleHttp\Client;
use App\Models\Status;
use App\Models\User;

class AdminAddTrackerController extends Controller
{
    public $timestamps = true;
    protected $numberService;

    public function __construct(NumberService $numberService)
    {

        $this->numberService = $numberService;
    }

    public function __invoke(AdminAddTrackerRequest $request)
    {
        $userId = $this->getUserIdByPhone($request->phone);
        $imageName = $this->handleImageUpload($request->image);
        $this->processTrackers($request->tracker, $request->status, $userId, $imageName);

        if ($request->notify === "true")
            $this->sendNotifications($request);

        return $this->respondWithTrackers($request->perPage);
    }

    /**
     * Получаем ID пользователя по номеру телефона
     */
    protected function getUserIdByPhone($phone)
    {
        if (!empty($phone)) {
            $user = User::where("phone", $phone)->first();
            return $user ? $user->id : null;
        }
        return null;
    }

    /**
     * Обрабатываем загрузку изображения
     */
    protected function handleImageUpload($image)
    {
        if ($image) {
            $imageName = Str::random(32) . "." . $image->getClientOriginalExtension();
            Storage::disk("public")->put($imageName, file_get_contents($image));
            return $imageName;
        }
        return null;
    }

    /**
     * Обрабатываем трекеры и их статусы
     */
    protected function processTrackers($trackers, $status, $userId, $imageName)
    {
        foreach ($trackers as $item) {
            $tracker = AdminTracker::firstOrNew(['tracker' => $item]);
            if (!$tracker->exists) {
                $tracker->user_id = $userId;
                $tracker->image = $imageName;
                $tracker->save();
            }

            $this->saveStatus($tracker->id, $status);
        }
    }

    /**
     * Сохраняем статус трекера
     */
    protected function saveStatus($trackerId, $statusText)
    {
        $status = new Status();
        $status->status = $statusText;
        $status->tracker_id = $trackerId;
        $status->save();
    }

    /**
     * Отправляем уведомления через Telegram
     */
    protected function sendNotifications($request)
    {
        $trackers = Tracker::whereIn('tracker', $request->tracker)->with('userAttach')->get();
        $chatId = $this->prepareChatMessages($trackers, $request);

        if (count($chatId) > 0) {
            foreach ($chatId as $key => $value) {
                $sendMessage = $this->formatTelegramMessage($value, $request->status, $request->message);
                TelegraphChat::where('chat_id', $key)->first()->message($sendMessage)->send();
            }
        }

        $this->notifyByPhone($request);
        $this->notifySaveTg($request);
    }

    /**
     * Отправляем уведомления через Telegram который был сохранен
     */
    protected function notifySaveTg($request)
    {
        $trackers = SaveTrackerTg::whereIn('tracker', $request->tracker)->get();
        if (count($trackers) > 0) {

            $chatId = [];

            foreach ($trackers as $message) {
                $chatId[$message['idTg']][] = $message->tracker;
            }

            foreach ($chatId as $key => $val) {
                $sendMessage = $this->formatTelegramMessage($val, $request->status, $request->message, false);
                TelegraphChat::where('chat_id', $key)->first()->message($sendMessage)->send();
            }
        }
    }

    /**
     * Подготавливаем сообщения для Telegram
     */
    protected function prepareChatMessages($trackers, $request)
    {
        $chatId = [];
        foreach ($trackers as $message) {
            if ($message->userAttach && $message->userAttach->chat_id) {
                $chatId[$message->userAttach->chat_id][] = [
                    'tracker' => $message->tracker,
                    'name' => $message->name ?? '-',
                    'quantity' => $message->quantity,
                ];
            }
        }
        return $chatId;
    }

    /**
     * Форматируем сообщение для отправки в Telegram
     */
    protected function formatTelegramMessage($messages, $status, $additionalMessage, $withDetails = true)
    {
        $sendMessage = '';
        foreach ($messages as $message) {
            $sendMessage .= '<b>Трек-номер:</b> <code>' . ($withDetails ? $message['tracker'] : $message) . '</code>' . "\n";
            if ($withDetails) {
                $sendMessage .= '<b>Наименования:</b> ' . $message['name'] . "\n";
                $sendMessage .= '<b>Количество:</b> ' . $message['quantity'] . "\n";
            }
            $sendMessage .= '~~~~~~~~~~~~~' . "\n";
        }
        $sendMessage .= '<b>Итог:</b> ' . count($messages) . 'шт.' . "\n";
        $sendMessage .= '<b>Статус:</b> ' . $status;
        if ($additionalMessage != '') {
            $sendMessage .= "\n<b>Доп. информация:</b> " . $additionalMessage . "\n";
        }
        if ($withDetails === false) {
            $sendMessage .= '~~~~~~~~~~~~~' . "\n";
            $sendMessage .= "<b>Наш бот:</b> @NewPostTjBot\n";
            $sendMessage .= "<b>Наш канал:</b> @chanel_newpost\n";
            $sendMessage .= "<b>Наша группа:</b> @newposttj\n";
        }
        return $sendMessage;
    }

    public function sendPostRequest($number, $message)
    {
        // Создание экземпляра Guzzle Client
        $client = new Client();

        // Данные для отправки в формате JSON
        $data = json_encode([
            'number' => '992' . $number,
            'message' => $message,
        ]);

        // Отправка POST-запроса с raw body
        $response = $client->post('https://whatsapp.tajmarket.tj/send-message', [
            'headers' => [
                'Content-Type' => 'application/json', // Указываем, что отправляем JSON
            ],
            'body' => $data, // Отправляем данные в теле запроса
        ]);
    }

    /**
     * Форматируем сообщение для отправки в WhatsApp
     */
    protected function formatWhatsAppMessage($messages, $status, $additionalMessage)
    {
        $sendMessage = '';

        foreach ($messages as $message) {
            // Основной трек-номер с использованием моноширинного текста
            $sendMessage .= "*Трек-номер:* ```" . $message . "```\n";
            $sendMessage .= "~~~~~~~~~~~~~\n";  // Разделитель строк
        }

        $sendMessage .= "*Итог:* " . count($messages) . " шт.\n";
        $sendMessage .= "*Статус:* " . $status;

        if ($additionalMessage != '') {
            $sendMessage .= "\n*Доп. информация:* " . $additionalMessage . "\n";
        }

        $sendMessage .= "~~~~~~~~~~~~~\n";
        $sendMessage .= "*Наш бот:* https://t.me/NewPostTjBot\n";
        $sendMessage .= "*Наш канал:* https://t.me/+4z6IgZE64c1mYWYy\n";
        $sendMessage .= "*Наша группа:* @newposttj\n";

        return $sendMessage;
    }

    /**
     * Отправляем уведомление на телефон через Telegram
     */
    protected function notifyByPhone($request)
    {
        $lastNineDigits = $this->numberService->getLastNineDigits($request->status);
        // $sendMessage = $this->formatTelegramMessage($request->tracker, $request->status, $request->message, false);
        $sendMessageWhatsApp = $this->formatWhatsAppMessage($request->tracker, $request->status, $request->message);

        if (strlen($lastNineDigits) === 9) {
            // $this->telegramService->sendMessage('+992' . $lastNineDigits, $sendMessage);
            $this->sendPostRequest($lastNineDigits, $sendMessageWhatsApp);
        }


        return response()->json([
            "status" => strlen($lastNineDigits) === 9,
            "message" => $lastNineDigits,
        ]);
    }

    /**
     * Возвращаем ответ с трекерами
     */
    protected function respondWithTrackers($limit)
    {
        $limit = $limit ?: 5;
        $resource = new AdminTrackerResource(AdminTracker::orderBy("id", "desc")->paginate($limit));

        return response()->json([
            "status" => true,
            "body" => $resource,
            "message" => "Трекеры успешно добавлены!",
        ]);
    }
}
