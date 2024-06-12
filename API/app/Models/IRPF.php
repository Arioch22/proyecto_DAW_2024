<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IRPF extends Model
{
    use HasFactory;

    protected $fillable = [

    ];

    /**
     * Get all of the SuppliersRows for the IRPF
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function SuppliersRows()
    {
        return $this->hasMany(SuppliersRow::class);
    }

    /**
     * Get all of the InvoiceRows for the IRPF
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function InvoiceRows()
    {
        return $this->hasMany(InvoiceRow::class);
    }

    /**
     * Get all of the DeliveryNoteRows for the IRPF
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function DeliveryNoteRows()
    {
        return $this->hasMany(DeliveryNoteRow::class);
    }

    /**
     * Get all of the OrderRows for the IRPF
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function OrderRows()
    {
        return $this->hasMany(OrderRow::class);
    }


}
