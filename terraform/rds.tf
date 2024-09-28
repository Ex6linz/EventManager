resource "aws_db_subnet_group" "rds_subnet_group" {
  name       = "rds-subnet-group"
  subnet_ids = [aws_subnet.private.id]

  tags = {
    Name = "rds-subnet-group"
  }
}

resource "aws_db_instance" "postgres" {
  identifier              = "event-manager-db"
  allocated_storage       = 20
  engine                  = "postgres"
  engine_version          = "16.4"
  instance_class          = "db.t3.micro"
  name                    = "event_manager_db"
  username                = var.db_username
  password                = var.db_password
  parameter_group_name    = "default.postgres16"
  skip_final_snapshot     = true

  vpc_security_group_ids  = [aws_security_group.rds_sg.id]
  db_subnet_group_name    = aws_db_subnet_group.rds_subnet_group.name

  publicly_accessible     = false

  tags = {
    Name = "event-manager-db"
  }
}