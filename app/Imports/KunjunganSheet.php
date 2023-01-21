<?php

namespace App\Imports;

use App\Models\Pasien;
use Illuminate\Support\Carbon;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class KunjunganSheet implements ToModel, WithHeadingRow
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        return new Pasien([
            'registran_id' => $row["pasien_baru_id"],
            'created_at' => $row["tanggal_kunjungan"],
            'updated_at' => $row["tanggal_kunjungan"],
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
