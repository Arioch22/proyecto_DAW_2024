<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCustomerOrderRequest;
use App\Http\Requests\UpdateCustomerOrderRequest;
use App\Models\CustomerOrder;
use App\Filters\CustomerOrderFilter;
use App\Http\Resources\CustomerOrderCollection;
use App\Http\Resources\CustomerOrderResource;
use App\Http\Resources\CustomerResource;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;


class CustomerOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $filter = new CustomerOrderFilter();
        $queryItems = $filter->transform($request);

        $includerows = $request->query('rows');
        $customerOrder = CustomerOrder::where($queryItems);


        if($includerows){

            $customerOrder = $customerOrder->with('OrderRows');

        }

        return new CustomerOrderCollection($customerOrder->paginate()->appends($request->query()));
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
    public function store(StoreCustomerOrderRequest $request)
    {
        //
        return new CustomerOrderResource(CustomerOrder::create($request->all()));
    }

    /**
     * Display the specified resource.
     */
    public function show(CustomerOrder $Order)
    {

        $includeRows = request()->query('rows');

        if ($includeRows) {
            return new CustomerOrderResource($Order->loadMissing('OrderRows'));
        }

        return new CustomerOrderResource($Order);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CustomerOrder $customerOrder)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCustomerOrderRequest $request, CustomerOrder $customerOrder)
    {
        //
        $customerOrder->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CustomerOrder $Order)
    {
        $delOrder = CustomerOrder::find($Order->id);

        if ($delOrder) {
            $delOrder->delete();
            return response()->json(['message' => 'Order deleted successfully'], 200);
        } else {
            return response()->json(['message' => 'Order not found'], 404);
        }
    }
}
