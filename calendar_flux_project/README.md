# FluxCD implementation

## Requirements
- [FluxCD CLI](https://fluxcd.io/flux/installation/#install-the-flux-cli)
- [GitHub Account](https://github.com/signup)

## Installation
1. Setup an Kubernetes cluster (e.g. with [RKE2](https://github.com/srieger1/terraform-openstack-rke2/tree/hsfulda-example/examples/hs-fulda))
2. [Create a new Repository using this template](https://github.com/DRSchlaubi/hsfulda-argocd-demo/generate)
3. Create a [GitHub PAT](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) 
   according to the [FluxCD docs](https://fluxcd.io/flux/installation/bootstrap/github/#github-pat) with access to the just created repository
4. Run the following command

```bash
flux bootstrap github --token-auth --owner=<your github user> --repository=<your repo> --branch=main --path=calendar_flux_project --personal
```

## Dashboard

Unlike ArgoCD, FluxCD does not have a built-in dashboard, you can use the following alternatives to check the status 
- [Flux CLI](https://fluxcd.io/flux/cmd/): (e.g. `flux get kustomizations -A`)
- [flux9s](https://flux9s.ca/) (A similar tool to k9s)
- [Headlamp](headlamp) Kubernetes' official dashboard (Available under `kubectl get svc headlamp -n headlamp -o=jsonpath='{.status.loadBalancer.ingress[0].ip}'`) 
- [Freelens](https://freelens.app) with the [FluxCD extension](https://github.com/freelensapp/freelens-fluxcd-extension)
   