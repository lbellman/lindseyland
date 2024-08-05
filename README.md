
# Getting Started

Welcome to Lindseyland! Follow the instructions below to run the application on your local machine.

## Backend Server Setup

### Create a Python Environment
Once you have cloned the repo, you will need to setup a Python Virtual Environment that runs Python 3.10 or later. Make sure you do this **before** you install `requirements.txt`.

If you are on VSCode, type `Command-Shift-P` and select `Select Python Interpreter`, then follow the steps to create a new environment.

Otherwise, create a Python Virtual Environment in the root directory of this repo.

Note: Make sure you add your venv folder to your `.gitignore` file, otherwise you will end up with thousands of source control changes.


### Install Dependencies
With your virtual environment activated, run the following commands in your terminal.
```
cd backend 
pip install requirements.txt
```


### PostgreSQL Database Creation
This project is using Django with a PostgreSQL database and psycopg adapter. You will need to create your own PostgreSQL database to run this project. 

Go to [PostgresQL.org](https://www.postgresql.org/) and download postgres on your machine (recommended to use EDB option and download the .dmg file that corresponds to your OS, this way you can walk through the installation step-by-step).

Next, connect to your postgres database by running the following command in your terminal and entering the password you created during installation. 
```bash
psql -U postgres
```
You should see something like this in your terminal.
```
psql (14.4, server 16.3)
Type "help" for help.

postgres=#
```

Now we can write SQL commands to interact with our database. First, create an owner for your database.
```
CREATE ROLE <username> LOGIN PASSWORD <password>;
```

Next, create a database with the owner being the user that you created above.
```
CREATE DATABASE <db_name> WITH OWNER = <username>;
```

Make a note of the port that your database is running on, you will need it for the next step.
```
SHOW port;
```

Exit the program by typing `\q`, and then run the following command in your terminal to check that your user and database have been created correctly.
```bash
psql -h localhost -d <db_name> -U <username> -p <port>
```

If it succeeded, you should see this in your terminal 
```
psql (14.4, server 16.3)
Type "help" for help.

<db_name>=>
```


### Configure Django Database Settings
Now that you have created your PostGreSQL database, you will need to tell Django how to access it. 

Create a file in the root directory called `.env` (add this file to your `.gitignore`, this is a crucial step to ensure that you don't accidentally commit sensitive information to a public repo). 

In your `.env` file, add the following code:
```
  DB_NAME="<your_db_name>"
  USERNAME="<your_db_username>"
  PASSWORD="<your_db_password>"
```

If you want to see how this gets used, go to `settings.py` and you will see the following code. This is how your database credentials are configured with Django.
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

### Migrate

Now you have configured your database and told Django how to access it, you will need to migrate. This will create all the necessary tables in your local database. (Make sure you are in the `backend` directory before you run this command.)
```
python manage.py migrate
```

### Run the Backend Server

To run the backend server, enter the following command in your terminal. Make sure you are in the `backend` folder, and that your virtual environment is activated. 

```
python manage.py runserver
```

Your backend server is now up and running, open a separate terminal to complete the frontend setup, and you are almost done!


## Frontend Setup

If you are still in the backend directory, go back to the root directory.

```
cd ..
```

Install dependencies 

```bash
npm i
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result, happy exploring!

