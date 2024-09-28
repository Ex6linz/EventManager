provider "aws" {
  region = var.region
}

# Networking resources: VPC, subnets, internet gateway, and route tables
module "network" {
  source = "./network"
}

# Security Groups for EC2 and RDS
module "security" {
  source = "./security"
}

# EC2 instance and associated resources (e.g., EBS)
module "ec2" {
  source = "./ec2"
}

# RDS PostgreSQL database
module "rds" {
  source = "./rds"
}

# Outputting important information such as EC2 public IP and RDS endpoint
output "ec2_public_ip" {
  description = "Public IP of the EC2 instance"
  value       = module.ec2.ec2_public_ip
}

output "rds_endpoint" {
  description = "Endpoint of the RDS PostgreSQL instance"
  value       = module.rds.rds_endpoint
}