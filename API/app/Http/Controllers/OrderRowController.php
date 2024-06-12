<?php

namespace App\Http\Controllers;

use App\Filters\orderRowsFilter;
use App\Http\Requests\StoreOrderRowRequest;
use App\Http\Requests\UpdateOrderRowRequest;
use App\Models\OrderRow;
use App\Http\Requests\BulkStoreCustomerOrderRowRequest;
use App\Http\Resources\OrderRowCollection;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Redis;

class OrderRowController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        $filter = new orderRowsFilter();
        $queryItems = $filter->transform($request);

        $orderRow = OrderRow::where($queryItems);

        return new OrderRowCollection($orderRow->paginate()->appends($request->query()));
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
    public function store(StoreOrderRowRequest $request)
    {
        //
    }

    public function bulkStore(BulkStoreCustomerOrderRowRequest $request)
    {
        //

            $bulk = collect($request->all())->map(function($arr,$key){
                return Arr::except($arr, ['id', 'created_at', 'updated_at']);
            });

            OrderRow::insert($bulk->toArray());

            return response()->json(['message' => 'Order rows created successfully'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(OrderRow $orderRow)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(OrderRow $orderRow)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderRowRequest $request, OrderRow $orderRow)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OrderRow $orderRow)
    {
        //
    }
}
