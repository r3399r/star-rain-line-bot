import { Client, ClientConfig } from '@line/bot-sdk';
import { GetItemOutput } from 'aws-sdk/clients/dynamodb';
import { bindings } from 'src/bindings';
import { User, userBindingId } from 'src/model/User';

/**
 * Bindings util class.
 */
export class BindingsHelper {
  public static bindClientConfig(config: ClientConfig): void {
    if (bindings.isBound(Client) === false) {
      bindings.bind<Client>(Client).toDynamicValue(() => new Client(config));
    } else {
      bindings.rebind<Client>(Client).toDynamicValue(() => new Client(config));
    }
  }

  public static bindUser(userItem: GetItemOutput): void {
    if (userItem.Item === undefined) {
      throw Error('item is undefined.');
    }
    const user: User = {
      userId: String(userItem.Item.userId.S),
      lineBotName: String(userItem.Item.lineBotName.S),
      timestamp: Number(userItem.Item.timestamp.N),
      status: String(userItem.Item.status.S),
    };
    if (bindings.isBound(userBindingId) === false) {
      bindings.bind<User>(userBindingId).toConstantValue(user);
    } else {
      bindings.rebind<User>(userBindingId).toConstantValue(user);
    }
  }
}
