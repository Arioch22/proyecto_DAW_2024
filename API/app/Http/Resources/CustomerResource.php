<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CustomerResource extends JsonResource
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
            'name' => $this->name,
            'type' => $this->type,
            'cifnif' => $this->cifnif,
            'address' => $this->address,
            'city' => $this->city,
            'state' => $this->state,
            'postalCode' => $this->postal_code,
            'phone' => $this->phone,
            'email' => $this->email,
            'invoices' => CustomerInvoiceResource::collection($this->whenLoaded('CustomerInvoices')),
            'orders' => CustomerOrderResource::collection($this->whenLoaded('CustomerOrders')),
            'delivery' => CustomerDeliveryNoteResource::collection($this->whenLoaded('CustomerDeliveryNotes')),
        ];
    }
}
