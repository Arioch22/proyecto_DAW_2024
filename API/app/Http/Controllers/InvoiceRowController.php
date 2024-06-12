<?php

namespace App\Http\Controllers;

use App\Filters\invoiceRowsFilter;
use App\Http\Requests\StoreInvoiceRowRequest;
use App\Http\Requests\UpdateInvoiceRowRequest;
use App\Models\InvoiceRow;
use App\Http\Requests\BulkStoreCustomerInvoiceRowRequest;
use App\Http\Resources\InvoiceRowCollection;
use Illuminate\Support\Arr;
use Database\Factories\InvoiceRowFactory;
use Illuminate\Http\Request;

class InvoiceRowController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = new invoiceRowsFilter();
        $queryItems = $filter->transform($request);

        $invoiceRow = InvoiceRow::where($queryItems);

        return new InvoiceRowCollection($invoiceRow->paginate()->appends($request->query()));
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
    public function store(StoreInvoiceRowRequest $request)
    {
        //
    }

    public function bulkStore(BulkStoreCustomerInvoiceRowRequest $request)
    {
        //
        $bulk = collect($request->all())->map(function($arr,$key){
            return Arr::except($arr, ['id', 'created_at', 'updated_at']);
        });

        InvoiceRow::insert($bulk->toArray());

        return response()->json(['message' => 'Invoice rows created successfully'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(InvoiceRow $invoiceRow)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(InvoiceRow $invoiceRow)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateInvoiceRowRequest $request, InvoiceRow $invoiceRow)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(InvoiceRow $invoiceRow)
    {
        //
    }
}
