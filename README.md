### News App

    This is a React application that has been containerized using Docker.
    To build and run the application, follow these steps:

### Prerequisites
    Ensure you have Docker installed on your machine.

### Build the Docker Image
--  Run the following command in your terminal to build the Docker image:
    docker build -t my-react-app .

### Run the Docker Container
--  Once the image is built, run the container with this command:
    docker run -p 3000:80 my-react-app

### Access the Application
--  Open your browser and go to http://localhost:3000 to access the application.

### Handling CORS Issues
--  If you encounter any CORS issues while using the application, please 
    install the CORS Unblock extension in your browser to bypass these restrictions.