# SystemZapisów

* This repository contains merged code of backend and frontend apps. The code is based on the original vsrsions of these applications, with slight modifications for improvements and addition of a Docker setup.

* Backend Repository <a href="https://github.com/AndrzejMorawski00/SystemZapisowAPI">(Link)</a>
* Frontend Repository <a href="https://github.com/AndrzejMorawski00/SystemZapisowAPI">(Link)</a>

## SystemZapisowAPI 

* The application retrieves and manages data from the university enrollment system. It acts as an API for the SystemZapisow frontend application, where users can plan their degree course. It allows data modification and stores information about courses and plans created by users.

### Features

* **Data fetching** &rarr; system fetches and processes data from the enrollment system using BeautifulSoup.
* **Authentication** &rarr; app provides an API for JWT Token auth.
* **Fetching data panel** &rarr; app provides a panel where admin users can fetch and modify data from enrollment system without accessing build-in Django admin panel.
* **Enrollment API** &rarr; an open API endpoints that allows anyone to fetch information about courses.
* **Planner API** &rarr; a separate API endpoints which are responsible for managing user data, such as course planning to be used by frontend application.

### Technoligies

* Python 
* Django
* DRF
* BS4
* Azure Deployment (Original version)
* Docker & Docker Compose
* JWT Authentication

## SystemZapisowFrontend
* It is a frontend application that helps Computer Science students at the University of Wrocław plan their course of study. It fetches data from the SystemZapisowAPI, allowing the creation of alternative schedules by assigning courses to specific semesters, which helps better organise the study program.

### Features

* **Data fetching and synchronization** &rarr; fetches and sends data to my backend app.
* **Authentication** &rarr; app supports secure login using JWT Tokens.
* **Creating Plans** &rarr; users can create new study plan for their engineering and bachelor's degrees.
* **Course Management** &rarr; users can add or remove courses from their studies plans.
* **Tracking Progress** &rarr; students can measure their progress and also find out what courses they have to take to finish studies,
* **Drag and Drop** &rarr; offers an intuitive way to assign courses to semesters.
* **Infinite Query** &rarr; provides an efficient method for selecting and searching courses available at the university.
* **Search filters** &rarr; narrow down the available courses, making it easier and faster to find specific ones.

### Technologies
* Type Script (TS)
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
* Before setting up the application, ensure you have **Docker** and **Docker Compose** installed on your machine.
 
## Setup Instructions
1. Clone GitHub Repository:
    ```
    git clone git@github.com:AndrzejMorawski00/SystemZapisow.git
    ```
2. Setup ``.env`` files:
    * For both the **backend** and **frontend**, create your own ``.env`` files next to the ``.env.template`` file. Then copy the contents of the templates into the ``.env`` files.
3. Run backend app:
    ```
    docker-compose -f .\backend\docker-compose.yml up -d
    ```
4. Create a superuser for the backend panel and follow instructions:
    ```
    docker exec -it systemzapisow-backend python manage.py createsuperuser
    ```
5. Run frontend app:
    ```
    docker-compose -f .\frontend\docker-compose.yml up -d
    ```
6. Access apps:
    * To access backend app navigate to: http://localhost:8000
    * To access frontend app navigate to: http://localhost