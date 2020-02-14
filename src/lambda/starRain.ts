import { WebhookRequestBody } from '@line/bot-sdk';
import { bindings } from 'src/bindings';
import { DbService } from 'src/logic/DbService';
import { BindingsHelper } from 'src/util/BindingsHelper';
import { Channel } from 'src/util/Channel';

export async function starRain(
  event: WebhookRequestBody,
  _context: any
): Promise<any> {
  console.log(event.events[0]);

  const dbService: DbService = bindings.get<DbService>(DbService);

  // BindingsHelper.bindUser(
  //   await dbService.getAttribute(event.events[0].source.userId)
  // );
  BindingsHelper.bindClientConfig(Channel.starRainConfig);

  // const helpMeService: HelpMeService = bindings.get<HelpMeService>(
  //   HelpMeService
  // );

  switch (
    event.events[0].type // eventType
  ) {
    case 'follow':
      await dbService.addFollower(
        event.events[0].source.userId,
        event.events[0].timestamp
      );
      break;
    case 'unfollow':
      await dbService.removeUnfollower(event.events[0].source.userId);
      break;
    // case 'postback':
    //   await helpMeService.richMenuPostback(event.events[0]);
    //   break;
    // case 'message':
    //   await helpMeService.messageReply(event.events[0]);
    //   break;
    default:
  }
}
