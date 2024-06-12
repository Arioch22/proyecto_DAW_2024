<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CustomerDeliveryNoteResource extends JsonResource
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
            'deliveryNumber' => $this->delivery_number,
            'customerId' => $this->customer_id,
            'tradingId' => $this->trading_id,
            'nameCustomer' => $this->name_customer,
            'nameTrading' => $this->name_trading,
            'statusId' => $this->status_id,
            'totalBruto' => $this->total_bruto,
            'totalNeto' => $this->total_neto,
            'totalIva' => $this->total_iva,
            'totalIrpf' => $this->total_irpf,
            'dateOrder' => $this->date_order,
            'rows' => DeliveryRowResource::collection($this->whenLoaded('DeliveryNoteRows')),

        ];
    }
}
