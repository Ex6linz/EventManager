provider "aws" {
  region = "eu-north-1"
}

resource "aws_s3_bucket" "terraform_state" {
  bucket = "your-terraform-state-bucket-eu"  # Ensure this bucket name is unique globally
  acl    = "private"

  versioning {
    enabled = true
  }

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }

  tags = {
    Name        = "Terraform State Bucket EU"
    Environment = "Dev"
  }
}

resource "aws_dynamodb_table" "terraform_lock" {
  name         = "terraform-lock-table-eu"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }

  tags = {
    Name        = "Terraform Lock Table EU"
    Environment = "Dev"
  }
}