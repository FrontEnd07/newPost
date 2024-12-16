<?php

namespace App\Services;

class NumberService
{
    public function getLastNineDigits($inputString)
    {
        $numbersOnly = preg_replace('/\D/', '', $inputString);
        return substr($numbersOnly, -9);
    }
}
