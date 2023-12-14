<?php

namespace App\Imports;

use App\Models\Employer;
use Illuminate\Support\Carbon;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class ExcelImport implements WithMultipleSheets
{
    public function sheets(): array
    {
        return [
            'Spesialis Dokter' => new SpesialisDokterSheet(),
            'Dokter' => new DokterSheet(),
            'Status Pasien Baru' => new StatusPasienBaruSheet(),
            'Pasien Baru' => new PasienBaruSheet(),
            'Kunjungan' => new KunjunganSheet(),
            'Unit' => new UnitSheet(),
            'Unit Pasien' => new UnitPasienSheet(),
        ];
    }

    public function onUnknownSheet($sheetName)
    {
        // E.g. you can log that a sheet was not found.
        info("Sheet {$sheetName} was skipped");
    }
}
