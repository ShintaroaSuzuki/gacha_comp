terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "~> 5"
    }
  }

  backend "s3" {
    bucket = "shintaroasuzuki-gacha-comp-tfstate"
    key    = "terraform.tfstate"
    region = "us-east-1"

    skip_credentials_validation = true
    skip_region_validation      = true
    skip_requesting_account_id  = true
    skip_metadata_api_check     = true
    skip_s3_checksum = true
  }
}

provider "aws" {
  region = "us-east-1"

  skip_credentials_validation = true
  skip_region_validation      = true
  skip_requesting_account_id  = true
}

resource "aws_s3_bucket" "gacha_comp" {
  bucket_prefix = "gacha-comp"
}

resource "aws_s3_object" "multiple_object" {
  for_each     = module.distribution_files.files
  bucket       = aws_s3_bucket.gacha_comp.id
  key          = each.key
  source       = each.value.source_path
  content_type = each.value.content_type
  etag         = filemd5(each.value.source_path)
}

module "distribution_files" {
  source   = "hashicorp/dir/template"
  base_dir = "../out"
  
}
