import { Request, Response } from 'express';
import {
	EntityCreateDto,
	EntityReadDto,
} from '../interfaces/dtos/entityDto.interface';
import { IOrganization } from '../interfaces/organization.interface';
import { entityGroupsService } from '../services/entity-groups.service';
import { levelService } from '../services/level.service';
import { organizationService } from '../services/organization.service';
import { taskService } from '../services/tasks.service';
import sendResponse from '../utility/sendResponse';
import { EntityController } from './base/entity.controller';
import { IdRequest } from './base/organization-based-entity.controller';

class OrganizationController extends EntityController<IOrganization> {
	levelService;
	entityGroupService;
	taskService;
	constructor() {
		super(organizationService);
		this.levelService = levelService;
		this.entityGroupService = entityGroupsService;
		this.taskService = taskService;
		this.deleteEntity = this.deleteEntity.bind(this);
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
				hierarchyLevel: 1,
				organizationId,
			});
			await this.levelService.createEntity({
				name: 'Epics',
				hierarchyLevel: 0,
				organizationId,
			});
		} else {
			await this.levelService.createEntity({
				name: 'Projects',
				hierarchyLevel: 0,
				organizationId,
			});
		}

		return await sendResponse.data<EntityReadDto<IOrganization>>(
			res,
			201,
			this.entityService.mapToDto(createdEntity)
		);
	}
	public override async deleteEntity(
		req: Request<IdRequest>,
		res: Response
	): Promise<Response> {
		const levels = await this.levelService.getOrganizationBasedEntities(
			req.params.id
		);
		for (const level of levels) {
			const groups = await this.entityGroupService.getOrganizationBasedEntities(
				req.params.id
			);

			const groupsInLevel = groups.filter(
				// new ObjectIds are not directly comparable
				(group) => group.levelId.toString() === level.id.toString()
			);
			for (const group of groupsInLevel) {
				const deletedGroup =
					await this.entityGroupService.deleteOrganizationBasedEntityById(
						req.params.id,
						group.id
					);
				const isProject =
					await this.entityGroupService.unlinkOrDeleteRelatedEntities(
						req.params.id,
						deletedGroup
					);

				if (isProject) {
					await this.taskService.deleteAllTasksForProject(group.id);
				}
			}
			await this.levelService.deleteOrganizationBasedEntityById(
				req.params.id,
				level.id
			);
		}

		await this.entityService.deleteEntityById(req.params.id);

		return await sendResponse.message(res, 204, 'success');
	}
}

export const organizationController = new OrganizationController();
