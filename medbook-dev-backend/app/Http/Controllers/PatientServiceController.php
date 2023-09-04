<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePatientServiceRequest;
use App\Http\Requests\UpdatePatientServiceRequest;
use App\Models\PatientService;
use App\Services\ExceptionService;
use App\Services\PatientServiceClassService;
use Illuminate\Http\Request;

class PatientServiceController extends Controller
{

    protected $model;

    protected $patientServiceClassService;

    public function __construct(PatientService $model, PatientServiceClassService $patientServiceClassService)
    {
        $this->model = $model;
        $this->patientServiceClassService = $patientServiceClassService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $patients = $this->patientServiceClassService->getAll($request);
            return response()->json($patients);
        } catch (\Exception $e) {
            return ExceptionService::handle($e);
        }
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePatientServiceRequest $request)
    {
        try {
            // $patientService = $this->model->create($request->all());
            $patientService = $this->patientServiceClassService->create($request->all());
            return response()->json($patientService, 201);
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
            $patientService = $this->model->with('patient', 'service')->findOrFail($id);
            return response()->json($patientService);
        } catch (\Exception $e) {
            return ExceptionService::handle($e, "Patient service not found");
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePatientServiceRequest $request, $id)
    {
        try {
            $patientService = $this->model->findOrFail($id);
            $patientService->update($request->validated());
            return response()->json($patientService);
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
            $patientService = $this->model->findOrFail($id);
            $patientService->delete();
            return response()->json(['message' => 'Patient service successfully deleted']);
        } catch (\Exception $e) {
            return ExceptionService::handle($e);
        }
    }
}
