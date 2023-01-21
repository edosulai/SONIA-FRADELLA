<?php

namespace App\Http\Controllers;

use App\Models\StatusPasien;
use App\Http\Requests\StoreStatusPasienRequest;
use App\Http\Requests\UpdateStatusPasienRequest;

class StatusPasienController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
     * @param  \App\Http\Requests\StoreStatusPasienRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreStatusPasienRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\StatusPasien  $statusPasien
     * @return \Illuminate\Http\Response
     */
    public function show(StatusPasien $statusPasien)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\StatusPasien  $statusPasien
     * @return \Illuminate\Http\Response
     */
    public function edit(StatusPasien $statusPasien)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateStatusPasienRequest  $request
     * @param  \App\Models\StatusPasien  $statusPasien
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateStatusPasienRequest $request, StatusPasien $statusPasien)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\StatusPasien  $statusPasien
     * @return \Illuminate\Http\Response
     */
    public function destroy(StatusPasien $statusPasien)
    {
        //
    }
}
