<?php

namespace App\Http\Requests\Api\Auth;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\AddTrackerAdmin;

class AdminAddTrackerRequest extends FormRequest
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
            'tracker' => ['required', 'array'],
            'status' => ['required', 'string'],
            'tracker.*' => ['required', 'string', 'max:255'],
            'phone' => ['nullable', new AddTrackerAdmin],
        ];
    }
}
