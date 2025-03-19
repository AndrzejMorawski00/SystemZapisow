# SystemZapisów
* This repository contains merged code of backend and frontend apps. The code is based on the original versions of these applications with slight improvements and the addition of Docker setup.

* Backend Repository <a href="https://github.com/AndrzejMorawski00/SystemZapisowAPI">(Link)</a>
* Frontend Repository <a href="https://github.com/AndrzejMorawski00/SystemZapisowFrontend">(Link)</a>

## SystemZapisow API 
* The application retrieves and manages data from the university enrollment system. It acts as an API for the SystemZapisow frontend application, where users can plan their degree course. It allows data modification and stores information about courses and plans created by users.

### Features
* **Data fetching** &rarr; system fetches and processes data from the enrollment system using Beautiful Soup.
* **Authentication** &rarr; app provides an API for JWT Token authentication.
* **Fetching data panel** &rarr; app provides a panel where admin users can fetch and modify data from enrollment system without accessing build-in Django admin panel.
* **Enrollment API** &rarr; an open API endpoints that allows anyone to fetch courses' data.
* **Planner API** &rarr; a separate API endpoints which are responsible for managing user data, such as course planning, used by my frontend application.

### Technoligies
* Python 
* Django
* DRF (Django Rest Framework)
* BS4 (BeautifulSoup4)
* Azure Deployment (Original version)
* Docker & Docker Compose
* JWT Authentication

## SystemZapisow Frontend
* It is a frontend application that helps Computer Science students at the University of Wrocław plan their course of study. It fetches data from the SystemZapisowAPI, allowing the creation of alternative schedules by assigning courses to specific semesters, which helps better organise the study program.

### Features
* **Data fetching and synchronisation** &rarr; fetches and sends data to my backend app.
* **Authentication** &rarr; app supports secure login using JWT Tokens.
* **Creating Plans** &rarr; users can create new study plan for their engineer's and bachelor's degrees.
* **Course Management** &rarr; users can add or remove courses from their studies plans.
* **Tracking Progress** &rarr; students can measure their progress and find out what courses they are obliged to pass to accomplish studies.
* **Drag and Drop** &rarr; offers a straightforward way to assign courses to semesters.
* **Infinite Scroll** &rarr; provides an efficient method of searching and selecting courses available at the university.
* **Search filters** &rarr; narrow down the available courses, making it easier and faster to find specific ones.

### Technologies
* TS (TypeScript)
* React
* Radix UI
* React Router
* TanStack Query
* JWT Authentication
* Pragmatic Drag-and-Drop
* Tailwind CSS
* Azure Deployment (Original version)
* Docker & Docker Compose

## Prerequisites
* Before setting up the application, make sure you have **Docker** and **Docker Compose** installed on your machine.
 
<!-- ## Setup Instructions
1. Clone GitHub Repository:
    ```
    git clone git@github.com:AndrzejMorawski00/SystemZapisow.git
    ```
2. Setup ``.env`` files:
    * For both **backend** and **frontend** apps, create your own ``.env`` files next to existing ``.env.template`` files, or copy the content of the templates into the ``.env`` files.
3. Run backend app:
    ```
    docker-compose -f .\backend\docker-compose.yml up -d
    ```
4. Create a superuser for the backend app and follow instructions:
    ```
    docker exec -it systemzapisow-backend python manage.py createsuperuser
    ```
5. Run frontend app:
    ```
    docker-compose -f .\frontend\docker-compose.yml up -d
    ```
## Access apps:
* To access backend app navigate to: http://localhost:8000 and login as a superuser to access panel.
* To access frontend app navigate to: http://localhost -->

## Setup Instructions
1. Clone GitHub Repository:
    ```
    git clone git@github.com:AndrzejMorawski00/SystemZapisow.git
    ```
2. Setup ``.env`` file:
    * Create your own ``.env`` file next to existing ``.env.template`` file, or copy the content of the template into the ``.env`` file.
3. Run app:
    ```
    docker-compose -f .\docker-compose.yml up -d
    ```
4. Create a superuser for the backend app and follow instructions:
    ```
    docker exec -it systemzapisow-backend python manage.py createsuperuser
    ```

## Access apps:
* To access backend app navigate to: http://localhost:8000 and login as a superuser to access panel.
* To access frontend app navigate to: http://localhost