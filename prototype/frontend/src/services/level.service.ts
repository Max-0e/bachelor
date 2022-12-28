import { ILevel } from "@/intefaces/level.interface";
import { EntityService } from "./entity.service";

class LevelService extends EntityService<ILevel>{
}

export const levelService = new LevelService('level');
