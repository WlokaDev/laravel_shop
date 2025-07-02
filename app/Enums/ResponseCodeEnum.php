<?php

namespace App\Enums;

enum ResponseCodeEnum: int
{
    case OK = 200;
    case BAD_REQUEST = 400;
    case UNAUTHORIZED = 401;
    case FORBIDDEN = 403;
}
