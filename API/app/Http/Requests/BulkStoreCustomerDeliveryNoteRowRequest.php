<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BulkStoreCustomerDeliveryNoteRowRequest extends FormRequest
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

            '*.customer_delivery_note_id' => ['required', 'integer'],
            '*.product_id' => ['required', 'integer'],
            '*.description_product' => ['required', 'string'],
            '*.quantity' => ['required', 'numeric'],
            '*.price_unity' => ['required', 'numeric'],
            '*.total_neto' => ['required', 'numeric'],
            '*.tipo_iva' => ['required', 'integer'],
            '*.iva' => ['numeric'],
            '*.tipo_irpf' => ['integer', 'nullable'],
            '*.irpf' => ['numeric', 'nullable'],
            '*.total' => ['numeric', 'numeric'],

        ];
    }

    protected function prepareForValidation()
    {

        $data = [];

        foreach ($this->toArray() as $obj) {
            $obj['customer_delivery_note_id'] = $obj['customer_delivery_note_id'] ?? null;
            $obj['product_id'] = $obj['product_id'] ?? null;
            $obj['description_product'] = $obj['description_product'] ?? null;
            $obj['quantity'] = $obj['quantity'] ?? null;
            $obj['price_unity'] = $obj['price_unity'] ?? null;
            $obj['total_neto'] = $obj['total_neto'] ?? null;
            $obj['tipo_iva'] = $obj['tipo_iva'] ?? null;
            $obj['tipo_irpf'] = $obj['tipo_irpf'] ?? null;
            $obj['iva'] = $obj['iva'] ?? null;
            $obj['irpf'] = $obj['irpf'] ?? null;
            $obj['total'] = $obj['total'] ?? null;

            $data[] = $obj;
        }
        $this->merge($data);
    }
}
