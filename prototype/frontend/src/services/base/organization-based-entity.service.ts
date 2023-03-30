import { Entity, EntityCreate } from '@/interfaces/base/entity.interface';
import { OrganizationBasedEntity } from '@/interfaces/base/organization-based-entity.interface';
import { API_URL } from '../../config';
import HttpClient from '../../utility/http';

export abstract class OrganizationBasedEntityService<T> {
	public readonly entityName: string;

	constructor(entityName: string) {
		this.entityName = entityName;
		this.getEntities = this.getEntities.bind(this);
		this.getEntityById = this.getEntityById.bind(this);
		this.createEntity = this.createEntity.bind(this);
		this.updateEntity = this.updateEntity.bind(this);
		this.deleteEntity = this.deleteEntity.bind(this);
	}

	public async getEntities(organizationId: string) {
		return await HttpClient.get<Entity<OrganizationBasedEntity<T>>[]>(
			`${API_URL}/organization/${this.entityName}/${organizationId}`,
			{ withCredentials: true }
		);
	}

	public async getEntityById(organizationId: string, entityId: string) {
		return await HttpClient.get<Entity<OrganizationBasedEntity<T>>>(
			`${API_URL}/organization/${this.entityName}/${organizationId}/${entityId}`,
			{ withCredentials: true }
		);
	}

	public async createEntity(
		organizationId: string,
		entityCreate: EntityCreate<T>
	) {
		return await HttpClient.post<Entity<OrganizationBasedEntity<T>>>(
			`${API_URL}/organization/${this.entityName}/${organizationId}/`,
			entityCreate,
			{ withCredentials: true }
		);
	}
	public async createMultipleEntities(
		organizationId: string,
		entitiesToCreate: EntityCreate<T>[]
	) {
		return await HttpClient.post<Entity<OrganizationBasedEntity<T>>[]>(
			`${API_URL}/organization/${this.entityName}/${organizationId}/multiple`,
			entitiesToCreate,
			{ withCredentials: true }
		);
	}

	public async updateEntity(
		organizationId: string,
		entityId: string,
		entityUpdate: EntityCreate<T>
	) {
		return await HttpClient.put<Entity<OrganizationBasedEntity<T>>>(
			`${API_URL}/organization/${this.entityName}/${organizationId}/${entityId}`,
			entityUpdate,
			{ withCredentials: true }
		);
	}

	public async deleteEntity(organizationId: string, entityId: string) {
		return await HttpClient.delete<void>(
			`${API_URL}/organization/${this.entityName}/${organizationId}/${entityId}`,
			{ withCredentials: true }
		);
	}
}
