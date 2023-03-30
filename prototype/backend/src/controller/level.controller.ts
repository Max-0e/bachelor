import { Request, Response } from 'express';
import { ILevel } from '../interfaces/level.interface';
import { entityGroupsService } from '../services/entity-groups.service';
import { levelService } from '../services/level.service';
import { taskService } from '../services/tasks.service';

import sendResponse from '../utility/sendResponse';
import {
	IdRequest,
	OrganizationBasedEntityController,
	OrganizationIdRequest,
} from './organization-based-entity.controller';

class LevelController extends OrganizationBasedEntityController<ILevel> {
	entityGroupService;
	taskService;
	constructor() {
		super(levelService);
		this.deleteEntity = this.deleteEntity.bind(this);
		this.entityGroupService = entityGroupsService;
		this.taskService = taskService;
	}
	public override async deleteEntity(
		req: Request<OrganizationIdRequest & IdRequest>,
		res: Response
	): Promise<Response> {
		const groups = await this.entityGroupService.getOrganizationBasedEntities(
			req.params.organizationId
		);

		const groupsInLevel = groups.filter(
			// new ObjectId is not directly comparable to the given Id
			(group) => group.levelId.toString() === req.params.id
		);
		for (const group of groupsInLevel) {
			const deletedGroup =
				await this.entityGroupService.deleteOrganizationBasedEntityById(
					req.params.organizationId,
					group.id
				);
			const isProject =
				await this.entityGroupService.unlinkOrDeleteRelatedEntities(
					req.params.organizationId,
					deletedGroup
				);
			if (isProject) {
				await this.taskService.deleteAllTasksForProject(group.id);
			}
		}

		await this.entityService.deleteOrganizationBasedEntityById(
			req.params.organizationId,
			req.params.id
		);

		return await sendResponse.message(res, 204, 'success');
	}
}

export const levelController = new LevelController();
