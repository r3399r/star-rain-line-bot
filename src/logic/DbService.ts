import { DynamoDB } from 'aws-sdk';
import {
  DeleteItemInput,
  DeleteItemOutput,
  GetItemInput,
  GetItemOutput,
  UpdateItemInput,
  UpdateItemOutput,
} from 'aws-sdk/clients/dynamodb';
import { inject, injectable } from 'inversify';

/**
 * Save follower to AWS DynamoDB. Remove unfollower instead.
 */
@injectable()
export class DbService {
  @inject(DynamoDB)
  private readonly dynamoDb!: DynamoDB;

  private readonly functionName: string = 'starRain';

  private readonly tableUser: string = 'user';

  private readonly tableQuestion: string = 'question';

  private readonly envr: string = 'dev-'; // FIX-ME when deploy to production

  public async addFollower(
    userId: string | undefined,
    timestamp: number
  ): Promise<UpdateItemOutput> {
    const params: UpdateItemInput = {
      TableName: this.tableUser,
      Key: {
        userId: { S: userId },
        lineBotName: { S: `${this.envr}${this.functionName}` },
      },
      ExpressionAttributeNames: {
        '#T': 'timestamp',
      },
      ExpressionAttributeValues: {
        ':t': { N: String(timestamp) },
      },
      ReturnValues: 'ALL_NEW',
      UpdateExpression: 'SET #T = :t',
    };

    return await this.dynamoDb.updateItem(params).promise();
  }

  public async removeUnfollower(
    userId: string | undefined
  ): Promise<DeleteItemOutput> {
    const params: DeleteItemInput = {
      TableName: this.tableUser,
      Key: {
        userId: { S: userId },
        lineBotName: { S: `${this.envr}${this.functionName}` },
      },
    };

    return await this.dynamoDb.deleteItem(params).promise();
  }

  public async getAttribute(
    userId: string | undefined
  ): Promise<GetItemOutput> {
    const paramsGet: GetItemInput = {
      TableName: this.tableUser,
      Key: {
        userId: { S: userId },
        lineBotName: { S: `${this.envr}${this.functionName}` },
      },
    };

    return await this.dynamoDb.getItem(paramsGet).promise();
  }

  public async saveAttribute(
    userId: string,
    attributeName: string,
    storedValue: string
  ): Promise<UpdateItemOutput> {
    const res: GetItemOutput = await this.getAttribute(userId);

    if (res.Item === undefined) {
      throw Error('get item is undefined');
    }

    const paramsUpdate: UpdateItemInput = {
      TableName: this.tableUser,
      Key: {
        userId: { S: userId },
        lineBotName: { S: `${this.envr}${this.functionName}` },
      },
      ExpressionAttributeNames: {
        '#A': attributeName,
      },
      ExpressionAttributeValues: {
        ':a': { S: storedValue },
      },
      ReturnValues: 'ALL_NEW',
      UpdateExpression: 'SET #A = :a',
    };

    return await this.dynamoDb.updateItem(paramsUpdate).promise();
  }

  public async addQuestion(inputId: number, content: string): Promise<string> {
    const questionId: string = `${inputId}${Math.floor(Math.random() * 1000)}`;
    const params: UpdateItemInput = {
      TableName: this.tableQuestion,
      Key: {
        questionId: { N: questionId },
      },
      ExpressionAttributeNames: {
        '#T': 'content',
      },
      ExpressionAttributeValues: {
        ':t': { S: content },
      },
      ReturnValues: 'ALL_NEW',
      UpdateExpression: 'SET #T = :t',
    };
    await this.dynamoDb.updateItem(params).promise();

    return questionId;
  }

  public async deleteQuestion(questionId: string): Promise<DeleteItemOutput> {
    const params: DeleteItemInput = {
      TableName: this.tableQuestion,
      Key: {
        questionId: { N: questionId },
      },
    };

    return await this.dynamoDb.deleteItem(params).promise();
  }
}
