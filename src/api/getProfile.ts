import { Client } from '@line/bot-sdk';
// tslint:disable-next-line: no-relative-imports
import { Channel } from '../util/Channel';

async function setRichMenu(): Promise<any> {
  const client: Client = new Client(Channel.starRainConfig);

  console.log(await client.getProfile('Udbe6af1d6183b0af450d06f80826fcd6'));
}

setRichMenu()
  .then((_res: any) => {
    // console.log(res);
  })
  .catch((err: any) => {
    console.log(err);
  });
