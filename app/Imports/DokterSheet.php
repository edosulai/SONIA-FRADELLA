<?php

namespace App\Imports;

use App\Models\Dokter;
use Illuminate\Support\Carbon;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class DokterSheet implements ToModel, WithHeadingRow
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        return new Dokter([
            'nama_dokter' => $row["nama_dokter"],
            'no_identitas' => $row["no_identitas"],
            'spesialis_id' => $row["spesialis_id"],
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
