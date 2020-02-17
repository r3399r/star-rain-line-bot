import { Container } from 'inversify';
import 'reflect-metadata';
import { StarRainService } from 'src/logic/StarRainService';

const container: Container = new Container();

container.bind<StarRainService>(StarRainService).toSelf();

export { container as bindings };
