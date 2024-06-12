<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'cifnif',
        'address',
        'city',
        'state',
        'postal_code',
        'phone',
        'email',
    ];

    /**
     * Get all of the SuppliersOrders for the Suplier
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function SuppliersOrders()
    {
        return $this->hasMany(SuppliersOrder::class);
    }

}
