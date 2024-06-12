<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCustomerDeliveryNoteRequest extends FormRequest
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

            'delivery_number' => ['required', 'string'],
            'customer_id' => ['required', 'integer'],
            'trading_id' => ['required', 'integer'],
            'name_customer' => ['required', 'string'],
            'name_trading' => ['required', 'string'],
            'status_id' => ['required', Rule::in([1, 2, 3])],
            'total_bruto' => ['required', 'numeric'],
            'total_neto' => ['required', 'numeric'],
            'total_iva' => ['nullable', 'numeric'],
            'total_irpf' => ['numeric', 'nullable'],
            'date_order' => ['required', 'date_format:Y-m-d'],
            'paid_dated' => ['date_format:Y-m-d', 'nullable'],
        ];
    }

    protected function prepareForValidation()
    {

            $this->merge([
                'delivery_number' => $this->deliveryNumber ?? null,
                'customer_id' => $this->customerId ?? null,
                'trading_id' => $this->tradingId ?? null,
                'name_customer' => $this->nameCustomer ?? null,
                'name_trading' => $this->nameTrading ?? null,
                'status_id' => $this->statusId ?? null,
                'total_bruto' => $this->totalBruto ?? null,
                'total_neto' => $this->totalNeto ?? null,
                'total_iva' => $this->totalIva ?? null,
                'total_irpf' => $this->totalIrpf ?? null,
                'date_order' => $this->dateOrder ?? null,
                'paid_dated' => $this->paidDated ?? null,
            ]);
    }
}
