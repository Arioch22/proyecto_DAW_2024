<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomerInvoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice_number',
        'customer_id',
        'trading_id',
        'name_customer',
        'name_trading',
        'status_id',
        'total_bruto',
        'total_iva',
        'total_neto',
        'total_irpf',
        'date_order',
        'paid_dated'

    ];

    /**
     * Get the user that owns the CustomerDeliveryNote
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function Customer()
    {
        return $this->belongsTo(Customer::class);
    }

    /**
     * Get the Tradings that owns the CustomerDeliveryNote
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function Tradings()
    {
        return $this->belongsTo(Trading::class);
    }

    /**
     * Get the Status that owns the CustomerDeliveryNote
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function Status()
    {
        return $this->belongsTo(Status::class);
    }

    /**
     * Get all of the OrderRows for the CustomerDeliveryNote
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */

    public function InvoiceRows()
    {
        return $this->hasMany(InvoiceRow::class);
    }
}
