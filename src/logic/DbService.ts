import { DynamoDB } from 'aws-sdk';
import {
  GetItemInput,
  GetItemOutput,
  UpdateItemInput,
  UpdateItemOutput,
} from 'aws-sdk/clients/dynamodb';
import { inject, injectable } from 'inversify';
import { Channel } from 'src/util/Channel';
/**
 * Save follower to AWS DynamoDB. Remove unfollower instead.
 */
@injectable()
export class DbService {
  @inject(DynamoDB)
  private readonly dynamoDb!: DynamoDB;

  private readonly tableName: string = 'user';

  private readonly envr: string = `${Channel.environment}-`;

  private readonly functionName: string = 'starRain';

  public async createUser(
    userId: string | undefined,
    timestamp: number
  ): Promise<UpdateItemOutput> {
    const params: UpdateItemInput = {
      TableName: this.tableName,
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

  private async getItem(userId: string | undefined): Promise<GetItemOutput> {
    if (userId === undefined) {
      throw new Error('there is no userId');
    }
    const paramsGet: GetItemInput = {
      TableName: this.tableName,
      Key: {
        userId: { S: userId },
        lineBotName: { S: `${this.envr}${this.functionName}` },
      },
    };

    return await this.dynamoDb.getItem(paramsGet).promise();
  }

  public async saveAttribute(
    userId: string | undefined,
    attributeName: string,
    storedValue: string
  ): Promise<UpdateItemOutput> {
    if (userId === undefined) {
      throw new Error('there is no userId');
    }
    let res: GetItemOutput = await this.getItem(userId);

    if (res.Item === undefined) {
      res = await this.createUser(userId, Date.now());
    }

    const paramsUpdate: UpdateItemInput = {
      TableName: this.tableName,
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

  public async getUser(userId: string | undefined): Promise<any> {
    if (userId === undefined) {
      throw new Error('there is no userId');
    }
    const userItem: any = await this.getItem(userId);

    return {
      userId: String(userItem.Item.userId.S),
      lineBotName: String(userItem.Item.lineBotName.S),
      timestamp: Number(userItem.Item.timestamp.N),
      status:
        userItem.Item.status === undefined ? undefined : userItem.Item.status.S,
    };
  }
}
