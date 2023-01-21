<?php

namespace App\Http\Requests;

use App\Models\Registran;
use App\Models\Unit;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePasienRequest extends FormRequest
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
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'no_kartu' => ['required', 'integer', 'exists:' . Registran::class . ',no_kartu'],
            'jenis_unit' => ['required', 'array', 'exists:' . Unit::class . ',jenis_unit'],
        ];
    }
}
