<?php

namespace App\Http\Requests\Api\Auth;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
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
            'phone' => ['required', 'string', 'max:9', 'min:9'],
            'password' => ['required', 'string', 'min:6']
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
            'password.min' => "Пароль должен содержать не менее 6 символов"
        ];
    }
}
