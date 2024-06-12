<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SuppliersOrder extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_number',
        'supplier_id',
        'warehouse_id',
        'name_supplier',
        'name_warehouse',
        'status_id',
        'total_bruto',
        'total_iva',
        'total_irpf',
        'total_neto',
        'date_order',
        'paid_date',

    ];

    /**
     * Get the Suppliers that owns the SuppliersOrder
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function Suppliers()
    {
        return $this->belongsTo(Supplier::class);
    }

    /**
     * Get all of the SuppliersRows for the SuppliersOrder
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function SuppliersRows()
    {
        return $this->hasMany(SuppliersRow::class);
    }

    /**
     * Get the warehouse that owns the SuppliersOrder
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function Warehouse()
    {
        return $this->belongsTo(Warehouse::class);
    }
}
