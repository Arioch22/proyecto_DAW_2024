<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderRowResource extends JsonResource
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
            'customerOrderId' => $this->customer_order_id,
            'productId' => $this->product_id,
            'descriptionProduct' => $this->description_product,
            'quantity' => $this->quantity,
            'priceUnity' => $this->price_unity,
            'totalNeto' => $this->total_neto,
            'iva' => $this->tipo_iva,
            'irpf' => $this->tipo_irpf,
            'total_iva' => $this->iva,
            'total_irpf' => $this->irpf,
            'total' => $this->total,

        ];
    }
}
