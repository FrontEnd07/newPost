<?php

namespace App\Telegraph\Trait\Search;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use GuzzleHttp\Client;

trait PhotoTrait
{
    public function sendPostPhoto($track)
    {

        $fileName = $this->message->text() . '.jpg';

        if ($this->photoPath($fileName) != 'false')
            return storage_path('app/public/images/' . $fileName);

        $client = new Client();
        $url = 'http://114.215.123.98:8062/Service1.asmx/GetImage';

        $data = [
            'transNo' => $track,
            'CustomerNo' => '',
        ];

        $response = $client->post($url, [
            'form_params' => $data,
        ]);

        $body = $response->getBody();
        $contents = $body->getContents();
        $uri = $this->getUrlPhoto($contents);

        if ($uri == 'false')
            return 'false';

        $response = $client->get($this->getUrlPhoto($contents));
        $imageContent = $response->getBody()->getContents();
        Storage::disk('public')->put('images/' . $fileName, $imageContent);
        $filePath = storage_path('app/public/images/' . $fileName);

        return $filePath;
    }

    public function photoPath($fileName)
    {
        $filePath = storage_path('app/public/images/' . $fileName);

        if (file_exists($filePath)) {
            return $fileName;
        } else {
            return "false";
        }
    }

    public function getUrlPhoto($string)
    {
        $pattern = '/<string[^>]*>(.*?)<\/string>/';
        if (preg_match($pattern, $string, $matches)) {
            $content = $matches[1];
            return $content;
        } else {
            return 'false';
        }
    }
}
