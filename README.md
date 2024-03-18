# CSC2102_PSD2_Project

## Steps to run the project
1. Navigate to lateats folder
2. Run **npm install** to install React dependencies
3. Run **npm run dev** to start up the server for the frontend

4. Navigate to the backend folder
5. Run **docker-compose up -d** to run the docker containers

## Clean up after developement
use **docker-compose down** to stop the containers

## Rebuild server.js when needed
use **docker-compose up -d --build node_server** to run up the containers while rebuilding the server image
