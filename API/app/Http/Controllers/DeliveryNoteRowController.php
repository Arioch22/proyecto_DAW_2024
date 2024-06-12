<?php

namespace App\Http\Controllers;

use App\Filters\deliveryRowsFilter;
use App\Http\Requests\BulkStoreCustomerDeliveryNoteRowRequest;
use App\Http\Requests\StoreDeliveryNoteRowRequest;
use App\Http\Requests\UpdateDeliveryNoteRowRequest;
use App\Http\Resources\DeliveryNoteRowCollection;
use App\Models\DeliveryNoteRow;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class DeliveryNoteRowController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        $filter = new deliveryRowsFilter();
        $queryItems = $filter->transform($request);

        $deliveryNoteRow = DeliveryNoteRow::where($queryItems);

        return new DeliveryNoteRowCollection($deliveryNoteRow->paginate()->appends($request->query()));
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
    public function store(StoreDeliveryNoteRowRequest $request)
    {
        //
    }

    public function bulkStore(BulkStoreCustomerDeliveryNoteRowRequest $request)
    {
        //
        $bulk = collect($request->all())->map(function($arr,$key){
            return Arr::except($arr, ['id', 'created_at', 'updated_at']);
        });

        DeliveryNoteRow::insert($bulk->toArray());

        return response()->json(['message' => 'Delivery rows created successfully'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(DeliveryNoteRow $deliveryNoteRow)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DeliveryNoteRow $deliveryNoteRow)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDeliveryNoteRowRequest $request, DeliveryNoteRow $deliveryNoteRow)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeliveryNoteRow $deliveryNoteRow)
    {
        //
    }
}
