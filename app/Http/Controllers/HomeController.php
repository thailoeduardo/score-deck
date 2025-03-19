<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    /**
     * Redirect user to login page and dashboard
     *
     * @return void
     */
    public function show()
    {
        return Auth::check()
            ? redirect('/dashboard') // If authenticated, redirect to the dashboard
            : redirect()->route('login'); // If not, redirect to login
    }
}
