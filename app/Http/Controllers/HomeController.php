<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    //
    public function show()
    {
        return Auth::check()
            ? redirect('/dashboard') // Se estiver autenticado, redireciona para o painel
            : redirect()->route('login'); // Se não, redireciona para o login
    }
}
