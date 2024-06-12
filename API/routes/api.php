<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\CustomerDeliveryNoteController;
use App\Http\Controllers\CustomerInvoiceController;
use App\Http\Controllers\CustomerOrderController;
use App\Http\Controllers\IRPFController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\SuppliersOrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\IVAController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DeliveryNoteRowController;
use App\Http\Controllers\InvoiceRowController;
use App\Http\Controllers\OrderRowController;
use App\Http\Controllers\TradingController;
use App\Http\Controllers\WarehouseController;
use App\Http\Controllers\StatusController;
use App\Http\Controllers\SuppliersRowController;
use App\Models\OrderRow;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::group(['prefix'=> 'v1', 'namespace' => 'App\Http\Controllers', 'middleware'=>'auth:sanctum'], function(){
    Route::get('user', function (Request $request) {
        return $request->user();
    });
    Route::apiResource('customers', CustomerController::class);
    Route::delete('customers/{id}', [CustomerController::class, 'destroy']);
    Route::apiResource('delivery', CustomerDeliveryNoteController::class);
    Route::delete('delivery/{id}', [CustomerDeliveryNoteController::class, 'destroy']);
    Route::apiResource('invoices', CustomerInvoiceController::class);
    Route::post('invoices/bulk', ['uses' => 'CustomerInvoiceController@bulkStore']);
    Route::delete('invoices/{id}', [CustomerInvoiceController::class, 'destroy']);
    Route::apiResource('orders', CustomerOrderController::class);
    Route::apiResource('ordersRows', OrderRowController::class);
    Route::delete('orders/{id}', [CustomerOrderController::class, 'destroy']);
    Route::post('ordersRows/bulk', [OrderRowController::class, 'bulkStore']);
    Route::apiResource('invoicesRows', InvoiceRowController::class);
    Route::post('invoicesRows/bulk', [InvoiceRowController::class, 'bulkStore']);
    Route::apiResource('deliveryRows', DeliveryNoteRowController::class);
    Route::post('deliveryRows/bulk', [DeliveryNoteRowController::class, 'bulkStore']);
    Route::apiResource('suppliers', SupplierController::class);
    Route::delete('suppliers/{id}', [SupplierController::class, 'destroy']);
    Route::apiResource('suppliersOrder', SuppliersOrderController::class);
    Route::delete('suppliersOrder/{id}', [SuppliersOrderController::class, 'destroy']);
    Route::apiResource('suppliersOrderRow', SuppliersRowController::class);
    Route::post('suppliersOrderRow/bulk', [SuppliersRowController::class, 'bulkStore']);
    Route::apiResource('products', ProductController::class);
    Route::delete('products/{id}', [ProductController::class, 'destroy']);
    Route::apiResource('iva', IvaController::class);
    Route::apiResource('irpf', IRPFController::class);
    Route::apiResource('warehouse', WarehouseController::class);
    Route::delete('warehouse/{id}', [WarehouseController::class, 'destroy']);
    Route::apiResource('trading', TradingController::class);
    Route::delete('trading/{id}', [TradingController::class, 'destroy']);
    Route::post('register', [AuthController::class, 'register']);
    Route::get('searchUserForId', [AuthController::class, 'searchUserForId']);
    Route::apiResource('status', StatusController::class);
});

Route::group(['prefix' => 'v2'], function(){
    Route::post('login', [AuthController::class, 'login']);
    Route::delete('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
});
