<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use App\Models\User;

class AddTrackerAdmin implements Rule
{
    protected $errorMessages = [];

    public function __construct()
    {
        //
    }

    public function passes($attribute, $value)
    {
        $currentUserId = auth()->id();
        $existingAddress = User::where('id', $currentUserId)
            ->first();

        if ($existingAddress && $existingAddress->role != 0) {
            $this->errorMessages = 'Доступ запрещен';
            return false;
        }

        if (!empty($value) && !User::where('phone', $value)->exists()) {
            $this->errorMessages = 'Данный пользователь не существует';
            return false;
        }
        return true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return $this->errorMessages;
    }
}
