import { ClientConfig } from '@line/bot-sdk';

/**
 * channel credentials
 */
export class Channel {
  // For #:
  //public static readonly starRainConfig: ClientConfig = {
  //  channelSecret: '52828d14e9549e7d9ac3a5e5bd5ac6af',
  //  channelAccessToken:
  //    'u0ZZFRWK+W08NGzgwYRpNBcJHyNPpJlAq6SZ0RP2jrwKsn5+hDXo7UIcm3dRMb1hkE6+0RXchqtguabsQi6A8NACQs5kL6cfZq3R3iv2tkzasF5gzgRt70wGM+L3dPO2w7LhGbtzrV9ALHaETC4ghAdB04t89/1O/w1cDnyilFU=',
  //};

  // For dev
  public static readonly starRainConfig: ClientConfig = {
    channelSecret: 'bc30d5b9ed25d57253701f6e5cf3590b',
    channelAccessToken:
      'GgOY1rbxFk74UrKKLKpyVzqRhXAb1Tm0JNGaC29HI0sXo4WxFQmUoNJ2P6q5WuGeh40dE/kHJFWKWdh0x0eug39hkHT7DOU8llA9CKeofKr7a4dFlLfLBGYRmxc/tW5khLTou3Gkx73MtdEBqInpugdB04t89/1O/w1cDnyilFU=',
  };

  // For production: FIX-ME when deploy to production
  // public static readonly helpMeConfig: ClientConfig = {
  //   channelSecret: '52828d14e9549e7d9ac3a5e5bd5ac6af',
  //   channelAccessToken:
  //     'u0ZZFRWK+W08NGzgwYRpNBcJHyNPpJlAq6SZ0RP2jrwKsn5+hDXo7UIcm3dRMb1hkE6+0RXchqtguabsQi6A8NACQs5kL6cfZq3R3iv2tkzasF5gzgRt70wGM+L3dPO2w7LhGbtzrV9ALHaETC4ghAdB04t89/1O/w1cDnyilFU=',
  // };
}
