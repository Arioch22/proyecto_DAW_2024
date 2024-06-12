<?php

namespace App\Observers;

use App\Models\Customer;
use App\Models\CustomerDeliveryNote;
use App\Models\CustomerInvoice;
use App\Models\CustomerOrder;
use Illuminate\Support\Facades\DB;

class CustomerObserver
{
    /**
     * Handle the Customer "created" event.
     */
    public function created(Customer $customer): void
    {
        //
    }

    /**
     * Handle the Customer "updated" event.
     */
    public function updated(Customer $customer): void
    {
        //
    }

    /**
     * Handle the Customer "deleted" event.
     */
    public function deleted(Customer $customer): void
    {

                CustomerOrder::where('customer_id', $customer->id)->update(['customer_id' => 1]);

                CustomerInvoice::where('customer_id', $customer->id)->update(['customer_id' => 1]);

                CustomerDeliveryNote::where('customer_id', $customer->id)->update(['customer_id' => 1]);

    }

    public function deleting(Customer $customer)
    {

        CustomerOrder::where('customer_id', $customer->id)->update(['customer_id' => 1]);
        CustomerInvoice::where('customer_id', $customer->id)->update(['customer_id' => 1]);
        CustomerDeliveryNote::where('customer_id', $customer->id)->update(['customer_id' => 1]);
    }

    /**
     * Handle the Customer "restored" event.
     */
    public function restored(Customer $customer): void
    {
        //
    }

    /**
     * Handle the Customer "force deleted" event.
     */
    public function forceDeleted(Customer $customer): void
    {
        //
    }
}
