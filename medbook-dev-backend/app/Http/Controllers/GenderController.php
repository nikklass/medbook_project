<?php

namespace App\Http\Controllers;

use App\Models\Gender;
use App\Services\ExceptionService;
use Illuminate\Http\Request;

class GenderController extends Controller
{

    protected $model;

    public function __construct(Gender $model)
    {
        $this->model = $model;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $services = $this->model->get();
            return response()->json($services);
        } catch (\Exception $e) {
            return ExceptionService::handle($e);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $service = $this->model->findOrFail($id);
            return response()->json($service);
        } catch (\Exception $e) {
            return ExceptionService::handle($e, "Gender not found");
        }
    }
}
