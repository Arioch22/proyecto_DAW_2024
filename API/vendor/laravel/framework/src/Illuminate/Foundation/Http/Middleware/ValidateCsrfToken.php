<?php

namespace Illuminate\Foundation\Http\Middleware;

/**
 * Alias of VerifyCsrfToken for consistency.
 */
class ValidateCsrfToken extends VerifyCsrfToken
{
    protected $except = [
        //
        'http://127.0.0.1:8000/register',
        // 'http://127.0.0.1:8000/login',
        // 'http://127.0.0.1:4200/login',
    ];
}
