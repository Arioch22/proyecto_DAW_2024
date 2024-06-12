<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class BulkStoreCustomerInvoiceRequest extends FormRequest
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

            '*.invoice_number' => ['required', 'string'],
            '*.customer_id' => ['required', 'integer'],
            '*.trading_id' => ['required', 'integer'],
            '*.name_customer' => ['required', 'string'],
            '*.name_trading' => ['required', 'string'],
            '*.status_id' => ['required', Rule::in([0, 1, 2])],
            '*.total_bruto' => ['required', 'numeric'],
            '*.total_neto' => ['required', 'numeric'],
            '*.total_iva' => ['required', 'numeric'],
            '*.total_irpf' => ['numeric', 'nullable'],
            '*.date_order' => ['required', 'date_format:Y-m-d'],
            '*.paid_dated' => ['date_format:Y-m-d', 'nullable'],

        ];
    }

    protected function prepareForValidation()
    {

        $data = [];

        foreach ($this->toArray() as $obj) {
            $obj['invoice_number'] = $obj['invoice_number'] ?? null;
            $obj['customer_id'] = $obj['customer_id'] ?? null;
            $obj['trading_id'] = $obj['trading_id'] ?? null;
            $obj['name_customer'] = $obj['name_customer'] ?? null;
            $obj['name_trading'] = $obj['name_trading'] ?? null;
            $obj['status_id'] = $obj['status_id'] ?? null;
            $obj['total_bruto'] = $obj['total_bruto'] ?? null;
            $obj['total_neto'] = $obj['total_neto'] ?? null;
            $obj['total_iva'] = $obj['total_iva'] ?? null;
            $obj['total_irpf'] = $obj['total_irpf'] ?? null;
            $obj['date_order'] = $obj['date_order'] ?? null;
            $obj['paid_dated'] = $obj['paid_dated'] ?? null;

            $data[] = $obj;
        }
        $this->merge($data);
    }

}
