<?php

namespace App\Filters;
use Illuminate\Http\Request;
use App\Filters\ApiFilter;

class WarehouseFilter extends AppFilter{

    protected $safeParams = [
        'id' => ['eq'],
        'userId' => ['eq'],
        'name' => ['eq'],
        'dni' => ['eq'],
        'email' => ['eq'],
        'phone' => ['eq'],
        'address' => ['eq'],
        'city' => ['eq'],
        'state' => ['eq'],
        'country' => ['eq'],
        'postalCode' => ['eq', 'lt', 'gt'],
    ];

    protected $columnMap = [
        'postalCode' => 'postal_code',
        'userId' => 'user_id',
    ];

    protected $operatorMap = [
        'eq' => '=',
        'lt' => '<',
        'gt' => '>',
        'lte' => '<=',
        'gte' => '>=',
    ];
}
