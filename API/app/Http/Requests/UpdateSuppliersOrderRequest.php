<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSuppliersOrderRequest extends FormRequest
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


            $method = $this->method();

            if ($method === 'PUT') {
                return [
                    'order_number' => ['required'],
                    'supplier_id' => ['required'],
                    'warehouse_id' => ['required'],
                    'name_supplier' => ['required'],
                    'name_warehouse' => ['required'],
                    'status_id' => ['required'],
                    'total_bruto' => ['required'],
                    'total_neto' => ['required'],
                    'total_iva' => ['nullable'],
                    'total_irpf' => ['nullable'],
                    'date_order' => ['required','date_format:Y-m-d'],
                    'paid_dated' => ['nullable','date_format:Y-m-d'],
                ];
            }else{
                return [
                    'order_number' => ['sometimes','required'],
                    'supplier_id' => ['sometimes','required'],
                    'warehouse_id' => ['sometimes','required'],
                    'name_supplier' => ['sometimes','required'],
                    'name_warehouse' => ['sometimes','required'],
                    'status_id' => ['sometimes','required'],
                    'total_bruto' => ['sometimes','required'],
                    'total_neto' => ['sometimes','required'],
                    'total_iva' => ['sometimes','nullable'],
                    'total_irpf' => ['sometimes','nullable'],
                    'date_order' => ['sometimes','required','date_format:Y-m-d'],
                    'paid_dated' => ['sometimes','nullable','date_format:Y-m-d'],
                ];
            }
        }

    protected function prepareForValidation()
    {


        $fieldsToMerge = [
            'order_number' => $this->orderNumber ?? null,
            'supplier_id' => $this->supplierId ?? null,
            'warehouse_id' => $this->warehouseId ?? null,
            'name_supplier' => $this->nameSupplier ?? null,
            'name_warehouse' => $this->nameWarehouse ?? null,
            'status_id' => $this->statusId ?? null,
            'total_bruto' => $this->totalBruto ?? null,
            'total_neto' => $this->totalNeto ?? null,
            'total_iva' => $this->totalIva ?? null,
            'total_irpf' => $this->totalIrpf ?? null,
            'date_order' => $this->dateOrder ?? null,
            'paid_dated' => $this->paidDated ?? null,
        ];

        foreach ($fieldsToMerge as $key => $value) {
            if ($this->$key !== null) {
                $this->merge([$key => $value]);
            }
        }
    }
}
