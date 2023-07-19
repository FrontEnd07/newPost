<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use App\Models\Address;

class UniqueStreetForAddress implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $currentUserId = auth()->id();
        $existingAddress = Address::where('street', $value)
            ->where('userId', $currentUserId)
            ->first();

        return $existingAddress === null;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Такой адрес уже существует';
    }
}
