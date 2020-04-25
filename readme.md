Video Converter
===============

Installation
---------------

In the terminal choose the directory, then put code below to clone the project
    
    git clone https://github.com/AIDARXAN/akyn




To install all requirements which is needed to run project copy code bellow
    
    pip install virtualenv
    virtualenv venv -p python3
    source venv/bin/activate
    pip install -r requirements.txt

    python3 manage.py migrate

Run server  

    python3 manage.py runserver
    
Create admin

    ./manage.py createsuperuser 
    

