import { Client, MessageEvent, PostbackEvent } from '@line/bot-sdk';
import { inject, injectable } from 'inversify';
import { ItemGenerator } from 'src/util/ItemGenerator';

/**
 * Service class for star-rain line bot.
 */
@injectable()
export class StarRainService {
  @inject(Client)
  private readonly client!: Client;

  public async messageReply(event: MessageEvent): Promise<void> {
    if (event.message.type === 'text') {
      let replyText: string = '';
      replyText += '感謝您傳送訊息給我們。\n';
      replyText += '很抱歉，這個帳號沒有辦法對用戶個別回覆\n\n';
      replyText += '若有提問歡迎到我們的FB粉絲專頁題問，我們會盡速回覆\n';
      replyText += 'https://www.facebook.com/starrain.ntu/\n';
      replyText += '以下連結可自動開啟臉書app\n';
      replyText +=
        // tslint:disable-next-line: no-http-string
        'http://pic.sopili.net/l/facebook/page/228154233892265\n\n';
      replyText += '台大星雨小編群感謝您^^';

      await this.client.replyMessage(event.replyToken, {
        type: 'text',
        text: replyText,
      });
    }
  }

  public async postbackEvent(event: PostbackEvent): Promise<void> {
    if (event.source.userId === undefined) {
      throw new Error('there is no userId.');
    }

    const data: string[] = event.postback.data.split('::');
    switch (data[0]) {
      case 'brochure':
        await this.client.replyMessage(
          event.replyToken,
          ItemGenerator.flexPureImage()
        );
        break;
      case 'game':
        await this.playGame(event.replyToken, data[1]);
        break;
      case 'setting':
        await this.client.replyMessage(event.replyToken, {
          type: 'text',
          text: 'sign-up',
          quickReply: {
            items: [
              ItemGenerator.quickReplyItem('家長', '家長', 'related'),
              ItemGenerator.quickReplyItem('社會', '社會', 'others'),
            ],
          },
        });
        break;
      default:
    }
  }

  private async playGame(replyToken: string, question: string): Promise<void> {
    switch (question) {
      case 'wrong':
        await this.client.replyMessage(replyToken, {
          type: 'text',
          text: '不對喔~ 再想想',
        });
        break;
      case '1':
        let initialText: string = '';
        initialText += '總共8題!你能完成所有的題目嗎?\n';
        initialText += '全部完成後可以獲得一杯免費飲料~';
        await this.client.replyMessage(replyToken, [
          ItemGenerator.textMessage(initialText),
          ItemGenerator.templateTrueFalse(
            '是非題小遊戲',
            '1.星兒的智商都很低嗎?',
            'game::wrong',
            'game::2'
          ),
        ]);
        break;
      case '2':
        await this.client.replyMessage(
          replyToken,
          ItemGenerator.templateTrueFalse(
            '是非題小遊戲',
            '2.星兒是不是都不太愛講話?',
            'game::wrong',
            'game::3'
          )
        );
        break;
      case '3':
        await this.client.replyMessage(
          replyToken,
          ItemGenerator.templateTrueFalse(
            '是非題小遊戲',
            '3.男性星兒的人數是不是大於女性星兒?',
            'game::4',
            'game::wrong'
          )
        );
        break;
      case '4':
        await this.client.replyMessage(
          replyToken,
          ItemGenerator.templateTrueFalse(
            '是非題小遊戲',
            '4.星兒都不喜歡交朋友嗎?',
            'game::wrong',
            'game::5'
          )
        );
        break;
      case '5':
        await this.client.replyMessage(
          replyToken,
          ItemGenerator.templateTrueFalse(
            '是非題小遊戲',
            '5.星兒症狀是不是都很明顯?',
            'game::wrong',
            'game::6'
          )
        );
        break;
      case '6':
        await this.client.replyMessage(
          replyToken,
          ItemGenerator.templateTrueFalse(
            '是非題小遊戲',
            '6.星兒人口數在台灣是不是多於20萬人?',
            'game::7',
            'game::wrong'
          )
        );
        break;
      case '7':
        await this.client.replyMessage(
          replyToken,
          ItemGenerator.templateTrueFalse(
            '是非題小遊戲',
            '7.星兒是不是都在家自學?',
            'game::wrong',
            'game::8'
          )
        );
        break;
      case '8':
        await this.client.replyMessage(
          replyToken,
          ItemGenerator.templateTrueFalse(
            '是非題小遊戲',
            '8.每個星兒的自閉症症狀是不是都不同?',
            'game::end',
            'game::wrong'
          )
        );
        break;
      case 'end':
        let finalText: string = '';
        finalText += '恭喜你完成所有的題目，獲得一杯飲料!\n';
        finalText += '點選連結填寫表單:https://reurl.cc/b6Zgd6\n';
        finalText += '並在最後一題填暗號"飲料飲料飲料"\n';
        finalText += '我們將在活動當天送你一杯飲料:)';
        await this.client.replyMessage(
          replyToken,
          ItemGenerator.textMessage(finalText)
        );
        break;
      default:
    }
  }
}
