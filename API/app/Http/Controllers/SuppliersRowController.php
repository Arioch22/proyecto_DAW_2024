<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSuppliersRowRequest;
use App\Http\Requests\UpdateSuppliersRowRequest;
use App\Models\SuppliersRow;
use Illuminate\Support\Arr;
use App\Models\SuppliersOrder;
use App\Http\Requests\BulkStoreSuppliersOrderRowRequest;
use App\Filters\SupplierOrderRowsFilter;
use Illuminate\Http\Request;
use App\Http\Resources\SupplierOrderRowCollection;

class SuppliersRowController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        $filter = new SupplierOrderRowsFilter();
        $queryItems = $filter->transform($request);

        $suppliersRow = SuppliersRow::where($queryItems);

        return new SupplierOrderRowCollection($suppliersRow->paginate()->appends($request->query()));
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
    public function store(StoreSuppliersRowRequest $request)
    {
        //
    }
    public function bulkStore(BulkStoreSuppliersOrderRowRequest $request)
    {

        $bulk = collect($request->all())->map(function ($arr, $key) {

            return Arr::except($arr, ['id', 'created_at', 'updated_at']);
        });

        SuppliersRow::insert($bulk->toArray());

        return response()->json(['message' => 'Suppliers Order Row created successfully'], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(SuppliersRow $suppliersRow)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SuppliersRow $suppliersRow)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSuppliersRowRequest $request, SuppliersRow $suppliersRow)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SuppliersRow $suppliersRow)
    {
        //
    }
}
