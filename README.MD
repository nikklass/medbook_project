# Clinic App Using Ionic and Laravel

Project Description 

This project consists of an Ionic Angular frontend application and a Laravel backend API. Follow the instructions below to set up and run the project locally.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm: [Download and install Node.js](https://nodejs.org/)
- Ionic CLI: Install with `npm install -g @ionic/cli`
- Laravel: [Installation guide](https://laravel.com/docs/installation)
- Database server (e.g., MySQL, PostgreSQL)
- PHP Version 8.1 and above

## Installation

Follow these steps to set up and run the project:

1. Clone the repository:

   ```bash
   git clone https://github.com/nikklass/medbook_project.git


2. Frontend Setup

cd medbook-dev-frontend

a. Install dependencies:

   ```bash
   npm install

b. Start the Ionic development server:

   ```bash
   ionic serve

The app will be accessible at http://localhost:8100 in your browser.


3. Backend Setup

cd medbook-dev-backend

a. Install dependencies:

   ```npm install

b. Start the Ionic development server:

   ```ionic serve
   
The app will be accessible at http://localhost:8100 in your browser.



a. Install Laravel dependencies:

   ```composer install

b. Rename tthe file in the backend root directory named #.env.example to #.env and configure your database settings. Change the following lines adding your database configurations:

DB_HOST=127.0.0.1 - Your database host
DB_PORT=3306 - database port
DB_DATABASE= - database name
DB_USERNAME= - database username
DB_PASSWORD= - database password

c. Run database migrations:

   ```php artisan migrate

d. Seed sample database data:

   ```php artisan db:seed

e. Start the Laravel development server:

   ```php artisan serve --port=8000

The API will be accessible at http://localhost:8000.

Open the Ionic app in your browser and start using it.

## Usage

1. Access the Ionic app in your web browser by visiting http://localhost:8100.

2. Use the app as intended.

3. Configure any required settings or user accounts.

4. Interact with the Laravel API at http://localhost:8000 for data retrieval and storage.


## Acknowledgments

- [Ionic Framework](https://ionicframework.com/)
- [Laravel](https://laravel.com/)
