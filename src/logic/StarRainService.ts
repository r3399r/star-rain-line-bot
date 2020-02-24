import {
  Client,
  MessageEvent,
  PostbackEvent,
  //RichMenuResponse,
} from '@line/bot-sdk';
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
      if (event.message.text === 'hi') {
        await this.client.replyMessage(event.replyToken, {
          type: 'text',
          text: 'yeyes',
        });
      } else {
        let replyText: string = '';
        replyText += '感謝您傳送訊息給我們。\n';
        replyText += '很抱歉，這個帳號沒有辦法對用戶個別回覆\n\n';
        replyText += '若有提問歡迎到我們的FB粉絲專頁題問，我們會盡速回覆\n';
        replyText += 'https://www.facebook.com/starrain.ntu/\n';
        replyText += '以下連結可自動開啟臉書app\n';
        replyText +=
          'http://pic.sopili.net/l/facebook/page/228154233892265 \n\n';
        replyText += '台大星雨小編群感謝您^^';

        await this.client.replyMessage(event.replyToken, {
          type: 'text',
          text: replyText,
        });
      }
    }
  }

  public async postbackEvent(event: PostbackEvent): Promise<void> {
    if (event.source.userId === undefined) {
      throw new Error('there is no userId.');
    }

    switch (event.postback.data) {
      case "1": {
        await this.client.replyMessage(event.replyToken, {
          type: 'text',
          text: '1haha',
        });
        break;
      }
      case "2": {
        await this.client.replyMessage(event.replyToken, {
          type: 'text',
          text: '2haha',
        });
        break;
      }

      default: {
        await this.client.replyMessage(event.replyToken, {
          type: 'text',
          text: 'default',
        });

        break;
      }
    }
    //const richMenus: RichMenuResponse[] = await this.client.getRichMenuList();
    //for (const rm of richMenus) {
    //  if (rm.name === event.postback.data) {
    //    await this.client.linkRichMenuToUser(
    //      event.source.userId,
    //      rm.richMenuId
    //    );
    //  }
    //}
  }
}
