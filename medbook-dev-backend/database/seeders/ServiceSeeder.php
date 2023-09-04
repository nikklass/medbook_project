<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $services = [
            ['name' => 'Routine check-ups'],
            ['name' => 'Vaccinations'],
            ['name' => 'Pediatrics'],
            ['name' => 'Reproductive health services'],
            ['name' => 'Health screening'],
        ];

        Service::insert($services);

    }
}
