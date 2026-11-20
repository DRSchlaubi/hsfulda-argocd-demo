# Calendar Application Project

This project consists of a calendar application with event management functionality and its Helm chart for Kubernetes deployment.

## Project Structure

- **calendar-app/** - Contains the monolithic calendar application code
- **calendar-chart/** - Contains the Helm chart for deploying the application to Kubernetes
- **docker-compose.yml** - Docker Compose file for running the application locally

## Calendar App

A simple calendar application with event management functionality, built as a monolithic application.

### Features

- Add new events with name and date
- View all events in a visually appealing interface
- Delete events
- Responsive design that works on mobile and desktop

### Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Frontend**: HTML, CSS, JavaScript, Axios

### Running with Docker Compose

To run the application using Docker Compose:

1. From the root directory, run:
   ```
   docker-compose up
   ```

2. Access the application at `http://localhost:3000`

## Helm Chart

The Helm chart in the `calendar-chart` directory allows for easy deployment to Kubernetes clusters.

For more information on deploying with Helm, see the [Helm Chart README](calendar-chart/README.md).

## ArgoCD Setup

The project includes an ArgoCD setup for continuous deployment to Kubernetes. The setup files are located in the `argocd-setup` directory.

### Installing ArgoCD

To install ArgoCD on your Kubernetes cluster:

1. Navigate to the argocd-setup directory:
   ```
   cd argocd-setup
   ```

2. Make the installation script executable:
   ```
   chmod +x install-argocd.sh
   ```

3. Run the installation script (optionally specify a namespace):
   ```
   ./install-argocd.sh [namespace]
   ```

The script will:
- Create the specified namespace (or use the default)
- Install ArgoCD using Helm with LoadBalancer service type
- Display the service details and initial admin password

For more details, see the [ArgoCD Setup README](argocd-setup/README.md).

## GitHub Actions CI/CD

The project includes a GitHub Actions workflow for continuous integration and deployment. The workflow file is located at `.github/workflows/docker-ci.yml`.

### CI/CD Pipeline Features

- Automatically builds the Docker image when triggered
- Pushes the image to DockerHub with both `latest` and commit SHA tags
- Can be manually triggered using GitHub's workflow_dispatch feature
- Uses Docker Buildx for efficient builds

To use this workflow:

1. Set up the following secrets in your GitHub repository:
   - `DOCKERHUB_USERNAME`: Your DockerHub username
   - `DOCKERHUB_TOKEN`: Your DockerHub access token

2. Uncomment the push/pull request triggers in the workflow file to enable automatic builds

The Docker images are published to: `faizananwar532/hsfulda-argocd-demo`

## License

This project is licensed under the MIT License.