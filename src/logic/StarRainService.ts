import { Client, MessageEvent } from '@line/bot-sdk';
import { inject, injectable } from 'inversify';

/**
 * Service class for star-rain line bot.
 */
@injectable()
export class StarRainService {
  @inject(Client)
  private readonly client!: Client;

  public async messageReply(event: MessageEvent): Promise<void> {
    if (event.message.type === 'text') {
      await this.client.replyMessage(event.replyToken, {
        type: 'text',
        text: event.message.text,
      });
    }
  }
}
