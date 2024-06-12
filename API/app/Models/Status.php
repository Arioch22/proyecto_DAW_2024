<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];


    /**
     * Get the CustomerOrders that owns the Status
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function CustomerOrders()
    {
        return $this->belongsTo(CustomerOrder::class);
    }

    /**
     * Get the CustomerDeliveryNotes that owns the Status
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function CustomerDeliveryNotes()
    {
        return $this->belongsTo(CustomerDeliveryNote::class);
    }

    /**
     * Get the CustomerInvoices that owns the Status
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function CustomerInvoices()
    {
        return $this->belongsTo(CustomerInvoice::class);
    }

    /**
     * Get the SuppliersOrders that owns the Status
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function SuppliersOrders()
    {
        return $this->belongsTo(SuppliersOrder::class);
    }
}
