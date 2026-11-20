# ArgoCD Implementation

This directory contains the necessary files to set up ArgoCD on your Kubernetes cluster for continuous delivery.

## Overview

ArgoCD is a declarative, GitOps continuous delivery tool for Kubernetes. It automates the deployment of applications to Kubernetes clusters by monitoring Git repositories and applying changes when they are detected.

## Prerequisites

- A running Kubernetes cluster
- kubectl configured to communicate with your cluster
- Helm v3 installed

## Installation

To install ArgoCD on your cluster:

1. (Linux & MacOS only) Make the installation script executable:
   ```
   chmod +x install-argocd.sh
   ```

2. Run the installation script:
   ```shell
   ./install-argocd.sh
   ```
   or
   ```powershell
   ./install-argocd.ps1
   ```
   
## What the Script Does

The `install-argocd.sh` script:

1. Creates the `argocd`
2. Adds the ArgoCD Helm repository
3. Installs ArgoCD with LoadBalancer service type
4. Waits for the deployment to complete
5. Displays the service details and initial admin password

## Accessing ArgoCD

After installation:

1. Access the ArgoCD UI using the LoadBalancer external IP displayed in the output
2. Log in with:
   - Username: `admin`
   - Password: The initial password displayed by the installation script

## Next Steps

After logging in:

1. Change the admin password
2. Delete the `argocd-initial-admin-secret` for security
3. Set up your applications using the ArgoCD UI or CLI
4. Connect your repository in settings in the ArgoCD UI
5. [Create application in the ArgoCD UI](../calendar_argo_project)


## Documentation

For more information on using ArgoCD, refer to the [official documentation](https://argo-cd.readthedocs.io/en/stable/).

