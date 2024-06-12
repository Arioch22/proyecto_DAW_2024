<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Warehouse extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'dni',
        'address',
        'city',
        'state',
        'postal_code',
        'phone',
        'email',

    ];

    /**
     * Get all of the suppliersOrders for the Warehouse
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function SuppliersOrders()
    {
        return $this->hasMany(SuppliersOrder::class);
    }

    /**
     * Get the user that owns the Warehouse
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function User()
    {
        return $this->belongsTo(User::class);
    }
}
