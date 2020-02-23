import { WebhookRequestBody } from '@line/bot-sdk';
import { bindings } from 'src/bindings';
import { StarRainService } from 'src/logic/StarRainService';
import { BindingsHelper } from 'src/util/BindingsHelper';
import { Channel } from 'src/util/Channel';

export async function starRain(
  event: WebhookRequestBody,
  _context: any
): Promise<any> {
  console.log(event.events[0]);

  BindingsHelper.bindClientConfig(Channel.starRainConfig);

  const starRainService: StarRainService = bindings.get<StarRainService>(
    StarRainService
  );

  switch (
    event.events[0].type // eventType
  ) {
    case 'message':
      await starRainService.messageReply(event.events[0]);
      break;
    case 'postback':
      await starRainService.postbackEvent(event.events[0]);
      break;
    default:
  }
}
