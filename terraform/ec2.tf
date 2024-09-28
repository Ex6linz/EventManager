resource "aws_instance" "app_server" {
  ami           = "ami-0c55b159cbfafe1f0"  # Replace with an appropriate AMI for your region and OS
  instance_type = var.ec2_instance_type
  subnet_id     = aws_subnet.public.id
  security_groups = [aws_security_group.ec2_sg.name]
  key_name      = "your-key-pair-name"  # Replace with your SSH key pair name

  # Add EBS Volume
  root_block_device {
    volume_type = "gp2"
    volume_size = 20
  }

  user_data = <<-EOF
              #!/bin/bash
              sudo apt-get update
              sudo apt-get install -y docker.io
              sudo systemctl start docker
              sudo systemctl enable docker
              # Additional configuration like Kubernetes installation can be added here
              EOF

  tags = {
    Name = "app-server"
  }
}