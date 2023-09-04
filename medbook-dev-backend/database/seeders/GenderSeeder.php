<?php

namespace Database\Seeders;

use App\Models\Gender;
use Illuminate\Database\Seeder;

class GenderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $genders = [
            ['id' => 1, 'name' => 'Male'],
            ['id' => 2, 'name' => 'Female'],
            ['id' => 3, 'name' => 'Other'],
        ];

        Gender::insert($genders);

    }
}
