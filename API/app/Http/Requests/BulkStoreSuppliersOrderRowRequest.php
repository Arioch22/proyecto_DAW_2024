<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BulkStoreSuppliersOrderRowRequest extends FormRequest
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

            '*.order_id' => ['required', 'integer'],
            '*.product_id' => ['required', 'integer'],
            '*.description_product' => ['required', 'string'],
            '*.quantity' => ['required', 'numeric'],
            '*.price_unity' => ['required', 'numeric'],
            '*.total_bruto' => ['required', 'numeric'],
            '*.iva' => ['numeric'],
            '*.irpf' => ['numeric', 'nullable'],
            '*.total' => ['numeric', 'numeric'],

        ];
    }

        // protected function prepareForValidation()
        // {

        //     $data = [];

        //     foreach ($this->toArray() as $obj) {
        //         $obj['order_id'] = $obj['orderId'] ?? null;
        //         $obj['product_id'] = $obj['productId'] ?? null;
        //         $obj['description_product'] = $obj['description_product'] ?? null;
        //         $obj['quantity'] = $obj['quantity'] ?? null;
        //         $obj['price_unity'] = $obj['priceUnity'] ?? null;
        //         $obj['total_bruto'] = $obj['totalBruto'] ?? null;
        //         $obj['iva'] = $obj['iva'] ?? null;
        //         $obj['irpf'] = $obj['irpf'] ?? null;
        //         $obj['total'] = $obj['total'] ?? null;

        //         $data[] = $obj;
        //     }
        //     $this->merge($data);
        // }

}
