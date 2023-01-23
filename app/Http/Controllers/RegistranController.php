<?php

namespace App\Http\Controllers;

use App\Models\Registran;
use App\Http\Requests\StoreRegistranRequest;
use App\Http\Requests\UpdateRegistranRequest;
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
        return Inertia::render('Registran');
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
     * @param  \App\Http\Requests\StoreRegistranRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreRegistranRequest $request)
    {
        //
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
    public function edit(Registran $registran)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Registran  $registran
     * @return \Illuminate\Http\Response
     */
    public function destroy(Registran $registran)
    {
        //
    }
}
