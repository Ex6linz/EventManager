# Event Manager Application Deployment Guide

This repository contains the configuration and instructions to deploy the **Event Manager** application using Docker, Kubernetes, and Terraform on AWS. The application consists of a frontend (React), an API (Flask), and a PostgreSQL database.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Building Docker Images](#building-docker-images)
  - [Frontend (React)](#frontend-react)
  - [API (Flask-Python)](#api-flask)
  - [Docker-compose](#building-docker-images)
- [Application Endpoints](#application-endpoints)
- [Environment Variables](#environment-variables)
- [Deploying to Kubernetes](#deploying-to-kubernetes)
- [Deploying Infrastructure with Terraform](#deploying-infrastructure-with-terraform)
- [Additional Information](#additional-information)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)
- [Terraform](https://learn.hashicorp.com/tutorials/terraform/install-cli)
- [AWS CLI](https://aws.amazon.com/cli/) configured with appropriate permissions

## Building Docker Images

### Frontend (React)

1. **Navigate to the Frontend Directory**

   ```bash
   cd EventManager-FE
   docker build -t frontend:1.0 . 
   docker push your-dockerhub-username/frontend:1.0

### API (Flask-Python)
2. **Navigate to the API Directory**
   ```bash
   cd EventManager-BE
   docker build -t backend:1.0 . 
   docker push your-dockerhub-username/backend:1.0

### Docker-compose
3. **Deploy with docker-compose**
   
   Above we had image creation while my docker-compose configuration includes build at its level so I use
   ```bash
   docker compose up -d --build
   
### Application Endpoints

1. **GET /events**

#### Description:
Retrieves a list of all events.

2. **POST /events**

#### Description:
Creates a new event in the system.

3. **POST /login/**

#### Description:
Sending login details

4. **POST /register/**

#### Description:
Sending to the database and saving login data (registration)

# Environment Variables Documentation

This document outlines the environment variables required for the **Event Manager** application. These variables configure various aspects of the application, such as database connections, secret keys, and API-related settings. The environment variables are set through Kubernetes ConfigMaps and Secrets.

## Required Environment Variables

### 1. `DATABASE_URL`

- **Description**: This variable contains the connection string for the PostgreSQL database used by the application.
- **Example**: 
  ```bash
  DATABASE_URL=postgresql://postgres:password@postgres-service:5432/event_manager_db

### 2. 'SECRET_KEY'

- **Description**: The secret key used by Flask to sign session cookies and for other cryptographic operations.

- **Example**: 
  ```bash
  SECRET_KEY=supersecretkey

# Deploying to Kubernetes

This guide outlines the steps to deploy the **Event Manager** application on a Kubernetes cluster. The deployment includes PostgreSQL (via StatefulSet), the Flask API, and the React frontend. The application also uses Kubernetes `ConfigMap` and `Secrets` for managing environment variables.

## Prerequisites

Before deploying the application to Kubernetes, ensure the following are set up:

- A Kubernetes cluster is running (e.g., Minikube, GKE, or EKS).
- `kubectl` is installed and configured to interact with your cluster.
- Docker images for the API and frontend are available on a container registry (e.g., Docker Hub).

## Kubernetes Components Overview

- **PostgreSQL**: Managed using a StatefulSet and a Service to provide stable network identity and storage.
- **Flask API**: Deployed as a Deployment object with replicas for scalability.
- **React Frontend**: Deployed as a Deployment object with its own Service for external access.
- **ConfigMap**: Used to store non-sensitive environment variables.
- **Secret**: Used to store sensitive environment variables like database passwords and secret keys.

## 1. Apply ConfigMap and Secret

The application requires environment variables that are managed using ConfigMap and Secret. Apply them to the cluster first.

### ConfigMap

Create a file named `configmap.yaml` to store non-sensitive environment variables.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  DATABASE_URL: "postgresql://postgres:postgres@postgres-service:5432/event_manager_db"

### SECRET

   ''''yaml
   apiVersion: v1
   kind: Secret
   metadata:
        name: app-secret
   type: Opaque
   data:
        POSTGRES_PASSWORD: c3VwZXJzZWNyZXRwYXNz  # Base64 encoded password
        SECRET_KEY: c3VwZXJzZWNyZXRrZXk=         # Base64 encoded secret key
### TO apply ConfigMap and Secret to your Kubernetes Cluster, run:
    ''''bash
    kubectl apply -f configmap.yaml
    kubectl apply -f secret.yaml

### The sequence is repeated for other files to be deployed using k8s 
    ''''bash
    kubectl apply -f api-deployment.yaml 
    etc.
