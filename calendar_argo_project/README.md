# Calendar App ArgoCD application

## Installation

1. Create a new ArgoCD Application

- Application Name: ArgoCD demo
- Project name: default
- Sync Policy: AUto
- Auto create namespace: On
- Source:
    - Url: https://github.com/DRSchlaubi/hsfulda-gitops-demo.git
    - Path: `calendar_argo_project`
