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

# Настройка базы данных

Для создания базы данных нужно ввести следующие команды

`sudo su - postgres` заходим за root пользователя

`psql` открываем postgresql консоль

`CREATE DATABASE myproject;` создаем базу данных

`CREATE USER myprojectuser WITH PASSWORD 'password';` создаем пользователя

`GRANT ALL PRIVILEGES ON DATABASE myproject TO myprojectuser;` даем все разрешения новому пользователю к созданной базе

# Связь приложения и базы

Создайте файл ".env" в папке "./backend", в нем будут определены все переменные которые нужны для связи базы данных и Django приложения

В файле укажите данные созданной ранее базы и пользователя посмотрев пример в файле "backend/.env.local.sample"
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
