<?php

namespace App\Services;

use App\Models\Patient;
use App\Models\PatientService;
use Illuminate\Support\Facades\DB;

class PatientServiceClassService
{

    protected $model;

    public function __construct(PatientService $model)
    {
        $this->model = $model;
    }

    public function getAll($request)
    {

        $data = $this->model;

        $searchTerms = $request->has('searchTerms') ? $request->searchTerms : "";

        if ($searchTerms) {

            // split the search terms using space as delimiter
            $split_search_terms_array = getSplitTerms($searchTerms);

            $data = $data->where(function ($query) use ($split_search_terms_array) {
                // join with 'tbl_patient' table and search 'name'
                $query->orWhereHas('patient', function ($subquery) use ($split_search_terms_array) {
                    $subquery->where(function ($q) use ($split_search_terms_array) {
                        foreach ($split_search_terms_array as $term) {
                            $q->orWhere('name', 'like', "%$term%");
                        }
                    });
                });

                // join with 'services' table and search 'name'
                $query->orWhereHas('service', function ($subquery) use ($split_search_terms_array) {
                    $subquery->where(function ($q) use ($split_search_terms_array) {
                        foreach ($split_search_terms_array as $term) {
                            $q->orWhere('name', 'like', "%$term%");
                        }
                    });
                });

                $query->orWhere(function ($q) use ($split_search_terms_array) {
                    foreach ($split_search_terms_array as $term) {
                        $q->orWhere('general_comments', 'like', "%$term%");
                    }
                });
            });
        }

        $data = $data->with('patient')
            ->with('gender')
            ->with('service');

        $order_style = $request->has('order_style') ? $request->order_style : "";
        $order_by = $request->has('order_by') ? $request->order_by : "";
        $report = $request->has('report') ? $request->report : "";

        // order style - either 'desc' or 'asc', default is 'asc'
        if (!$order_style) {
            $order_style = "desc";
        }
        if (!$order_by) {
            $order_by = "created_at";
        }

        // arrange by column
        $data = $data->orderBy($order_by, $order_style);

        // if not in report mode, paginate the data
        if (!$report) {

            $limit = $request->get('limit', config('app.pagination_limit'));
            $data  = $data->paginate($limit);
        } else {

            // else return all data
            $data = $data->get();
        }

        return $data;
    }

    public function create($data)
    {

        DB::beginTransaction();

        // check if patient with name and dob exists
        // if so retrieve patient_id
        $patient = Patient::where('name', $data['name'])
            ->where('date_of_birth', $data['date_of_birth'])
            ->first();

        $patient_id = null;
        if ($patient) {
            $patient_id = $patient->id;
        } else {
            // create a new patient and return back patient_id
            $newPatient = Patient::create($data);
            $patient_id = $newPatient->id;
        }

        if ($patient_id) {
            $data['patient_id'] = $patient_id;

            $result = $this->model->create($data);
        } else {
            DB::rollBack();
            throw new \Exception("An error occured while creating new patient service");
        }
        DB::commit();

        return $result;
    }
}
