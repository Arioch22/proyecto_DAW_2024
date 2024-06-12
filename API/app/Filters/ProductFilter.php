<?php

namespace App\Filters;
use Illuminate\Http\Request;
use App\Filters\ApiFilter;

class ProductFilter extends AppFilter{

    protected $safeParams = [
        'name' => ['eq'],
        'description' => ['eq'],
        'price' => ['eq', 'lt', 'gt', 'lte', 'gte'],
        'stock' => ['eq', 'lt', 'gt', 'lte', 'gte'],
        'stockMin' => ['eq', 'lt', 'gt', 'lte', 'gte']
    ];

    protected $columnMap = [
        'stockMin' => 'stock_min'
    ];

    protected $operatorMap = [
        'eq' => '=',
        'lt' => '<',
        'gt' => '>',
        'lte' => '<=',
        'gte' => '>=',
    ];
}
