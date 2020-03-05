import { ClientConfig } from '@line/bot-sdk';

/**
 * channel credentials
 */
export class Channel {
  // For dev
  public static readonly starRainConfig: ClientConfig = {
    channelSecret: 'bc30d5b9ed25d57253701f6e5cf3590b',
    channelAccessToken:
      'GgOY1rbxFk74UrKKLKpyVzqRhXAb1Tm0JNGaC29HI0sXo4WxFQmUoNJ2P6q5WuGeh40dE/kHJFWKWdh0x0eug39hkHT7DOU8llA9CKeofKr7a4dFlLfLBGYRmxc/tW5khLTou3Gkx73MtdEBqInpugdB04t89/1O/w1cDnyilFU=',
  };

  // For production: FIX-ME when deploy to production
  // public static readonly starRainConfig: ClientConfig = {
  //   channelSecret: '6184c72a4b44bede83ae31984b9b5bd9',
  //   channelAccessToken:
  //     'h8oqFkGDcGvHRusHIsVhRSHXaNYegYQ2TX4/fhd+L+fE44MEk6vmynt2NDsUJWRSc2x5iwqvjQYe3wkU6c4MkI0W2iL4zZ8q+RRQNW06/xf3oyFkc5O/RvJoKYrE8AgPBvwMugdFXUWBpX0YiKQUAgdB04t89/1O/w1cDnyilFU=',
  // };
}
