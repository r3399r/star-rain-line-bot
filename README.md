# LINE BOT project for nodejs

## Required

- `nodejs` https://nodejs.org/en/download/
- `aws cli` https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html

## Getting started

- `git clone` this project to your local directory.
- Run `npm install` to install required packages.
- Set `aws configure` so that we can deploy by aws cloudformation.
  - AWS Access Key ID: AKIAUBV6BOODOEY6TZ4X
  - AWS Secret Access Key: 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
  - Default region name: ap-northeast-1
  - Default output format: json
- `npm install -g ts-node` for seting LINE API like richmenu.

## Configuration in Line Official Account Manager

- Fill `https://7azw5wwzsc.execute-api.ap-northeast-1.amazonaws.com/dev/star-rain` in the webhook URL.
  This is the API Gateway Endpoint. And it redirects to AWS Lambda function.

## How to Deploy

### AWS Services

- `deploy:dev` for dev environment for testing usage.
- `deploy:prod` for production. Never run this command without any permitment. Before running this command, we need to modify `FIX-ME` in the code.

### LINE API

- `ts-node path/to/file` to set the required configuration.
