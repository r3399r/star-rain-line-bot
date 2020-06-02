import { Client, RichMenu, RichMenuResponse } from '@line/bot-sdk';
import * as fs from 'fs';
// tslint:disable-next-line: no-relative-imports
import { Channel } from '../../util/Channel';

async function setRichMenu(): Promise<any> {
  const client: Client = new Client(Channel.config[Channel.environment]);

  const richMenuMain: RichMenu = {
    size: {
      width: 945,
      height: 319,
    },
    selected: true,
    name: 'richmenu',
    chatBarText: '選單',
    areas: [
      {
        bounds: {
          x: 0,
          y: 0,
          width: 472,
          height: 159,
        },
        action: {
          type: 'postback',
          data: 'brochure',
          displayText: '電子傳單',
        },
      },
      {
        bounds: {
          x: 0,
          y: 159,
          width: 472,
          height: 160,
        },
        action: {
          type: 'uri',
          // tslint:disable-next-line: no-http-string
          uri: 'http://pic.sopili.net/l/facebook/page/228154233892265',
        },
      },
      {
        bounds: {
          x: 472,
          y: 159,
          width: 472,
          height: 160,
        },
        action: {
          type: 'postback',
          data: 'setting',
          displayText: '通知設定',
        },
      },
      {
        bounds: {
          x: 472,
          y: 0,
          width: 472,
          height: 159,
        },
        action: {
          type: 'postback',
          data: 'game::1',
          displayText: '認識星兒小測驗',
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
  const richMenu: string = await client.createRichMenu(richMenuMain);

  console.log('created new');
  await client.setRichMenuImage(
    richMenu,
    fs.createReadStream('./src/api/richmenu/richmenu20200602.png')
  );

  console.log('set richmenu finish');

  await client.setDefaultRichMenu(richMenu);
  console.log('setDefault');

  console.log(await client.getRichMenuList());
}

setRichMenu()
  .then((_res: any) => {
    // console.log(res);
  })
  .catch((err: any) => {
    console.log(err);
  });
