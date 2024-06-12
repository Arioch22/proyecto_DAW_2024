<?php

namespace App\Filters;
use Illuminate\Http\Request;
use App\Filters\ApiFilter;

class SupplierFilter extends AppFilter{

    protected $safeParams = [
        'user_id' => ['eq'],
        'name' => ['eq'],
        'type' => ['eq'],
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
