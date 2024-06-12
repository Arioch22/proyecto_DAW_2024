<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SuppliersOrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'orderNumber' => $this->orderNumber,
            'supplierId' => $this->supplier_id,
            'warehouseId' => $this->warehouse_id,
            'nameSupplier' => $this->name_supplier,
            'nameWarehouse' => $this->name_warehouse,
            'statusId' => $this->status_id,
            'totalBruto' => $this->total_bruto,
            'totalNeto' => $this->total_neto,
            'totalIva' => $this->total_iva,
            'totalIrpf' => $this->total_irpf,
            'dateOrder' => $this->date_order,
            'paidDated' => $this->paidDated
            // 'rows' => OrderRowResource::collection($this->whenLoaded('OrderRows')),

        ];
    }
}
