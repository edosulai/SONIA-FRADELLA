<?php

namespace App\Imports;

use App\Models\UnitPasien;
use Illuminate\Support\Carbon;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class UnitPasienSheet implements ToModel, WithHeadingRow
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        return new UnitPasien([
            'pasien_id' => $row["pasien_baru_id"],
            'unit_id' => $row["unit_id"],
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
