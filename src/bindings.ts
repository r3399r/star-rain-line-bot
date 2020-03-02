import { DynamoDB } from 'aws-sdk';
import { Container } from 'inversify';
import 'reflect-metadata';
import { DbService } from 'src/logic/DbService';
import { StarRainService } from 'src/logic/StarRainService';

const container: Container = new Container();

container.bind<DbService>(DbService).toSelf();
container.bind<StarRainService>(StarRainService).toSelf();
container.bind<DynamoDB>(DynamoDB).toDynamicValue(() => new DynamoDB());

export { container as bindings };
