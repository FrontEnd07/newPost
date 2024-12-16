<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use danog\MadelineProto\API;
use danog\MadelineProto\Settings\AppInfo;
use danog\MadelineProto\Settings;
use danog\MadelineProto\Settings\Connection;

class TelegramAuth extends Command
{
    protected $signature = 'telegram:auth';
    protected $description = 'Authenticate Telegram via phone number';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        try {
            // Настройки MadelineProto
            $settings = new Settings([
                'app_info' => new AppInfo([
                    'api_id' => env('TELEGRAM_API_ID'),
                    'api_hash' => env('TELEGRAM_API_HASH'),
                ]),
                'connection' => new Connection([
                    'default' => [
                        'async' => false, // Отключаем асинхронное соединение
                    ]
                ]),
                'logger' => [
                    'logger' => 0
                ],
                'ipc' => [
                    'enabled' => false, // Отключаем IPC
                ],
            ]);

            // Создаем экземпляр API с настройками
            $MadelineProto = new API(storage_path('app/telegram_session.madeline'), $settings);

            // Проверка текущей сессии
            if (!$MadelineProto->getSelf()) {
                $this->info('Начинаю процесс авторизации...');

                $phone = env('TELEGRAM_PHONE');
                if (!$phone) {
                    $this->error('Номер телефона не найден в .env');
                    return;
                }

                // Запрашиваем код подтверждения
                $this->info("Запрашиваю код подтверждения для номера {$phone}...");
                $MadelineProto->phoneLogin($phone);

                // Вводим код вручную
                $code = $this->ask('Введите код подтверждения, отправленный на ваш телефон:');
                $MadelineProto->completePhoneLogin($code);
                $this->info("Успешная авторизация!");
            } else {
                // Передаем экземпляр MadelineProto в конструктор класса
                $command = new TelegramAuth($MadelineProto);
                $command->handle();
            }
        } catch (\Exception $e) {
            $this->error("Ошибка авторизации: " . $e->getMessage());
        }
    }
}
