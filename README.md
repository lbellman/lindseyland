
# Getting Started

Welcome to Lindseyland! This is a client/server application, so in order to run it successfully on your machine, you will need to follow the instructions to setup the backend server locally.

## Backend Server Setup

### Create a Python Environment
Once you have cloned the repo, you will need to setup a Python Virtual Environment that runs Python3.10 or later. Make sure you do this **before** you install `requirements.txt`.

If you are on VSCode, type `Command-Shift-P` and select `Select Python Interpreter`, then follow the steps to create a new environment.

Otherwise, create a Python Virtual Environment in the root directory of this repo.

**Make sure you add your venv folder to your `.gitignore` file, otherwise you will end up with thousands of source control changes.**


### Install Dependencies
With your virtual environment activated, run the following commands in your terminal.
```
cd backend 
pip install requirements.txt
```


### PostgresQL Database Creation
This project is using Django with a PostgresQL database and psycopg3 adapter. You will need to create your own PostgresQL database to run this project. 

Go to [PostgresQL.org](https://www.postgresql.org/) and install postgres on your machine (recommended to use EDB and download the .dmg file that corresponds to your OS, this way you can walk step-by-step through the installation).

Connect to your database by running the following command in your terminal and entering the password you created during installation. 
`psql -U postgres`

Create an owner for your database.
`CREATE ROLE <username> LOGIN PASSWORD <password>;`

Next, create a database with the owner being the user that you created above.
`CREATE DATABASE <db_name> WITH OWNER <username>;`

Make a note of the port that your database is running on, you will need it for the next step.
`SHOW port;`

Exit the program by typing `\q`, and then run the following command in your terminal to check that your user and database have been created correctly.
`psql -h localhost -d <db_name> -U <username> -p <port>`

If it succeeded, you should see this in your terminal 
`<db_name>=>`


### Configure Django Database Settings
Now that you have created your PostGresQL database, you will need to tell Django how to access it. 

Create a file in your root directory called `.env` (add this file to your `.gitignore`, this is a crucial step to ensure that you don't accidentally commit sensitive information to a public repo). 

In your `.env` file, add the following code:
```
  DB_NAME="<your_db_name>"
  USERNAME="<your_db_username>"
  PASSWORD="<your_db_password>"
```

If you want to see how this gets used, go to `settings.py` and you will see the following code:
```
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.getenv("DB_NAME"),
        "USER": os.getenv("USERNAME"),
        "PASSWORD": os.getenv("PASSWORD"),
        "HOST": "127.0.0.1",
        "PORT": "5432",
    }
}
```
Make sure that the port number corresponds to the port that your database is running on.

### Populate the Database

Now you have configured your database and told Django how to access it, you will need to migrate. This will create tables in your local database.
`python manage.py migrate`

### Run the Backend Server

`python manage.py runserver`


## Frontend Setup

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

