import {
  FlexBubble,
  FlexMessage,
  TemplateMessage,
  TextMessage,
} from '@line/bot-sdk';

/**
 * generate required line objects
 */
export class ItemGenerator {
  public static templateTrueFalse(
    altText: string,
    question: string,
    returnWhenTrue: string,
    returnWhenFalse: string
  ): TemplateMessage {
    return {
      type: 'template',
      altText: altText,
      template: {
        type: 'confirm',
        text: question,
        actions: [
          {
            type: 'postback',
            data: returnWhenTrue,
            label: '✓',
            displayText: '✓',
          },
          {
            type: 'postback',
            data: returnWhenFalse,
            label: '✗',
            displayText: '✗',
          },
        ],
      },
    };
  }

  public static textMessage(text: string): TextMessage {
    return { type: 'text', text: text };
  }

  public static flexPureImage(): FlexMessage {
    return {
      type: 'flex',
      altText: '電子傳單',
      contents: {
        type: 'carousel',
        contents: [
          this.flexBubble(
            'https://y-line-bot-permanent.s3-ap-northeast-1.amazonaws.com/star-rain/brochure1.PNG'
          ),
          this.flexBubble(
            'https://y-line-bot-permanent.s3-ap-northeast-1.amazonaws.com/star-rain/brochure2.PNG'
          ),
          this.flexBubble(
            'https://y-line-bot-permanent.s3-ap-northeast-1.amazonaws.com/star-rain/brochure3.PNG'
          ),
          this.flexBubble(
            'https://y-line-bot-permanent.s3-ap-northeast-1.amazonaws.com/star-rain/brochure4.PNG'
          ),
          this.flexBubble(
            'https://y-line-bot-permanent.s3-ap-northeast-1.amazonaws.com/star-rain/brochure5.PNG'
          ),
          this.flexBubble(
            'https://y-line-bot-permanent.s3-ap-northeast-1.amazonaws.com/star-rain/brochure6.PNG'
          ),
          this.flexBubble(
            'https://y-line-bot-permanent.s3-ap-northeast-1.amazonaws.com/star-rain/brochure7.PNG'
          ),
          this.flexBubble(
            'https://y-line-bot-permanent.s3-ap-northeast-1.amazonaws.com/star-rain/brochure8.PNG'
          ),
        ],
      },
    };
  }

  private static flexBubble(url: string): FlexBubble {
    return {
      type: 'bubble',
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'image',
            url: url,
            size: 'full',
            aspectMode: 'cover',
            aspectRatio: '3:4',
            gravity: 'top',
          },
        ],
        paddingAll: '0px',
      },
    };
  }
}
