import { IEpicDto } from '../interfaces/dtos/epicDto.interface';
import { IEpic } from '../interfaces/epic.interface';
import { EpicModel } from '../models/epic.model';
import { EntityService } from './entity.service';

class EpicService extends EntityService<IEpic, IEpicDto> {
    constructor () {
		super(EpicModel)
	}
}

export default new EpicService();
