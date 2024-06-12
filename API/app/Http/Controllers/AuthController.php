<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\ObtainedRolIdUser;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\RegisterRequestTrading;
use App\Models\Trading;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Response;

class AuthController extends Controller
{
    // public function register (Request $request){

    //     $data = $request->validate([
    //         'name' => ['required', 'string'],
    //         'email' => ['required', 'email', 'unique:users'],
    //         'rol_id' => ['required', 'integer'],
    //         'password' => ['required', 'min:6'],
    //     ]);

    //     $user = User::create($data);


    //     $token = $user->createToken('auth_token')->plainTextToken;

    //     return [
    //         'token' => $token,
    //         'token_type' => 'Bearer',
    //     ];
    // }

    // public function login (Request $request){
    //     $data = $request->validate([
    //         'email' => ['required', 'email', 'exists:users'],
    //         'password' => ['required', 'min:6'],
    //     ]);

    //     $user = User::where('email', $data['email'])->first();

    //     if(!$user || !Hash::check($data['password'], $user->password)){
    //         return response([
    //             'message' => 'Bad credentials'
    //         ], 401);
    //     }

    //     $token = $user->createToken('auth_token')->plainTextToken;

    //     return [
    //         'token' => $token,
    //         'token_type' => 'Bearer',
    //     ];
    // }

    // public function out (Request $request){

    //     $credentials=[
    //         'email'=>$request->email,
    //         'password'=>$request->password
    //     ];


    //     $user = User::where('email', $credentials['email'])->first();
    //     $user->tokens()->delete();
    //     return 'Logged out';
    // }

    public function login (LoginRequest $request): JsonResponse{

        if( !Auth::attempt($request->validated()) ){
            return response()->json([
                'errors' => 'Credenciales incorrectas.'
            ], Response::HTTP_UNAUTHORIZED);
        }

        $user = $request->user();

        $userToken = $user->createToken('AppToken')->plainTextToken;

        return response()->json([
            'message' => 'Se ha iniciado sesión correctamente.',
            'token' => $userToken,
            'user' => $user
        ], Response::HTTP_OK);
    }

    public function register(RegisterRequest $request): JsonResponse{

        $user = User::create($request->validated());

        return response()->json([
            'message' => 'Usuario creado correctamente.',
            'user' => $user
        ], Response::HTTP_CREATED);
    }

    public function searchUserForId(ObtainedRolIdUser $request): JsonResponse{

        $users = User::where('id', $request->id)->get();

        return response()->json([
            'users' => $users
        ], Response::HTTP_OK);

    }

    public function logout(Request $request): JsonResponse{

        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Se ha cerrado sesión correctamente.'
        ], Response::HTTP_OK);
    }


}
