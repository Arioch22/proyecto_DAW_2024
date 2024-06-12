<?php

namespace App\Filters;
use Illuminate\Http\Request;
use App\Filters\AppFilter;

class CustomerFilter extends AppFilter{

    protected $safeParams = [
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
        'postalCode' => 'postal_code'
    ];
    
    protected $operatorMap = [
        'eq' => '=',
        'lt' => '<',
        'gt' => '>',
        'lte' => '<=',
        'gte' => '>=',
    ];

}