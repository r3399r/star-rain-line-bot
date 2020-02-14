import { ClientConfig } from '@line/bot-sdk';

/**
 * channel credentials
 */
export class Channel {
  // For development:
  public static readonly starRainConfig: ClientConfig = {
    channelSecret: '85b6b3042b1befeb6faa60489f64e809',
    channelAccessToken:
      'MC1Xr6xPEyN9K0xRGh/7MIs3ITQBSAW3Tl0cJ1JaoG6A9jfeHhX2Qopn11H5P1cO1bwR8PiSnYH+1LIU0zqjSgAKSW7l1m98tU3aQCGw8iVvoA3z9KHzjHTTLVJ2uieMkPU0T92QkWTX6TGDYF4LYwdB04t89/1O/w1cDnyilFU=',
  };

  // For production: FIX-ME when deploy to production
  // public static readonly helpMeConfig: ClientConfig = {
  //   channelSecret: '85b6b3042b1befeb6faa60489f64e809',
  //   channelAccessToken:
  //     'MC1Xr6xPEyN9K0xRGh/7MIs3ITQBSAW3Tl0cJ1JaoG6A9jfeHhX2Qopn11H5P1cO1bwR8PiSnYH+1LIU0zqjSgAKSW7l1m98tU3aQCGw8iVvoA3z9KHzjHTTLVJ2uieMkPU0T92QkWTX6TGDYF4LYwdB04t89/1O/w1cDnyilFU=',
  // };
}
