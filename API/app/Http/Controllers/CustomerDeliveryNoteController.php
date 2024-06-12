<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCustomerDeliveryNoteRequest;
use App\Http\Requests\UpdateCustomerDeliveryNoteRequest;
use App\Http\Resources\CustomerDeliveryNoteCollection;
use App\Http\Resources\CustomerDeliveryNoteResource;
use App\Filters\CustomerDeliveryNoteFilter;
use App\Models\CustomerDeliveryNote;
use Illuminate\Http\Request;


class CustomerDeliveryNoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $filter = new CustomerDeliveryNoteFilter();
        $queryItems = $filter->transform($request);

        $includerows = $request->query('rows');
        $invoicer = CustomerDeliveryNote::where($queryItems);

        if($includerows){

            $invoicer = $invoicer->with('DeliveryNoteRows');
        }

        return new CustomerDeliveryNoteCollection($invoicer->paginate()->appends($request->query()));

        //return CustomerDeliveryNote::all();
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
    public function store(StoreCustomerDeliveryNoteRequest $request)
    {
        //
        return new CustomerDeliveryNoteResource(CustomerDeliveryNote::create($request->all()));
    }

    /**
     * Display the specified resource.
     */
    public function show(CustomerDeliveryNote $Delivery)
    {
        //

        $includeRows = request()->query('rows');

        if ($includeRows) {
            return new CustomerDeliveryNoteResource($Delivery->loadMissing('DeliveryNoteRows'));
        }

        return new CustomerDeliveryNoteResource($Delivery);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CustomerDeliveryNote $customerDeliveryNote)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCustomerDeliveryNoteRequest $request, CustomerDeliveryNote $customerDeliveryNote)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CustomerDeliveryNote $Delivery)
    {
        $delDelivery = CustomerDeliveryNote::find($Delivery->id);


        if ($delDelivery) {
            $delDelivery->delete();
            return response()->json(['message' => 'Delivery deleted successfully'], 200);
        }
        // else{
        //     return var_dump($delDelivery);
        // }

        return response()->json(['message' => 'Delivery not found'], 404);

        // return response()->json(['message' => `${$delDelivery}`], 404);
    }
}
