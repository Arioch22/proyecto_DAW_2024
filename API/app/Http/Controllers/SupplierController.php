<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSupplierRequest;
use App\Http\Requests\UpdateSupplierRequest;
use App\Filters\SupplierFilter;
use App\Http\Resources\SupplierCollection;
use App\Models\Supplier;
use Illuminate\Http\Request;
use App\Http\Resources\SupplierResource;

class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = new SupplierFilter();
        $queryItems = $filter->transform($request);

        $includeOrders = $request->query('orders');
        $customer = Supplier::where($queryItems);

        if ($includeOrders) {
            $customer = $customer->with('SuppliersOrders');
        }


        return new SupplierCollection($customer->paginate()->appends($request->query()));
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
    public function store(StoreSupplierRequest $request)
    {
        //
        return new SupplierResource(Supplier::create($request->all()));
    }

    /**
     * Display the specified resource.
     */
    public function show(Supplier $supplier)
    {
        return new SupplierResource($supplier);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Supplier $supplier)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSupplierRequest $request, Supplier $supplier)
    {
        //
        $supplier->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Supplier $supplier)
    {
        $delSupplier = Supplier::find($supplier->id);

        if ($delSupplier) {
            $delSupplier->delete();
            return response()->json(['message' => 'Supplier deleted successfully'], 200);
        } else {
            return response()->json(['message' => 'Supplier not found'], 404);
        }
    }
}
