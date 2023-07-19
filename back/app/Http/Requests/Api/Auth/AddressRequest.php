<?php

namespace App\Http\Requests\Api\Auth;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\UniqueStreetForAddress;

class AddressRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:9', 'min:9'],
            'city' => ['required', 'string', 'max:255'],
            'street' => ['required', 'string', 'max:255', new UniqueStreetForAddress()],
        ];
    }

    /**
     * Получить сообщения об ошибках для определенных правил валидации.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'phone.max' => 'Телефон не должен быть длиннее 9 символов.',
            'phone.min' => 'Телефон должен быть не менее 9 символов.',
        ];
    }
}
