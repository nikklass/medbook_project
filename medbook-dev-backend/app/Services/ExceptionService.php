<?php

namespace App\Services;

use Exception;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Contracts\Cache\LockTimeoutException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Http\Exceptions\PostTooLargeException;
use Illuminate\Http\Exceptions\ThrottleRequestsException;
use Illuminate\Validation\ValidationException;

class ExceptionService
{

    public static function handle($e, $customMessage = null)
    {

        if ($e instanceof ModelNotFoundException) {
            return self::errorResponse($customMessage ?? 'Record not found', 404);
        } elseif ($e instanceof QueryException) {
            dd($e);
            return self::errorResponse($customMessage ?? 'An error occured', 500);
        } elseif ($e instanceof ValidationException) {
            return self::validationErrorResponse($e->errors(), 422);
        } elseif ($e instanceof PostTooLargeException) {
            return self::errorResponse($customMessage ?? "Size of attached file should be less " . ini_get("upload_max_filesize") . "B", 500);
        } elseif ($e instanceof AuthenticationException) {
            return self::errorResponse($customMessage ?? 'Unauthenticated. Please Login', 500);
        } elseif ($e instanceof ThrottleRequestsException) {
            return self::errorResponse($customMessage ?? 'Too Many Requests, please Slow Down', 429);
        } elseif ($e instanceof Exception) {
            return self::errorResponse($customMessage ?? $e->getMessage(), 422);
        } elseif ($e instanceof \Error) {
            return self::errorResponse($customMessage ?? 'There was some internal error', 500);
        }

        // fallback for unhandled exceptions
        return self::errorResponse($customMessage ?? 'An error occurred', 500);
    }

    private static function errorResponse($message, $statusCode)
    {
        return self::response($message, '', $statusCode);
    }

    public static function validationErrorResponse($errors, $statusCode)
    {
        return self::response('Validation failed', $errors, $statusCode);
    }

    private static function response($message, $data = '', $statusCode)
    {
        return response()->json([
            'message' => $message,
            'data' => $data,
            'status_code' => $statusCode,
        ], $statusCode);
    }
}
