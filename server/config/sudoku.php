<?php

use Illuminate\Support\Str;

return [
    'admin_id' => env('ADMIN_ID', Str::uuid()->toString()),
];
