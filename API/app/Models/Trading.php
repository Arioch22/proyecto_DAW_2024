<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trading extends Model
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
     * Get all of the CustomerOrders for the Trading
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function CustomerOrders()
    {
        return $this->hasMany(CustomerOrder::class);
    }

    /**
     * Get all of the CustomerDeliveryNotes for the Trading
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function CustomerDeliveryNotes()
    {
        return $this->hasMany(CustomerDeliveryNote::class);
    }

    /**
     * Get all of the CustomerInvoices for the Trading
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function CustomerInvoices()
    {
        return $this->hasMany(CustomerInvoice::class);
    }

    public function User()
    {
        return $this->belongsTo(User::class);
    }
}
