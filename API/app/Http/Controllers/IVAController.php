<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreIVARequest;
use App\Http\Requests\UpdateIVARequest;
use App\Http\Resources\IVACollection;
use App\Models\IVA;

class IVAController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $iva = IVA::all();
        return new IVACollection($iva);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreIVARequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(IVA $iVA)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(IVA $iVA)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateIVARequest $request, IVA $iVA)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(IVA $iVA)
    {
        //
    }
}
