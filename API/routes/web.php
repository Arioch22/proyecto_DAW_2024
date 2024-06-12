<?php

use App\Http\Controllers\AuthController;
use App\Models\Customer;
use App\Models\IVA;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Rol;
use App\Models\Status;

Route::get('/', function () {
    return view('welcome');
});


Route::get('/setup', function(){

    $credentials=[
        'name'=>'Admin',
        'rol_id'=>1,
        'email'=>"admin@admin.com",
        'password'=>'password'
    ];

    if(!Auth::attempt($credentials)){

        $rol = new Rol();
        $rol->name = "Admin";
        $rol->description = "Admin";
        $rol->save();

        $rol = new Rol();
        $rol->name = "Almacen";
        $rol->description = "warehouse";
        $rol->save();

        $rol = new Rol();
        $rol->name = "Agente";
        $rol->description = "Trading";
        $rol->save();

        $customer = new Customer();
        $customer->name = "Cliente Borrado";
        $customer->type = "deleted";
        $customer->cifnif = "Borrado";
        $customer->address = "Borrado";
        $customer->city = "Borrado";
        $customer->state = "Borrado";
        $customer->postal_code = "Borrado";
        $customer->phone = "Borrado";
        $customer->email = "Borrado";
        $customer->save();

        $iva21 = new IVA();
        $iva21->name = "21%";
        $iva21->percentage = 21;
        $iva21->save();

        $iva10 = new IVA();
        $iva10->name = "10%";
        $iva10->percentage = 10;
        $iva10->save();

        $iva4 = new IVA();
        $iva4->name = "4%";
        $iva4->percentage = 4;
        $iva4->save();

        $iva0 = new IVA();
        $iva0->name = "0%";
        $iva0->percentage = 0;
        $iva0->save();

        $user = new User();
        $user->name = "Admin";
        $user->rol_id = 1;
        $user->email = $credentials['email'];
        $user->password = Hash::make($credentials['password']);
        $user->save();

        $status1 = new Status();
        $status1->name = "Emitida";
        $status1->description = "Documento creado";
        $status1->save();

        $status2 = new Status();
        $status2->name = "Enviada/Recibida";
        $status2->description = "Documento enviado/recibido";
        $status2->save();

        $status3 = new Status();
        $status3->name = "Pagada";
        $status3->description = "Documento pagado";
        $status3->save();
    }

    if (Auth::attempt($credentials)) {
        $user = Auth::user();

        $user = User::where('email', $credentials['email'])->first();

    }

    });
