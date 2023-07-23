<?php

namespace App\Http\Requests\Api\Auth;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\UniqueTracker;

class TrackerRequest extends FormRequest
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
            'tracker' => ['required', 'string', 'max:255', new UniqueTracker()],
            'name' => [ 'max:255'],
            'quantity' => ['required', 'numeric'],
            'streetId' => ['required', 'numeric'],
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
            // 'tracker.unique' => 'Данный трек уже существует',
        ];
    }
}
