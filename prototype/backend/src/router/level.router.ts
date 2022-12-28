import { levelController } from '../controller/level.controller';
import { ILevel } from '../interfaces/level.interface';
import { makeEntityRouter } from './entity.router';

export function makeLevelRouter() {
    const router = makeEntityRouter<ILevel>(levelController);

    return router;
}
