<?php

namespace App\Http\Controllers;

use App\Models\Dokter;
use App\Http\Requests\StoreDokterRequest;
use App\Http\Requests\UpdateDokterRequest;
use Illuminate\Http\Request;
use App\Models\Spesialis;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class DokterController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Dokter/Index', [
            'data' => Dokter::selectRaw('dokters.*, spesialis.nama_spesialis')
                ->join('spesialis', 'spesialis.id', '=', 'dokters.spesialis_id')->get(),
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
        return Inertia::render('Dokter/Form', [
            'title' => 'Tambah Dokter',
            'status' => session('status'),
            'spesialis' => Spesialis::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreDokterRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreDokterRequest $request)
    {
        Dokter::create([
            'nama_dokter' => $request->nama_dokter,
            'no_identitas' => $request->no_identitas,
            'spesialis_id' => $request->spesialis_id,
        ]);

        return redirect('dokter');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Dokter  $dokter
     * @return \Illuminate\Http\Response
     */
    public function show(Dokter $dokter)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Dokter  $dokter
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, Dokter $dokter)
    {
        $dokter = $dokter->find($request->id);
        if (is_null($dokter)) return abort(404);

        return Inertia::render('Dokter/Form', [
            'title' => 'Edit Dokter',
            'status' => session('status'),
            'spesialis' => Spesialis::all(),
            'dokter' => $dokter,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateDokterRequest  $request
     * @param  \App\Models\Dokter  $dokter
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateDokterRequest $request, Dokter $dokter)
    {
        $dokter = $dokter->find($request->id);
        if (is_null($dokter)) return abort(400);

        $dokter->nama_dokter = $request->nama_dokter;
        $dokter->no_identitas = $request->no_identitas;
        $dokter->spesialis_id = $request->spesialis_id;
        $dokter->save();

        return redirect()->route('dokter')->with('status', 'Data Dokter ' . $request->nama_dokter . ' Berhasil di Ubah');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Dokter  $dokter
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Dokter $dokter)
    {
        $validator = Validator::make(['id' => $request->id], [
            'id' => ['required', 'integer', 'exists:' . Dokter::class . ',id'],
        ]);

        if ($validator->fails()) {
            return redirect("dokter")
                ->withErrors($validator)
                ->withInput();
        }

        $dokter = $dokter->find($request->id);
        $dokter->delete();

        return redirect()->route('dokter')->with('status', 'Data Dokter ' . $request->nama_dokter . ' Berhasil di Hapus');
    }
}
