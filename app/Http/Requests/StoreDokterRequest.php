<?php

namespace App\Http\Requests;

use App\Models\Spesialis;
use Illuminate\Foundation\Http\FormRequest;

class StoreDokterRequest extends FormRequest
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
            'nama_dokter' => ['required', 'string'],
            'no_identitas' => ['required', 'integer'],
            'spesialis_id' => ['required', 'integer', 'exists:' . Spesialis::class . ',id'],
        ];
    }
}
