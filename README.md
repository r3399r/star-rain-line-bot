# LINE BOT project for nodejs

- help-me: a project that students can ask/reply questions.

## AWS CloudFormation

When we are going to add a new api gateway endpoint, we need to modify `template.yaml`. That's all.
And please note that in `package.json`, we use `deploy:dev` for dev environment, and `deploy:prod` for production.

## Manual Work

We need to create AWS S3 Buckets and AWS DynamoDB tables manually.
