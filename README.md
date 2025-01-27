Frontend for DIF Universal Registrar
------------------------------------

See https://github.com/decentralized-identity/universal-registrar/

# Running the Frontend for the Universal Registrar

## Prepare

Install all dependencies

    npm install

## Running in Dev

Following command will run the frontend on your local machine at http://localhost:7082/

    npm run dev

## Running in Prod

Production build and creating & runnig a docker container. The frontend will be accessible at http://localhost:80/

    npm run build
    docker build -f ./docker/Dockerfile . -t universalregistrar/universal-registrar-frontend 
    docker run -it -p 7082:7082 -e BACKEND_URL="http://localhost:8080" universalregistrar/universal-registrar-frontend
