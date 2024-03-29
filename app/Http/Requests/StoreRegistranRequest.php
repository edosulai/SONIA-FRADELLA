<?php

namespace App\Http\Requests;

use App\Models\StatusPasien;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRegistranRequest extends FormRequest
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
            'nama_pasien' => ['required', 'string'],
            'nama_kepala_keluarga' => ['required', 'string'],
            'no_kartu' => ['required', 'string'],
            'umur' => ['required', 'integer'],
            'alamat' => ['required'],
            'jenis_kelamin' => ['required', Rule::in(['laki-laki', 'perempuan'])],
            'status_id' => ['required', 'exists:' . StatusPasien::class . ',id'],
        ];
    }
}
