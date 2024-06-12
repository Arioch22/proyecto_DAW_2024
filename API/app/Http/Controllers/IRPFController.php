<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreIRPFRequest;
use App\Http\Requests\UpdateIRPFRequest;
use App\Http\Resources\IRPFCollection;
use App\Models\IRPF;

class IRPFController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $irpf = IRPF::all();
        return new IRPFCollection($irpf);
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
    public function store(StoreIRPFRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(IRPF $iRPF)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(IRPF $iRPF)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateIRPFRequest $request, IRPF $iRPF)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(IRPF $iRPF)
    {
        //
    }
}
