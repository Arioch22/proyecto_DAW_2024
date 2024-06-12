<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeliveryNoteRow extends Model
{
    use HasFactory;

    protected $fillable = [

    ];

    /**
     * Get the CustomerDeliveryNotes that owns the DeliveryNoteRow
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function CustomerDeliveryNotes()
    {
        return $this->belongsTo(CustomerDeliveryNote::class);
    }

     /**
     * Get the IVA that owns the CustomerDeliveryNote
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function IVA()
    {
        return $this->belongsTo(IVA::class);
    }

    /**
     * Get the IRPF that owns the CustomerDeliveryNote
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function IRPF()
    {
        return $this->belongsTo(IRPF::class);
    }

    /**
     * Get all of the Products for the DeliveryNoteRow
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function Products()
    {
        return $this->hasMany(Product::class);
    }
}
