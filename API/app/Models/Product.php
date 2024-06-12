<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'stock',
        'stock_min',

    ];

    /**
     * Get the OrderRows that owns the Product
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function OrderRows()
    {
        return $this->belongsTo(OrderRow::class);
    }

    /**
     * Get the DeliveryNoteRows that owns the Product
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function DeliveryNoteRows()
    {
        return $this->belongsTo(DeliveryNoteRow::class);
    }

    /**
     * Get the InvoiceRows that owns the Product
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function InvoiceRows()
    {
        return $this->belongsTo(InvoiceRow::class);
    }

    /**
     * Get the SuppliersRows that owns the Product
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function SuppliersRows()
    {
        return $this->belongsTo(SuppliersRow::class);
    }
}

