<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TradingResource extends JsonResource
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
            'user_id' => $this->user_id,
            'name' => $this->name,
            'dni' => $this->dni,
            'address' => $this->address,
            'city' => $this->city,
            'state' => $this->state,
            'postalCode' => $this->postal_code,
            'phone' => $this->phone,
            'email' => $this->email,
            // 'invoices' => TradingInvoiceResource::collection($this->whenLoaded('TradingInvoices')),
            // 'orders' => TradingOrderResource::collection($this->whenLoaded('TradingOrders')),
            // 'delivery' => TradingDeliveryNoteResource::collection($this->whenLoaded('TradingDeliveryNotes')),
            'invoices' => CustomerInvoiceResource::collection($this->whenLoaded('CustomerInvoices')),
            'orders' => CustomerOrderResource::collection($this->whenLoaded('CustomerOrders')),
            'delivery' => CustomerDeliveryNoteResource::collection($this->whenLoaded('CustomerDeliveryNotes')),
        ];
    }
}
