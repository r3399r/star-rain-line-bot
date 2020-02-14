export let userBindingId: symbol = Symbol('user');
/**
 * user interface in DynamoDB
 */
export interface User {
  userId: string;
  lineBotName: string;
  timestamp: number;
  status: string;
}
