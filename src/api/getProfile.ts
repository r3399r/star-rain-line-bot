import { Client } from '@line/bot-sdk';
// tslint:disable-next-line: no-relative-imports
import { Channel } from '../util/Channel';

async function setRichMenu(): Promise<any> {
  const client: Client = new Client(Channel.starRainConfig);

  // console.log(await client.getProfile('Uf169a38cc920000f065654d449dcc7a6'));
  await client.broadcast({
    type: 'template',
    altText: '設定通知選項',
    template: {
      type: 'buttons',
      text:
        '[通知設定]\n若為星兒或家人，之後會推播出隊資訊給您；\n若為學生或社會人士，我們會不定時推播與自閉症相關的宣導給您。',
      actions: [
        {
          type: 'postback',
          data: 'role::related',
          label: '星兒或家人',
          displayText: '我是星兒或家人',
        },
        {
          type: 'postback',
          data: 'role::other',
          label: '學生或社會人士',
          displayText: '我是學生或社會人士',
        },
      ],
    },
  });
}

setRichMenu()
  .then((_res: any) => {
    // console.log(res);
  })
  .catch((err: any) => {
    console.log(err);
  });
