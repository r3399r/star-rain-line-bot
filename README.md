# LINE BOT project for nodejs

## required

- `npm`

## getting started

- run `npm install` first to get required packages.
- set `aws configure` so that we can deploy by aws cloudformation.

## AWS CloudFormation

When we are going to add a new api gateway endpoint, we need to modify `template.yaml`. That's all.
And please note that in `package.json`, we use `deploy:dev` for dev environment, and `deploy:prod` for production.
