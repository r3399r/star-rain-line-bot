import { DynamoDB, S3 } from 'aws-sdk';
import { Container } from 'inversify';
import 'reflect-metadata';
import { DbService } from 'src/logic/DbService';
import { HelpMeService } from 'src/logic/HelpMeService';

const container: Container = new Container();

container.bind<DbService>(DbService).toSelf();
container.bind<HelpMeService>(HelpMeService).toSelf();

// AWS services
container.bind<DynamoDB>(DynamoDB).toDynamicValue(() => new DynamoDB());
container.bind<S3>(S3).toDynamicValue(() => new S3());

export { container as bindings };
