<?php

namespace App\Http\Controllers;

use App\Filters\WarehouseFilter;
use App\Http\Requests\StoreWarehouseRequest;
use App\Http\Requests\UpdateWarehouseRequest;
use App\Http\Resources\WarehouseCollection;
use App\Http\Resources\WarehouseResource;
use App\Models\Warehouse;
use Illuminate\Http\Request;

class WarehouseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(rEQUEST $request)
    {
        $filter = new WarehouseFilter();
        $queryItems = $filter->transform($request);

        $warehouse = Warehouse::where($queryItems);



         return new WarehouseCollection($warehouse->paginate()->appends($request->query()));
    }

    public function getwarehouseNameByUserId($userId)
    {
        $warehouse = Warehouse::where('user_id', $userId)->first();

        if ($warehouse) {
            // return new warehouseCollection($warehouse);
            return response()->json(['warehouseName' => $warehouse->name], 200);
        } else {
            return response()->json(['error' => 'warehouse not found'], 404);
            // return new warehouseCollection(['error' => 'warehouse not found']);
        }
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
    public function store(StoreWarehouseRequest $request)
    {
        return new WarehouseResource(Warehouse::create($request->all()));
    }

    /**
     * Display the specified resource.
     */
    public function show(Warehouse $warehouse)
    {
        $includeinvoices = request()->query('includeinvoices');

        if ($includeinvoices) {
            return new WarehouseResource($warehouse->loadMissing('CustomerInvoices'));
        }

        return new WarehouseResource($warehouse);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Warehouse $warehouse)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateWarehouseRequest $request, Warehouse $warehouse)
    {
        $warehouse->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Warehouse $warehouse)
    {
        $delWarehouse = Warehouse::find($warehouse->id);

        if ($delWarehouse) {
            $delWarehouse->delete();
            return response()->json(['message' => 'warehouse deleted'], 200);
        } else {
            return response()->json(['error' => 'warehouse not found'], 404);
        }
    }
}
