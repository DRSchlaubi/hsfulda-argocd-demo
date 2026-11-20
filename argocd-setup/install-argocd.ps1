#!/usr/bin/env pwsh

$ErrorActionPreference = "Stop"

$ArgoCdNamespace = "argocd"

# Helper: fail the script if the last native command returned a non-zero exit code
function Assert-LastExitCode {
    param([string]$Message)
    if ($LASTEXITCODE -ne 0) {
        throw "$Message (exit code $LASTEXITCODE)"
    }
}

# Create namespace if it doesn't exist
kubectl create namespace $ArgoCdNamespace --dry-run=client -o yaml | kubectl apply -f -
Assert-LastExitCode "Failed to create namespace '$ArgoCdNamespace'"

# Add ArgoCD Helm repo if not already added
helm repo add argo https://argoproj.github.io/argo-helm
Assert-LastExitCode "Failed to add Helm repo"
helm repo update
Assert-LastExitCode "Failed to update Helm repos"

# Install ArgoCD with LoadBalancer service type
helm install argocd argo/argo-cd `
    --namespace $ArgoCdNamespace `
    --set server.service.type=LoadBalancer
Assert-LastExitCode "Helm install failed"

# Wait for deployment to complete
Write-Host "Waiting for ArgoCD server to be ready..."
kubectl wait --for=condition=available --timeout=300s deployment/argocd-server -n $ArgoCdNamespace
Assert-LastExitCode "ArgoCD server did not become available in time"

# Get the service details
Write-Host "ArgoCD server service:"
kubectl get svc argocd-server -n $ArgoCdNamespace
Assert-LastExitCode "Failed to get argocd-server service"

# Get the initial admin password
Write-Host "Initial admin password:"
$encodedPassword = kubectl -n $ArgoCdNamespace get secret argocd-initial-admin-secret -o jsonpath="{.data.password}"
Assert-LastExitCode "Failed to read initial admin secret"
$password = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($encodedPassword))
Write-Host $password
Write-Host ""

Write-Host "ArgoCD has been installed successfully!"
Write-Host "Access the UI using the LoadBalancer external IP"
Write-Host "Username: admin"
Write-Host "Remember to change the admin password and delete the argocd-initial-admin-secret after login"
