import { Request, Response } from 'express';
import {
	EntityCreateDto,
	EntityReadDto,
} from '../interfaces/dtos/entityDto.interface';
import { IOrganization } from '../interfaces/organization.interface';
import { levelService } from '../services/level.service';
import { organizationService } from '../services/organization.service';
import sendResponse from '../utility/sendResponse';
import { EntityController } from './entity.controller';

class OrganizationController extends EntityController<IOrganization> {
	levelService;
	constructor() {
		super(organizationService);
		this.levelService = levelService;
	}
	public override async createEntity(
		req: Request<
			{},
			EntityReadDto<IOrganization>,
			EntityCreateDto<IOrganization>
		>,
		res: Response
	) {
		const createdEntity = await this.entityService.createEntity(req.body);
		const organizationId = createdEntity._id;
		if (createdEntity.useEpics) {
			await this.levelService.createEntity({
				name: 'Projects',
				hirarchyLevel: 1,
				organizationId,
			});
			await this.levelService.createEntity({
				name: 'Epics',
				hirarchyLevel: 0,
				organizationId,
			});
		} else {
			await this.levelService.createEntity({
				name: 'Projects',
				hirarchyLevel: 0,
				organizationId,
			});
		}

		return await sendResponse.data<EntityReadDto<IOrganization>>(
			res,
			201,
			this.entityService.mapToDto(createdEntity)
		);
	}
}

export const organizationConroller = new OrganizationController();
