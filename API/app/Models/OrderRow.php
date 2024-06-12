<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderRow extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_order_id',
        'product_id',
        'description_product',
        'quantity',
        'price_unity',
        'total_neto',
        'tipo_iva',
        'tipo_irpf',
        'iva',
        'irpf',
        'total',

    ];

    /**
     * Get the CustomerOrders that owns the OrderRow
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function CustomerOrders()
    {
        return $this->belongsTo(CustomerOrder::class);
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
     * Get all of the Products for the OrderRow
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function Products()
    {
        return $this->hasMany(Product::class);
    }
}
