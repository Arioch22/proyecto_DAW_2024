<?php

namespace App\Filters;
use Illuminate\Http\Request;
use App\Filters\ApiFilter;

class SupplierOrderFilter extends AppFilter{

    protected $safeParams = [
        'orderNumber' => ['eq'],
        'supplierId' => ['eq'],
        'warehouseId' => ['eq'],
        'nameSupplier' => ['eq'],
        'nameWarehouse' => ['eq'],
        'statusId' => ['eq'],
        'totalBruto' => ['eq', 'lt', 'gt'],
        'totalNeto' => ['eq', 'lt', 'gt'],
        'totalIva' => ['eq', 'lt', 'gt'],
        'totalIrpf' => ['eq', 'lt', 'gt'],
        'dateOrder' => ['eq', 'lt', 'gt'],
        'paidDated' => ['eq', 'lt', 'gt'],
    ];

    protected $columnMap = [

        'totalIva' => 'total_iva',
        'totalIrpf' => 'total_irpf',
        'dateOrder' => 'date_order',
        'paidDated' => 'paid_dated',
        'totalBruto' => 'total_bruto',
        'totalNeto' => 'total_neto',
        'statusId' => 'status_id',
        'supplierId' => 'supplier_id',
        'warehouseId' => 'warehouse_id',
        'nameSupplier' => 'name_supplier',
        'nameWarehouse' => 'name_warehouse',
        'orderNumber' => 'order_number',

    ];

    protected $operatorMap = [
        'eq' => '=',
        'lt' => '<',
        'gt' => '>',
        'lte' => '<=',
        'gte' => '>=',
    ];

}
