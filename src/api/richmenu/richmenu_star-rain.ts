import { Client, RichMenu, RichMenuResponse } from '@line/bot-sdk';
import * as fs from 'fs';
// tslint:disable-next-line: no-relative-imports
import { Channel } from '../../util/Channel';

async function setRichMenu(): Promise<any> {
  const client: Client = new Client(Channel.starRainConfig);

  const richMenuMain0: RichMenu = {
    size: {
      width: 800,
      height: 270,
    },
    selected: true,
    name: 'richmenu0',
    chatBarText: '選單',
    areas: [
      {
        bounds: {
          x: 0,
          y: 0,
          width: 800,
          height: 135,
        },
        action: {
          type: 'postback',
          data: 'richmenu1',
          displayText: '集點!',
        },
      },
    ],
  };

  const richMenuMain1: RichMenu = {
    size: {
      width: 800,
      height: 270,
    },
    selected: true,
    name: 'richmenu1',
    chatBarText: '選單',
    areas: [
      {
        bounds: {
          x: 0,
          y: 0,
          width: 800,
          height: 135,
        },
        action: {
          type: 'postback',
          data: 'richmenu2',
          displayText: '集點!',
        },
      },
    ],
  };

  const richMenuMain2: RichMenu = {
    size: {
      width: 800,
      height: 270,
    },
    selected: true,
    name: 'richmenu2',
    chatBarText: '選單',
    areas: [
      {
        bounds: {
          x: 0,
          y: 0,
          width: 800,
          height: 135,
        },
        action: {
          type: 'postback',
          data: 'richmenu3',
          displayText: '集點!',
        },
      },
    ],
  };

  const richMenuMain3: RichMenu = {
    size: {
      width: 800,
      height: 270,
    },
    selected: true,
    name: 'richmenu3',
    chatBarText: '選單',
    areas: [
      {
        bounds: {
          x: 0,
          y: 0,
          width: 800,
          height: 135,
        },
        action: {
          type: 'postback',
          data: 'richmenu0',
          displayText: '不見了QQ',
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
  const richMenuId0: string = await client.createRichMenu(richMenuMain0);
  const richMenuId1: string = await client.createRichMenu(richMenuMain1);
  const richMenuId2: string = await client.createRichMenu(richMenuMain2);
  const richMenuId3: string = await client.createRichMenu(richMenuMain3);

  console.log('created new');
  await client.setRichMenuImage(
    richMenuId0,
    fs.createReadStream('./src/api/richmenu/richmenu-0.png')
  );
  await client.setRichMenuImage(
    richMenuId1,
    fs.createReadStream('./src/api/richmenu/richmenu-1.png')
  );
  await client.setRichMenuImage(
    richMenuId2,
    fs.createReadStream('./src/api/richmenu/richmenu-2.png')
  );
  await client.setRichMenuImage(
    richMenuId3,
    fs.createReadStream('./src/api/richmenu/richmenu-3.png')
  );
  console.log('set richmenu finish');

  await client.setDefaultRichMenu(richMenuId0);
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
