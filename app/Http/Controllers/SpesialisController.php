<?php

namespace App\Http\Controllers;

use App\Models\Spesialis;
use App\Http\Requests\StoreSpesialisRequest;
use App\Http\Requests\UpdateSpesialisRequest;

class SpesialisController extends Controller
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
     * @param  \App\Http\Requests\StoreSpesialisRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSpesialisRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Spesialis  $spesialis
     * @return \Illuminate\Http\Response
     */
    public function show(Spesialis $spesialis)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Spesialis  $spesialis
     * @return \Illuminate\Http\Response
     */
    public function edit(Spesialis $spesialis)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateSpesialisRequest  $request
     * @param  \App\Models\Spesialis  $spesialis
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateSpesialisRequest $request, Spesialis $spesialis)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Spesialis  $spesialis
     * @return \Illuminate\Http\Response
     */
    public function destroy(Spesialis $spesialis)
    {
        //
    }
}
