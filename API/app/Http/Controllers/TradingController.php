<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTradingRequest;
use App\Http\Requests\UpdateTradingRequest;
use App\Http\Resources\TradingCollection;
use App\Http\Resources\TradingResource;
use Illuminate\Http\Request;

use App\Filters\TradingFilter;
use App\Models\Trading;
use App\Models\User;

class TradingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = new tradingFilter();
        $queryItems = $filter->transform($request);

        $includeinvoices = $request->query('includeinvoices');
        $includeOrders = $request->query('includeorders');
        $includeDeliveries = $request->query('includedeliveries');
        $trading = Trading::where($queryItems);

        if($includeinvoices){

            $trading = $trading->with('CustomerInvoices');
        }

        if ($includeOrders) {

            $trading = $trading->with('TradingOrders');
        }

        if ($includeDeliveries) {

            $trading = $trading->with('Trading1DeliveryNotes');
        }


         return new TradingCollection($trading->paginate()->appends($request->query()));
    }

    public function getTradingNameByUserId($userId)
    {
        $trading = Trading::where('user_id', $userId)->first();

        if ($trading) {
            // return new TradingCollection($trading);
            return response()->json(['tradingName' => $trading->name], 200);
        } else {
            return response()->json(['error' => 'Trading not found'], 404);
            // return new TradingCollection(['error' => 'Trading not found']);
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
    public function store(StoreTradingRequest $request)
    {
        return new TradingResource(Trading::create($request->all()));

        // $usuario = User::find($request->user_id);

        // $trading = Trading::create([
        //     'user_id' => $request->user_id,
        //     'name' => $usuario->name,
        //     'dni' => $request->dni,
        //     'address' => $request->address,
        //     'city' => $request->city,
        //     'state' => $request->state,
        //     'postal_code' => $request->postal_code,
        //     'phone' => $request->phone,
        //     'email' => $usuario->email,
        // ]);

        // return new TradingResource($trading);
    }

    /**
     * Display the specified resource.
     */
    public function show(Trading $trading)
    {

        $includeinvoices = request()->query('includeinvoices');
        $includeOrders = request()->query('includeorders');
        $includeDeliveries = request()->query('includedeliveries');

        if ($includeinvoices) {
            return new TradingResource($trading->loadMissing('CustomerInvoices'));
        }

        if ($includeOrders) {
            return new TradingResource($trading->loadMissing('TradingOrders'));
        }

        if ($includeDeliveries) {
            return new TradingResource($trading->loadMissing('TradingDeliveryNotes'));
        }

        return new TradingResource($trading);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Trading $trading)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTradingRequest $request, Trading $trading)
    {
        //
        $trading->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Trading $trading)
    {
        $deltrading = Trading::find($trading->id);

        if ($deltrading) {
            $deltrading->delete();
            return response()->json(['message' => 'Trading deleted'], 200);
        } else {
            return response()->json(['error' => 'Trading not found'], 404);
        }
    }
}
