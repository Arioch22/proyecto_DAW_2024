<?php

namespace App\Filters;
use Illuminate\Http\Request;
use App\Filters\ApiFilter;

class orderRowsFilter extends AppFilter{

    protected $safeParams = [
        'customer_order_id' => ['eq'],
        'product_id' => ['eq'],
    ];

    protected $columnMap = [
    ];

    protected $operatorMap = [
        'eq' => '=',
        'lt' => '<',
        'gt' => '>',
        'lte' => '<=',
        'gte' => '>=',
    ];
}
