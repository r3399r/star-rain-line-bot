import { QuickReplyItem } from '@line/bot-sdk';

/**
 * Line message API item generator
 */
export class ItemGenerator {
  public static quickReplyItem(
    label: string,
    displayText: string,
    data: string
  ): QuickReplyItem {
    return {
      type: 'action',
      action: {
        type: 'postback',
        label: label,
        displayText: displayText,
        data: data,
      },
    };
  }
}
