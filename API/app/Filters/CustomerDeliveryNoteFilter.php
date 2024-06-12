<?php

namespace App\Filters;
use Illuminate\Http\Request;
use App\Filters\ApiFilter;

class CustomerDeliveryNoteFilter extends AppFilter{

    protected $safeParams = [
        'deliveryNumber' => ['eq'],
        'customerId' => ['eq'],
        'tradingId' => ['eq'],
        'nameCustomer' => ['eq'],
        'nameTrading' => ['eq'],
        'statusId' => ['eq'],
        'totalBruto' => ['eq', 'lt', 'gt'],
        'totalNeto' => ['eq', 'lt', 'gt'],
        'totalIva' => ['eq', 'lt', 'gt'],
        'totalIrpf' => ['eq', 'lt', 'gt'],
        'dateOrder' => ['eq', 'lt', 'gt'],
        
    ];

    protected $columnMap = [

        'totalIva' => 'total_iva',
        'totalIrpf' => 'total_irpf',
        'dateOrder' => 'date_order',
        'totalBruto' => 'total_bruto',
        'totalNeto' => 'total_neto',
        'statusId' => 'status_id',
        'customerId' => 'customer_id',
        'tradingId' => 'trading_id',
        'nameCustomer' => 'name_customer',
        'nameTrading' => 'name_trading',
        'deliveryNumber' => 'delivery_number',
        
    ];
    
    protected $operatorMap = [
        'eq' => '=',
        'lt' => '<',
        'gt' => '>',
        'lte' => '<=',
        'gte' => '>=',
    ];

}