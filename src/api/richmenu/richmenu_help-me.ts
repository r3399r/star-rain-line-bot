import { Client, RichMenu, RichMenuResponse } from '@line/bot-sdk';
import * as fs from 'fs';
// tslint:disable-next-line: no-relative-imports
import { Channel } from '../../util/Channel';

async function setRichMenu(): Promise<any> {
  const client: Client = new Client(Channel.starRainConfig);

  const richMenuMain: RichMenu = {
    size: {
      width: 800,
      height: 270,
    },
    selected: true,
    name: 'main',
    chatBarText: '清單',
    areas: [
      {
        bounds: {
          x: 0,
          y: 0,
          width: 266,
          height: 135,
        },
        action: {
          type: 'postback',
          data: 'ask_question',
          displayText: '問問題',
        },
      },
      {
        bounds: {
          x: 266,
          y: 0,
          width: 267,
          height: 135,
        },
        action: {
          type: 'postback',
          data: 'reply_question',
          displayText: '解題',
        },
      },
      {
        bounds: {
          x: 533,
          y: 0,
          width: 267,
          height: 135,
        },
        action: {
          type: 'postback',
          data: 'query_question',
          displayText: '查詢',
        },
      },
      {
        bounds: {
          x: 0,
          y: 135,
          width: 266,
          height: 135,
        },
        action: {
          type: 'postback',
          data: 'my_data',
          displayText: '我的',
        },
      },
      {
        bounds: {
          x: 266,
          y: 135,
          width: 267,
          height: 135,
        },
        action: {
          type: 'postback',
          data: 'ranking',
          displayText: '排行榜',
        },
      },
      {
        bounds: {
          x: 533,
          y: 135,
          width: 267,
          height: 135,
        },
        action: {
          type: 'postback',
          data: 'q_and_a',
          displayText: 'Q&A',
        },
      },
    ],
  };

  const richMenus: RichMenuResponse[] = await client.getRichMenuList();
  console.log(`find existing richMenus: ${richMenus.length}`);
  for (const rm of richMenus) {
    await client.deleteRichMenu(rm.richMenuId);
  }
  console.log('deleted');
  const richMenuId: string = await client.createRichMenu(richMenuMain);

  console.log('created new');
  await client.setRichMenuImage(
    richMenuId,
    fs.createReadStream('./src/api/richmenu/richmenu-src.png')
  );
  console.log('set richmenu finish');

  await client.setDefaultRichMenu(richMenuId);
  console.log('setDefault');
}

setRichMenu()
  .then((_res: any) => {
    // console.log(res);
  })
  .catch((err: any) => {
    console.log(err);
  });
