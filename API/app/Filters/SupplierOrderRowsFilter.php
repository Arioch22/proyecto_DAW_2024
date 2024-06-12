<?php

namespace App\Filters;
use Illuminate\Http\Request;
use App\Filters\ApiFilter;

class SupplierOrderRowsFilter extends AppFilter{

    protected $safeParams = [
        'orderId' => ['eq'],
        'productId' => ['eq'],
        'descriptionProduct' => ['eq'],
        'priceUnity' => ['eq', 'lt', 'gt'],
        'totalBruto' => ['eq', 'lt', 'gt'],
    ];

    protected $columnMap = [
        'orderId' => 'order_id',
        'productId' => 'product_id',
        'descriptionProduct' => 'description_product',
        'priceUnity' => 'price_unity',
        'totalBruto' => 'total_bruto',
    ];

    protected $operatorMap = [
        'eq' => '=',
        'lt' => '<',
        'gt' => '>',
        'lte' => '<=',
        'gte' => '>=',
    ];
}
