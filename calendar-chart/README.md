# Calendar App Helm Chart

This Helm chart deploys the Calendar App application on a Kubernetes cluster.

## Prerequisites

- Kubernetes 1.19+
- Helm 3.2.0+
- PV provisioner support in the underlying infrastructure (if persistence is needed)

## Installing the Chart

First, add the Bitnami repository to Helm:

```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
```

To install the chart with the release name `my-calendar`:

```bash
# Update dependencies first
helm dependency update ./calendar-chart

# Install the chart
helm install my-calendar ./calendar-chart
```

The command deploys the Calendar App on the Kubernetes cluster with default configuration. The [Parameters](#parameters) section lists the parameters that can be configured during installation.

## Uninstalling the Chart

To uninstall/delete the `my-calendar` deployment:

```bash
helm uninstall my-calendar
```

## Parameters

### Global parameters

| Name                      | Description                                     | Value           |
| ------------------------- | ----------------------------------------------- | --------------- |
| `replicaCount`            | Number of replicas                              | `1`             |
| `image.repository`        | Image repository                                | `faizananwar532/hsfulda-argocd-demo`  |
| `image.tag`               | Image tag                                       | `latest`        |
| `image.pullPolicy`        | Image pull policy                               | `IfNotPresent`  |
| `service.type`            | Kubernetes Service type                         | `LoadBalancer`  |
| `service.port`            | Service HTTP port                               | `80`            |
| `service.targetPort`      | Service target port                             | `3000`          |
| `ingress.enabled`         | Enable ingress controller resource              | `false`         |
| `resources.limits.cpu`    | The CPU limits                                  | `500m`          |
| `resources.limits.memory` | The memory limits                               | `512Mi`         |
| `resources.requests.cpu`  | The requested CPU                               | `100m`          |
| `resources.requests.memory` | The requested memory                          | `128Mi`         |

### Health Check parameters

| Name                                   | Description                                     | Value           |
| -------------------------------------- | ----------------------------------------------- | --------------- |
| `healthCheck.enabled`                  | Enable health checks                            | `true`          |
| `healthCheck.livenessProbe.path`       | Path for liveness probe                         | `/`             |
| `healthCheck.livenessProbe.initialDelaySeconds` | Initial delay for liveness probe       | `30`            |
| `healthCheck.livenessProbe.periodSeconds` | Period seconds for liveness probe            | `10`            |
| `healthCheck.readinessProbe.path`      | Path for readiness probe                        | `/`             |
| `healthCheck.readinessProbe.initialDelaySeconds` | Initial delay for readiness probe     | `5`             |
| `healthCheck.readinessProbe.periodSeconds` | Period seconds for readiness probe          | `5`             |

### MySQL parameters

| Name                                 | Description                                     | Value           |
| ------------------------------------ | ----------------------------------------------- | --------------- |
| `mysql.enabled`                      | Deploy a MySQL server                           | `true`          |
| `mysql.auth.rootPassword`            | MySQL root password                             | `rootpassword`  |
| `mysql.auth.database`                | MySQL custom database                           | `calendarDB`    |
| `mysql.auth.username`                | MySQL custom user name                          | `calendaruser`  |
| `mysql.auth.password`                | MySQL custom user password                      | `12123434example` |
| `mysql.primary.persistence.enabled`  | Enable persistence using PVC                    | `false`          |
| `mysql.primary.persistence.size`     | PVC Storage Request for MySQL volume            | `1Gi`           |
| `mysql.initdbScriptsConfigMap`       | ConfigMap with the init scripts                 | `<release-name>-init-sql` |

## Configuration and Installation Details

### Configuring the application

The application is configured to connect to the MySQL database using environment variables that are set directly in the deployment template. The MySQL host is set to use the fully qualified domain name of the MySQL service: `<release-name>-mariadb.<namespace>.svc.cluster.local`.

### Dependencies

This chart uses MySQL as a dependency from the Bitnami charts repository. The dependency is defined in the `Chart.yaml` file:

```yaml
dependencies:
  - name: mysql
    version: "12.2.2"
    repository: "https://charts.bitnami.com/bitnami"
```

### Persistence

The MySQL database uses a PersistentVolumeClaim to store data. This is set to `false` by default in the `values.yaml` file.

### MySQL Connection

The application uses an initContainer to wait for MySQL to be ready before starting. This ensures that the application only starts when the database is fully initialized and accessible. The initContainer uses a simple `nc` (netcat) command to check if the MySQL port is open and ready to accept connections.

### MySQL Initialization

The MySQL database is initialized with a SQL script that creates the events table and adds some sample data. This is done through a ConfigMap that is referenced in the MySQL chart's `initdbScriptsConfigMap` parameter. The ConfigMap is created with Helm hooks to ensure it exists before the MySQL deployment.

### Health Checks

The application includes configurable health checks (liveness and readiness probes) that can be enabled or disabled via the `healthCheck.enabled` parameter. When enabled, the probes will check if the application is responding on the specified paths.

### Service Type

The application is exposed using a LoadBalancer service type by default. This allows external access to the application through a cloud provider's load balancer. After deployment, you can find the external IP address using:

```bash
kubectl get svc my-calendar-calendar-app
```

### Ingress

The chart also provides support for ingress resources if you prefer to use an ingress controller. If you have an ingress controller installed in your cluster, such as [nginx-ingress](https://kubernetes.github.io/ingress-nginx/) or [traefik](https://traefik.io/), you can utilize it to serve your application by setting `ingress.enabled` to `true`. 