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
    docker build -f ./docker/Dockerfile . -t universalregistrar/uni-registrar-frontend 
    docker run -p 80:80 universalregistrar/uni-registrar-frontend
