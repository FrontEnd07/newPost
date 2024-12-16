<?php

namespace App\Telegraph\Trait;

use DefStudio\Telegraph\Keyboard\Keyboard;
use DefStudio\Telegraph\Keyboard\Button;
use App\Telegraph\Services\BackKeyboard;

trait AddressTrait
{
    protected BackKeyboard $back;

    public function __construct(?BackKeyboard $back = null)
    {
        $this->back = $back ?? new BackKeyboard();
    }

    protected function ensureBackInitialized(): void
    {
        if (!isset($this->back)) {
            $this->back = app(BackKeyboard::class); // Инициализация через контейнер Laravel
        }
    }

    public function cnAddress(): void
    {
        $this->updatePhotoAndCaption(
            'https://sun9-9.userapi.com/impg/Kd3kdukNh5aR4kCphfULnTiBVCYSJa7ya_fkow/OpNe9yicVig.jpg?size=1024x768&quality=95&sign=62fef63af2abafb53ec7564ec8455e45&type=album',
            '<b>Город отправления в Китае?</b>',
            $this->addressKeyboardCn()
        );
        $this->clearLastMessageIds();
    }

    public function addressTj(): void
    {
        $cityCn = $this->data->get('city-cn');

        $this->updatePhotoAndCaption(
            'https://asia-terminal.ru/wp-content/uploads/2017/04/dostavka-v-hudzhand.jpg',
            '<b>Город получения в Таджикистане?</b>',
            $this->addressKeyboardTj($cityCn)
        );
    }

    public function address(): void
    {
        $cityTj = $this->data->get('city-tj');
        $cityCn = $this->data->get('city-cn');

        match ([$cityCn, $cityTj]) {
            ['guangzhou', 'khujand'] => $this->addressGzKhujand(),
            ['guangzhou', 'dushanbe'] => $this->addressGzDushanbe(),
            ['yiwu', 'khujand'] => $this->addressYiwuKhujand(),
            ['yiwu', 'dushanbe'] => $this->addressYiwuDushanbe(),
            default => null,
        };
    }

    public function addressGzDushanbe(): void
    {
        $this->ensureBackInitialized();

        $this->sendMediaGroup([
            'https://sun9-68.userapi.com/impg/34tSk4g5-0ayEdGf-n3jXQ-jFgNAYAx9L7OomA/XRVhxUig7Hg.jpg?size=543x522&quality=96&sign=d082150d63b1b9aa7d8a991c6592d89e&type=album',
            'https://sun9-48.userapi.com/impg/9L_dg6ZG3l2KU2fgZaPUvxkHMPnTS7oxPmzowA/7pcok8u3B8I.jpg?size=619x1337&quality=96&sign=3ce1e45e1de32383ecc98fa159bc19dd&type=album',
            'https://sun9-17.userapi.com/impg/_irv0kZkiex-4fRr4Te8Rz3jxkZErblonSrpFw/Va4ig5xmK5s.jpg?size=619x1326&quality=96&sign=a83bd4c3b0b2db7cedb0e9b30a1a676a&type=album',
        ]);

        $this->sendInfoMessage(
            "<b>1) Pinduoduo</b>\n<b>2) Taobao</b>\n<b>3) 1688</b>\n<code>M0904/Номер-телефон 18820043668 广东省佛山市南海区 里水镇草场海南洲工业园G区2号5号仓M0904/Номер-телефон</code>",
            $this
                ->back
                ->getReturn('cnAddress')
        );
    }

    public function addressGzKhujand(): void
    {
        $this
            ->ensureBackInitialized();

        $this
            ->sendMediaGroup([
                'https://sun9-21.userapi.com/impg/DXFT-tU56jzbuPTyfGWj85nSFsvk0plZyAiIdg/MgnK5Jfw-hA.jpg?size=545x514&quality=96&sign=f638ec2cb8263b223150522504023d8a&type=album',
                'https://sun9-12.userapi.com/impg/Gb9cORQtIJvKK7Ntgsx8pkd7AXKKOyXMksElLQ/Ron7qE3YE1A.jpg?size=613x1190&quality=96&sign=e3dd52e99cbd4f013d7a4a54654cc5bb&type=album',
                'https://sun9-27.userapi.com/impg/E2ZZg2Gj0WflJYlp9Ps6HX4BMO0v_mSyuVFOUw/YtPj9acxhZw.jpg?size=614x1322&quality=96&sign=a8cb5f6c3ad855c874796e8cf982e8f4&type=album',
            ]);

        $this
            ->sendInfoMessage(
                "<b>1) Pinduoduo</b>\n<b>2) Taobao</b>\n<b>3) 1688</b>\n<code>9290/Номер-телефон 18820043668 广东省佛山市南海区 里水镇草场海南洲工业园G区2号5号仓9290/Номер-телефон</code>",
                $this
                    ->back
                    ->getReturn('cnAddress')
            );
    }

    public function addressYiwuKhujand(): void
    {
        $this
            ->ensureBackInitialized();

        $this
            ->sendMediaGroup([
                'https://sun9-27.userapi.com/impg/iAO_3lar6UczVPYxrtfkRJqus25L-Hg7f_3ykg/bqmiAGWKS_k.jpg?size=545x520&quality=96&sign=f1233eb50b4b6a8aee26803dab24df82&type=album',
                'https://sun9-71.userapi.com/impg/xMKv_HVnQHhnK9HgW4nSAp1j0uphxojjKq7pLw/wVF0yVMBNoQ.jpg?size=615x772&quality=96&sign=261962f533f1f4af68c6a4f164ba4350&type=album',
                'https://sun9-33.userapi.com/impg/jjCB1ADj26rEB6QvOoq7T5F5VjnznqzE1VThMw/bZetcpzCR3o.jpg?size=618x1326&quality=96&sign=755de5a958f00966a6751a64944717ab&type=album',
            ]);

        $this
            ->sendInfoMessage(
                "<b>1) Pinduoduo</b>\n<b>2) Taobao</b>\n<b>3) 1688</b>\n<code>9290/Номер-телефон 13362909797 浙江省金华市义乌市 后宅街道遗安二区21栋三单元一楼店面欧利纳斯9290/Номер-телефон</code>",
                $this->back->getReturn('cnAddress')
            );
    }

    public function addressYiwuDushanbe(): void
    {
        $this
            ->ensureBackInitialized();

        $this
            ->sendMediaGroup([
                'https://sun9-66.userapi.com/impg/G3hBQFto459q-WKFeXlD6Vt531xU9e0LfH8mmQ/BzxCIacAvuY.jpg?size=545x520&quality=96&sign=fcae69561f66f592da4fd1ecd03ecfa0&type=album',
                'https://sun9-77.userapi.com/impg/AVWX11yTymTr5DX57QdM0mtnu-XoCM9RBTr9dg/-_aztppgnKE.jpg?size=614x772&quality=96&sign=8adbe5d380239149ef8f4f9d9aa8b257&type=album',
                'https://sun9-65.userapi.com/impg/6j8rnIsybB0B2_pXZdNmsG2MoTwff-o3SZzWSg/YWkOa6A-XuM.jpg?size=617x1325&quality=96&sign=c7d04ea2f2f04865b55b2c495cf90fda&type=album',
            ]);

        $this
            ->sendInfoMessage(
                "<b>1) Pinduoduo</b>\n<b>2) Taobao</b>\n<b>3) 1688</b>\n<code>M0904/Номер-телефон 13362909797 浙江省金华市义乌市 后宅街道遗安二区21栋三单元一楼店面欧利纳斯M0904/Номер-телефон</code>",
                $this
                    ->back
                    ->getReturn('cnAddress')
            );
    }

    public static function addressKeyboardCn(): Keyboard
    {
        return Keyboard::make()
            ->row([
                Button::make('🇨🇳 Гуанчжоу')->action('addressTj')->param('city-cn', 'guangzhou'),
                Button::make('🇨🇳 Иву')->action('addressTj')->param('city-cn', 'yiwu'),
            ])
            ->row([
                Button::make('✈️ Авиа')->action('addressTj')->param('city-cn', 'airline'),
            ])
            ->button('🔙 Назад')->action('MenuBack')->param('back', 1);
    }

    public static function addressKeyboardTj(string $cityCn): Keyboard
    {
        return Keyboard::make()
            ->row([
                Button::make('🇹🇯 Душанбе')->action('address')->param('city-tj', 'dushanbe')->param('city-cn', $cityCn),
                Button::make('🇹🇯 Худжанд')->action('address')->param('city-tj', 'khujand')->param('city-cn', $cityCn),
            ])
            ->button('🔙 Назад')->action('cnAddress');
    }

    private function updatePhotoAndCaption(string $photoUrl, string $caption, Keyboard $keyboard): void
    {
        $this->chat
            ->editMedia($this->messageId)
            ->photo($photoUrl)
            ->send();

        $this->chat
            ->editCaption($this->messageId)
            ->message($caption)
            ->keyboard($keyboard)
            ->send();
    }

    private function sendMediaGroup(array $mediaUrls): void
    {
        $mediaGroup = array_map(fn ($url) => ['type' => 'photo', 'media' => $url], $mediaUrls);
        $response = $this->chat->mediaGroup($mediaGroup)->send();

        $messageIds = collect($response['result'])->pluck('message_id')->toArray();
        $this->chat->storage()->set('last-message-ids', $messageIds);
    }

    private function sendInfoMessage(string $message, Keyboard $keyboard): void
    {
        $this->chat->message($message)->keyboard($keyboard)->send();
        $this->chat->deleteMessage($this->messageId)->send();
    }

    private function clearLastMessageIds(): void
    {
        $messageIds = $this->chat->storage()->get('last-message-ids');

        if ($messageIds)
            $this->chat->deleteMessages($messageIds)->send();
    }
}
