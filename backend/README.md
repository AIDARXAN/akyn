# Backend

This is api and telegram bot for "Human Resource Management(HRM)" application

Versions:
```angular2html
python-3.7.4
mysql  Ver 14.14 Distrib 5.7.29, for Linux (x86_64) using  EditLine wrapper
```

# Installation instructions

## Ubuntu and Ubuntu-based

### Project Installation

 Clone the repository:
  ```bash 
  $ git clone "repository:url"
  ```
 Change Directory Enter the project.Create virtualenv and activate virtualenv
```
$ cd dir_name
$ python3 -m venv myvenv
$ source myvenv/bin/activate
```

# Running dev server
Install prerequisites if using MySQL:
```
sudo apt-get install python3-dev default-libmysqlclient-dev
```

In activated virtualenv install requirements:
```
pip install -r requirements.txt
```

Create new database in mysql and provide its credentials as environment variables
```angular2html
> CREATE DATABASE DATABASE_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
Create .env file in the project root directory similar to env_test.txt 
but fill your own data configurations which you created on your local machine
```
MYSQL_ROOT_PASSWORD
MYSQL_DATABASE
MYSQL_USER
MYSQL_PASSWORD
MYSQL_HOST
MYSQL_PORT
```

Generate secret key using online password generators and put it in the .env file
```
SECRET_KEY=your_generated_secret_key_goes_there
```

Then run migrations:
```
./manage.py migrate
```


Create super user:
```angular2html
./manage.py createsuperuser
```

Run the backend dev server:
```
./manage.py runserver
```


# Running tests

```
./manage.py test
```

Run the user fixtures

```
./manage.py user_fixtures
```
