<?php

namespace App\Services;

use App\Models\Service;

class ServiceClassService
{

    protected $model;

    public function __construct(Service $model)
    {
        $this->model = $model;
    }

    public function getAll($request)
    {

        $data = $this->model;

        $searchTerms = $request->has('searchTerms') ? $request->searchTerms : "";

        if ($searchTerms) {
            // split the search terms using space as delimiter
            $splitSearchTermsArray = getSplitTerms($searchTerms);

            $data = $data->orWhere(function ($q) use ($searchTerms, $splitSearchTermsArray) {
                $q->where('name', "LIKE", '%' . $searchTerms . '%');

                // proceed only if search_tems contain more than one word
                if (count($splitSearchTermsArray) > 1) {
                    foreach ($splitSearchTermsArray as $value) {
                        $q->orWhere('name', 'LIKE', "%{$value}%");
                    }
                }
            });
        }

        $order_style = $request->has('order_style') ? $request->order_style : "";
        $order_by = $request->has('order_by') ? $request->order_by : "";
        $report = $request->has('report') ? $request->report : "";

        // order style - either 'desc' or 'asc', default is 'asc'
        if (!$order_style) {
            $order_style = "asc";
        }
        if (!$order_by) {
            $order_by = "name";
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
        $name = $data['name'];

        $existingPatient = $this->model->where('name', $name)->first();

        if ($existingPatient) {
            throw new \Exception('Service already exists.', 422);
        }

        return $this->model->create($data);
    }
}
