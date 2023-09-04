<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreServiceRequest;
use App\Http\Requests\UpdateServiceRequest;
use App\Models\Service;
use App\Services\ExceptionService;
use App\Services\ServiceClassService;
use Illuminate\Http\Request;

class ServiceController extends Controller
{

    protected $model;

    protected $serviceClassService;

    public function __construct(Service $model, ServiceClassService $serviceClassService)
    {
        $this->model = $model;
        $this->serviceClassService = $serviceClassService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $services = $this->serviceClassService->getAll($request);
            return response()->json($services);
        } catch (\Exception $e) {
            return ExceptionService::handle($e);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreServiceRequest $request)
    {
        try {
            $service = $this->model->create($request->validated());
            return response()->json($service, 201);
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
            $service = $this->model->with('patients')->findOrFail($id);
            return response()->json($service);
        } catch (\Exception $e) {
            return ExceptionService::handle($e, "Service not found");
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateServiceRequest $request, $id)
    {
        try {
            $service = $this->model->findOrFail($id);
            $service->update($request->validated());
            return response()->json($service);
        } catch (\Exception $e) {
            return ExceptionService::handle($e);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $service = $this->model->findOrFail($id);
            $service->delete();
            return response()->json(['message' => 'Service successfully deleted']);
        } catch (\Exception $e) {
            return ExceptionService::handle($e);
        }
    }
}
