<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSuppliersOrderRequest extends FormRequest
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
            'supplier_id' => ['required', 'integer'],
            'warehouse_id' => ['required', 'integer'],
            'name_supplier' => ['required', 'string'],
            'name_warehouse' => ['required', 'string'],
            'status_id' => ['required', 'integer'],
            'total_bruto' => ['required', 'numeric'],
            'total_neto' => ['required', 'numeric'],
            'total_iva' => ['nullable', 'numeric'],
            'total_irpf' => ['nullable', 'numeric'],
            'date_order' => ['required', 'date_format:Y-m-d'],
            'paid_dated' => ['nullable', 'date_format:Y-m-d'],
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
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
        ]);
    }
}
