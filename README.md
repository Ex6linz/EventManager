# Event Manager Application Deployment Guide

This repository contains the configuration and instructions to deploy the **Event Manager** application using Docker, Kubernetes, and Terraform on AWS. The application consists of a frontend (React), an API (Flask), and a PostgreSQL database.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Building Docker Images](#building-docker-images)
  - [Frontend (React)](#frontend-react)
  - [API (Flask)](#api-flask)
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
