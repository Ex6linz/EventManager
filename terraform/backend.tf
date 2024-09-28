terraform {
  backend "s3" {
    bucket         = "your-terraform-state-bucket"    # Replace with your unique S3 bucket name
    key            = "path/to/your/terraform.tfstate"  # Path to the state file in the bucket
    region         = "eu-north-1"                       # Your AWS region
    dynamodb_table = "terraform-lock-table"           # Name of DynamoDB table for state locking
    encrypt        = true
  }
}

provider "aws" {
  region = "eu-north-1"
}