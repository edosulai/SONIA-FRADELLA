<?php

namespace App\Http\Controllers;

use App\Models\Registran;
use App\Http\Requests\StoreRegistranRequest;
use App\Http\Requests\UpdateRegistranRequest;
use App\Models\StatusPasien;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class RegistranController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Registran/Index', [
            'data' => Registran::all(),
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
        return Inertia::render('Registran/Form', [
            'title' => 'Tambah Registran',
            'status' => session('status'),
            'status_pasien' => StatusPasien::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreRegistranRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreRegistranRequest $request)
    {
        Registran::create([
            'nama_pasien' => $request->nama_pasien,
            'nama_kepala_keluarga' => $request->nama_kepala_keluarga,
            'no_kartu' => $request->no_kartu,
            'umur' => $request->umur,
            'alamat' => $request->alamat,
            'jenis_kelamin' => $request->jenis_kelamin,
            'status_id' => $request->status_id,
        ]);

        return redirect('registran');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Registran  $registran
     * @return \Illuminate\Http\Response
     */
    public function show(Registran $registran)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Registran  $registran
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, Registran $registran)
    {
        $registran = $registran->find($request->id);
        if (is_null($registran)) return abort(404);

        return Inertia::render('Registran/Form', [
            'title' => 'Edit Registran',
            'status' => session('status'),
            'status_pasien' => StatusPasien::all(),
            'registran' => $registran,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateRegistranRequest  $request
     * @param  \App\Models\Registran  $registran
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateRegistranRequest $request, Registran $registran)
    {
        $registran = $registran->find($request->id);
        if (is_null($registran)) return abort(400);

        $registran->nama_pasien = $request->nama_pasien;
        $registran->nama_kepala_keluarga = $request->nama_kepala_keluarga;
        $registran->no_kartu = $request->no_kartu;
        $registran->umur = $request->umur;
        $registran->alamat = $request->alamat;
        $registran->jenis_kelamin = $request->jenis_kelamin;
        $registran->status_id = $request->status_id;
        $registran->save();

        return redirect()->route('registran')->with('status', 'Data Registran ' . $request->nama_pasien . ' Berhasil di Ubah');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Registran  $registran
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Registran $registran)
    {
        $validator = Validator::make(['id' => $request->id], [
            'id' => ['required', 'integer', 'exists:' . Registran::class . ',id'],
        ]);

        if ($validator->fails()) {
            return redirect("dokter")
                ->withErrors($validator)
                ->withInput();
        }

        $registran = $registran->find($request->id);
        $registran->delete();

        return redirect()->route('registran')->with('status', 'Data Registran ' . $request->nama_pasien . ' Berhasil di Hapus');
    }
}
