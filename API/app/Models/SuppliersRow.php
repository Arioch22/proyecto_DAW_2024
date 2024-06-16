<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SuppliersRow extends Model
{
    use HasFactory;

    protected $fillable = [
        "order_id",
        "productId",
        "description_product",
        "quantity",
        "priceUnity",
        "totalBruto",
        "iva",
        "irpf",
        "total"

    ];

    /**
     * Get the SuppliersOrders that owns the SuppliersRow
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function SuppliersOrders()
    {
        return $this->belongsTo(SuppliersOrder::class, 'order_id');
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
     * Get all of the Products for the SuppliersRow
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function Products()
    {
        return $this->hasMany(Product::class);
    }
}
