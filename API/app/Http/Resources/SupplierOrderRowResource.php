<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SupplierOrderRowResource extends JsonResource
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
            'orderId' => $this->order_id,
            'productId' => $this->product_id,
            'descriptionProduct' => $this->description_product,
            'quantity' => $this->quantity,
            'priceUnity' => $this->price_unity,
            'totalBruto' => $this->total_bruto,
            'iva' => $this->iva,
            'irpf' => $this->irpf,
            'total' => $this->total,
        ];
    }
}
