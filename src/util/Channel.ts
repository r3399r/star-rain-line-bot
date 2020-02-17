import { ClientConfig } from '@line/bot-sdk';

/**
 * channel credentials
 */
export class Channel {
  // For development:
  public static readonly starRainConfig: ClientConfig = {
    channelSecret: '52828d14e9549e7d9ac3a5e5bd5ac6af',
    channelAccessToken:
      'u0ZZFRWK+W08NGzgwYRpNBcJHyNPpJlAq6SZ0RP2jrwKsn5+hDXo7UIcm3dRMb1hkE6+0RXchqtguabsQi6A8NACQs5kL6cfZq3R3iv2tkzasF5gzgRt70wGM+L3dPO2w7LhGbtzrV9ALHaETC4ghAdB04t89/1O/w1cDnyilFU=',
  };

  // For production: FIX-ME when deploy to production
  // public static readonly helpMeConfig: ClientConfig = {
  //   channelSecret: '52828d14e9549e7d9ac3a5e5bd5ac6af',
  //   channelAccessToken:
  //     'u0ZZFRWK+W08NGzgwYRpNBcJHyNPpJlAq6SZ0RP2jrwKsn5+hDXo7UIcm3dRMb1hkE6+0RXchqtguabsQi6A8NACQs5kL6cfZq3R3iv2tkzasF5gzgRt70wGM+L3dPO2w7LhGbtzrV9ALHaETC4ghAdB04t89/1O/w1cDnyilFU=',
  // };
}
