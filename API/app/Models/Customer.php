<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Observers\CustomerObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;

#[ObservedBy([CustomerObserver::class])]
class Customer extends Model
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
     * Get all of the comments for the Customer
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function CustomerOrders()
    {
        return $this->hasMany(CustomerOrder::class);
    }

    /**
     * Get all of the comments for the Customer
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function CustomerDeliveryNotes()
    {
        return $this->hasMany(CustomerDeliveryNote::class);
    }

    /**
     * Get all of the comments for the Customer
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function CustomerInvoices()
    {
        return $this->hasMany(CustomerInvoice::class);

    }
}
