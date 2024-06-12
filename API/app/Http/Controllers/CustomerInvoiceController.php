<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCustomerInvoiceRequest;
use App\Http\Requests\UpdateCustomerInvoiceRequest;
use App\Http\Resources\CustomerInvoiceCollection;
use App\Http\Resources\CustomerInvoiceResource;
use App\Http\Requests\BulkStoreCustomerInvoiceRequest;
use App\Models\CustomerInvoice;
use App\Filters\InvoicerFilter;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class CustomerInvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

         $filter = new InvoicerFilter();
         $queryItems = $filter->transform($request);

         $includerows = $request->query('rows');
         $invoicer = CustomerInvoice::where($queryItems);

         if($includerows){

             $invoicer = $invoicer->with('InvoiceRows');
         }

         return new CustomerInvoiceCollection($invoicer->paginate()->appends($request->query()));
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
    public function store(StoreCustomerInvoiceRequest $request)
    {
        //
        return new CustomerInvoiceResource(CustomerInvoice::create($request->all()));
    }

    public function bulkStore(BulkStoreCustomerInvoiceRequest $request)
    {

        $bulk = collect($request->all())->map(function($arr,$key){

            return Arr::except($arr, ['id', 'created_at', 'updated_at']);

        });

       CustomerInvoice::insert($bulk->toArray());

       return response()->json(['message' => 'Invoices created successfully'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(CustomerInvoice $invoice)
    {
        return new CustomerInvoiceResource($invoice);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CustomerInvoice $customerInvoice)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCustomerInvoiceRequest $request, CustomerInvoice $customerInvoice)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CustomerInvoice $invoice)
    {
        $delInvoice = CustomerInvoice::find($invoice->id);


        if ($delInvoice) {
            $delInvoice->delete();
            return response()->json(['message' => 'Invoice deleted successfully'], 200);
        }

        return response()->json(['message' => 'Invoice not found'], 404);
    }
}
