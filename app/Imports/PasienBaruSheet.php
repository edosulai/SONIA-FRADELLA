<?php

namespace App\Imports;

use App\Models\Registran;
use Illuminate\Support\Carbon;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class PasienBaruSheet implements ToModel, WithHeadingRow
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        return new Registran([
            'id' => $row["pasien_baru_id"],
            'nama_pasien' => $row["nama_pasien"],
            'nama_kepala_keluarga' => $row["nama_kepala_keluarga"],
            'no_kartu' => $row["no_kartu"],
            'umur' => $row["umur"],
            'alamat' => $row["alamat"],
            'jenis_kelamin' => $row["jenis_kelamin"],
            'status_id' => $row["status_id"],
        ]);
    }

    /**
     * @return int
     */
    public function headingRow(): int
    {
        return 1;
    }
}
