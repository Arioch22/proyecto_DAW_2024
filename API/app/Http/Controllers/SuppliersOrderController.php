<?php

namespace App\Http\Controllers;

use App\Http\Resources\SupplierOrderCollection;
use App\Http\Resources\SuppliersOrderResource;
use App\Filters\SupplierOrderFilter;
use App\Http\Requests\StoreSuppliersOrderRequest;
use App\Http\Requests\UpdateSuppliersOrderRequest;
use App\Models\SuppliersOrder;
use Illuminate\Http\Request;

class SuppliersOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        $filter = new SupplierOrderFilter();
        $queryItems = $filter->transform($request);

        // $includerows = $request->query('rows');
        $suppliersOrder = SuppliersOrder::where($queryItems);

        return new SupplierOrderCollection($suppliersOrder->paginate()->appends($request->query()));
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
    public function store(StoreSuppliersOrderRequest $request)
    {
        //
        return new SuppliersOrderResource(SuppliersOrder::create($request->all()));
    }

    /**
     * Display the specified resource.
     */
    public function show(SuppliersOrder $suppliersOrder)
    {
        //
        return new SuppliersOrderResource($suppliersOrder);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SuppliersOrder $suppliersOrder)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSuppliersOrderRequest $request, SuppliersOrder $suppliersOrder)
    {
        //
        $suppliersOrder->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SuppliersOrder $suppliersOrder)
    {
        $delSupplierOrder = SuppliersOrder::find($suppliersOrder->id);

        if ($delSupplierOrder) {
            $delSupplierOrder->delete();
            return response()->json(['message' => 'Suppliers Order deleted successfully'], 200);
        } else {
            return response()->json(['message' => 'Suppliers Order not found'], 404);
        }
    }
}
