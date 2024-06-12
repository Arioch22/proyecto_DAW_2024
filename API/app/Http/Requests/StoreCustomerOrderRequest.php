<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCustomerOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [

            'order_number' => ['required', 'string'],
            'customer_id' => ['required', 'integer'],
            'trading_id' => ['required', 'integer'],
            'name_customer' => ['required', 'string'],
            'name_trading' => ['required', 'string'],
            'status_id' => ['required', Rule::in([1, 2, 3])],
            'total_bruto' => ['required', 'numeric'],
            'total_neto' => ['required', 'numeric'],
            'total_iva' => ['required', 'numeric'],
            'total_irpf' => ['numeric', 'nullable'],
            'date_order' => ['required', 'date_format:Y-m-d'],
        ];
    }

    protected function prepareForValidation()
    {

            $this->merge([
                'order_number' => $this->orderNumber,
                'customer_id' => $this->customerId,
                'trading_id' => $this->tradingId,
                'name_customer' => $this->nameCustomer,
                'name_trading' => $this->nameTrading,
                'status_id' => $this->statusId,
                'total_bruto' => $this->totalBruto,
                'total_neto' => $this->totalNeto,
                'total_iva' => $this->totalIva,
                'total_irpf' => $this->totalIrpf,
                'date_order' => $this->dateOrder,
            ]);
    }
}
