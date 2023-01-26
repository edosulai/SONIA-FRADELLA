<?php

namespace App\Http\Controllers;

use App\Models\Pasien;
use App\Http\Requests\StorePasienRequest;
use App\Http\Requests\UpdatePasienRequest;
use App\Models\Dokter;
use App\Models\Registran;
use App\Models\Unit;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PasienController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Pasien/Dashboard', [
            'data' => Pasien::selectRaw('
                pasiens.id,
                pasiens.registran_id,
                pasiens.created_at,
                registrans.nama_pasien,
                registrans.nama_kepala_keluarga,
                registrans.no_kartu,
                registrans.umur,
                registrans.alamat,
                registrans.jenis_kelamin,
                registrans.status,
                unit_pasiens.unit_id,
                units.jenis_unit
            ')
                ->join('registrans', 'pasiens.registran_id', '=', 'registrans.id')
                ->join('unit_pasiens', 'pasiens.id', '=', 'unit_pasiens.pasien_id')
                ->join('units', 'unit_pasiens.unit_id', '=', 'units.id')
                // ->orderBy('registrans.nama_pasien')
                ->orderBy('pasiens.created_at', 'desc')
                // ->limit(10)
                ->get(),
            'unit' => Unit::all(),
            'total_pasien' => Pasien::count(),
            'total_dokter' => Dokter::count(),
            'total_registran' => Registran::count(),
            'status' => session('status'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StorePasienRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePasienRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Pasien  $pasien
     * @return \Illuminate\Http\Response
     */
    public function show(Pasien $pasien)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Pasien  $pasien
     * @return \Illuminate\Http\Response
     */
    public function edit(Pasien $pasien)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatePasienRequest  $request
     * @param  \App\Models\Pasien  $pasien
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePasienRequest $request, Pasien $pasien)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Pasien  $pasien
     * @return \Illuminate\Http\Response
     */
    public function destroy(Pasien $pasien)
    {
        //
    }
}
