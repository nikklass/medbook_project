<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePatientRequest;
use App\Http\Requests\UpdatePatientRequest;
use App\Models\Patient;
use App\Services\ExceptionService;
use App\Services\PatientClassService;
use Illuminate\Http\Request;

class PatientController extends Controller
{

    protected $model;

    protected $patientClassService;

    public function __construct(Patient $model, PatientClassService $patientClassService)
    {
        $this->model = $model;
        $this->patientClassService = $patientClassService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $patients = $this->patientClassService->getAll($request);
            return response()->json($patients);
        } catch (\Exception $e) {
            return ExceptionService::handle($e);
        }
    }

    /**
     * Store a newly created resource in storage.
     * StorePatientRequest $request
     */
    public function store(StorePatientRequest $request)
    {
        try {
            $patient = $this->patientClassService->create($request->all());
            return response()->json($patient, 201);
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
            $patient = $this->model->with('gender', 'services')->findOrFail($id);
            return response()->json($patient);
        } catch (\Exception $e) {
            return ExceptionService::handle($e, "Patient not found");
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePatientRequest $request, $id)
    {
        try {
            $patient = $this->model->findOrFail($id);
            $patient->update($request->validated());
            return response()->json($patient);
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
            $patient = $this->model->findOrFail($id);
            $patient->delete();
            return response()->json(['message' => 'Patient successfully deleted']);
        } catch (\Exception $e) {
            return ExceptionService::handle($e);
        }
    }
}
