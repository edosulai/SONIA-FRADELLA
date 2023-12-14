<?php

namespace App\Http\Controllers;

use App\Models\Pasien;
use App\Http\Requests\StorePasienRequest;
use App\Http\Requests\UpdatePasienRequest;
use App\Models\Dokter;
use App\Models\Registran;
use App\Models\Unit;
use App\Models\UnitPasien;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class PasienController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $from = $request->query('from') ? Carbon::parse($request->query('from'))->toDateTimeString() : null;
        $to = $request->query('to') ? Carbon::parse($request->query('to'))->toDateTimeString() : null;

        return Inertia::render('Pasien/Dashboard', [
            'pasien' => Pasien::selectRaw('
                pasiens.id,
                pasiens.registran_id,
                pasiens.created_at,
                registrans.nama_pasien,
                registrans.nama_kepala_keluarga,
                registrans.no_kartu,
                registrans.umur,
                registrans.alamat,
                registrans.jenis_kelamin,
                status_pasiens.status,
                unit_pasiens.unit_id,
                units.jenis_unit
            ')
                ->join('registrans', 'pasiens.registran_id', '=', 'registrans.id')
                ->join('status_pasiens', 'registrans.status_id', '=', 'status_pasiens.id')
                ->join('unit_pasiens', 'pasiens.id', '=', 'unit_pasiens.pasien_id')
                ->join('units', 'unit_pasiens.unit_id', '=', 'units.id')
                ->when($from && !$to, function ($q) use ($from) {
                    return $q->where('pasiens.created_at', '>', $from);
                })
                ->when(!$from && $to, function ($q) use ($to) {
                    return $q->where('pasiens.created_at', '<', $to);
                })
                ->when($from && $to, function ($q) use ($from, $to) {
                    return $q->whereBetween('pasiens.created_at', [$from, $to]);
                })
                ->orderBy('pasiens.created_at', 'desc')
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
        return Inertia::render('Pasien/Form', [
            'title' => 'Tambah Kunjugan',
            'registrans' => Registran::selectRaw('registrans.id, registrans.no_kartu')->get(),
            'units' => Unit::selectRaw('units.id, units.jenis_unit')->get(),
            'status' => session('status'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StorePasienRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePasienRequest $request)
    {
        $registran = Registran::where('no_kartu', $request->no_kartu)->first();

        $pasien = Pasien::create([
            'registran_id' => $registran->id
        ]);

        $unitPasien = [];
        foreach ($request->jenis_unit as $key => $value) {
            $unitPasien[] = [
                'pasien_id' => $pasien->id,
                'unit_id' => Unit::where('jenis_unit', $value)->first()->id,
                'created_at' => $pasien->created_at,
                'updated_at' => $pasien->updated_at
            ];
        }
        UnitPasien::insert($unitPasien);

        return redirect('dashboard');
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
    public function edit(Request $request, Pasien $pasien)
    {
        $pasien = $pasien->find($request->id);
        if (is_null($pasien))
            return abort(404);

        return Inertia::render('Pasien/Form', [
            'title' => 'Edit Registran',
            'status' => session('status'),
            'pasien' => [
                'id' => $pasien->id,
                'no_kartu' => Registran::find($pasien->registran_id)->no_kartu,
                'jenis_unit' => UnitPasien::where('pasien_id', $pasien->id)->get()->map(function ($unit) {
                    return Unit::find($unit->unit_id)->jenis_unit;
                }),
            ],
            'registrans' => Registran::selectRaw('registrans.id, registrans.no_kartu')->get(),
            'units' => Unit::selectRaw('units.id, units.jenis_unit')->get(),
        ]);
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
        $pasien = $pasien->find($request->id);
        if (is_null($pasien))
            return abort(400);

        $registran = Registran::where('no_kartu', $request->no_kartu)->first();

        $pasien->registran_id = $registran->id;
        $pasien->save();

        $unitPasien = UnitPasien::where('pasien_id', $pasien->id)->get();
        foreach ($unitPasien as $key => $value) {
            $value->delete();
        }

        $unitPasien = [];
        foreach ($request->jenis_unit as $key => $value) {
            $unitPasien[] = [
                'pasien_id' => $pasien->id,
                'unit_id' => Unit::where('jenis_unit', $value)->first()->id,
                'created_at' => $pasien->created_at,
                'updated_at' => $pasien->updated_at
            ];
        }
        UnitPasien::insert($unitPasien);

        return redirect()->route('dashboard')->with('status', 'Data Kunjugan ' . $request->no_kartu . ' Berhasil di Ubah');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Pasien  $pasien
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Pasien $pasien)
    {
        $validator = Validator::make(['id' => $request->id], [
            'id' => ['required', 'integer', 'exists:' . Pasien::class . ',id'],
        ]);

        if ($validator->fails()) {
            return redirect("dokter")
                ->withErrors($validator)
                ->withInput();
        }

        $pasien = $pasien->find($request->id);

        $unitPasien = UnitPasien::where('pasien_id', $pasien->id)->get();
        foreach ($unitPasien as $key => $value) {
            $value->delete();
        }

        $pasien->delete();

        return redirect()->route('dashboard')->with('status', 'Data Kunjungan ' . $request->no_kartu . ' Berhasil di Hapus');
    }
}
