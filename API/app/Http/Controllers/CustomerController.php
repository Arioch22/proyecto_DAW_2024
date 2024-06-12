<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use App\Models\Customer;
use App\Http\Resources\CustomerCollection;
use App\Http\Resources\CustomerResource;
use App\Filters\CustomerFilter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = new CustomerFilter();
        $queryItems = $filter->transform($request);

        $includeinvoices = $request->query('includeinvoices');
        $includeOrders = $request->query('includeorders');
        $includeDeliveries = $request->query('includedeliveries');
        $customer = Customer::where($queryItems);

        if($includeinvoices){

            $customer = $customer->with('CustomerInvoices');
        }

        if ($includeOrders) {

            $customer = $customer->with('CustomerOrders');
        }

        if ($includeDeliveries) {

            $customer = $customer->with('CustomerDeliveryNotes');
        }


         return new CustomerCollection($customer->paginate()->appends($request->query()));
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
    public function store(StoreCustomerRequest $request)
    {
        //
        return new CustomerResource(Customer::create($request->all()));
    }

    /**
     * Display the specified resource.
     */
    public function show(Customer $customer)
    {

        $includeinvoices = request()->query('includeinvoices');
        $includeOrders = request()->query('includeorders');
        $includeDeliveries = request()->query('includedeliveries');

        if ($includeinvoices) {
            return new CustomerResource($customer->loadMissing('CustomerInvoices'));
        }

        if ($includeOrders) {
            return new CustomerResource($customer->loadMissing('CustomerOrders'));
        }

        if ($includeDeliveries) {
            return new CustomerResource($customer->loadMissing('CustomerDeliveryNotes'));
        }

        return new CustomerResource($customer);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Customer $customer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCustomerRequest $request, Customer $customer)
    {
        //
        $customer->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $customer)
    {

        $delCustomer = Customer::find($customer->id);

        if ($delCustomer && $delCustomer !== 1) {

            $delCustomer->delete();
            return response()->json(['message' => 'Customer deleted successfully'], 200);
        }

        return response()->json(['message' => 'Customer not found'], 404);
    }
}
