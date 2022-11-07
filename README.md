# demo-twitter-app

To run this application you must have docker installed on your computer.

After clone the repository, run the following command inside the project folder:

```
docker compose up
```

To access the web application, navigate to http://localhost:3008.

The API is also accessible, in the address http://localhost:3007.

Database (Mysql) will start at port 3306.

To run the tests execute the following command:

```
docker exec twitter-app-backend php artisan test
```
