import { Entity, EntityCreate } from '@/interfaces/entity.interface';
import { API_URL } from '../config';
import HttpClient from '../utility/http';

export abstract class EntityService<T> {
	public readonly entityName: string;

	constructor(entityName: string) {
		this.entityName = entityName;
		this.getEntities = this.getEntities.bind(this);
		this.getEntityById = this.getEntityById.bind(this);
		this.createEntity = this.createEntity.bind(this);
		this.updateEntity = this.updateEntity.bind(this);
		this.deleteEntity = this.deleteEntity.bind(this);
	}

	public async getEntities() {
		return await HttpClient.get<Entity<T>[]>(`${API_URL}/${this.entityName}`, {
			withCredentials: true,
		});
	}

	public async getEntityById(entityId: string) {
		return await HttpClient.get<Entity<T>>(
			`${API_URL}/${this.entityName}/${entityId}`,
			{ withCredentials: true }
		);
	}

	public async createEntity(entityCreate: EntityCreate<T>) {
		return await HttpClient.post<Entity<T>>(
			`${API_URL}/${this.entityName}/`,
			entityCreate,
			{ withCredentials: true }
		);
	}

	public async updateEntity(entityId: string, entityUpdate: EntityCreate<T>) {
		return await HttpClient.put<Entity<T>>(
			`${API_URL}/${this.entityName}/${entityId}`,
			entityUpdate,
			{ withCredentials: true }
		);
	}

	public async deleteEntity(entityId: string) {
		return await HttpClient.delete<void>(
			`${API_URL}/${this.entityName}/${entityId}`,
			{ withCredentials: true }
		);
	}
}
