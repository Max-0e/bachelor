import { API_URL } from '@/config';
import { Entity } from '@/intefaces/entity.interface';
import { LinkableEntity } from '@/intefaces/linkable-entity.interface';
import HttpClient from '../utility/http';
import { EntityService } from './entity.service';

export abstract class LinkableEntityService<T> extends EntityService<
	LinkableEntity<T>
> {
	public async link(entityId: string, entityIdToLinkTo: string) {
		return await HttpClient.post<Entity<LinkableEntity<T>>>(
			`${API_URL}/${this.entityName}/link/${entityId}/${entityIdToLinkTo}`,
			{},
			{
				withCredentials: true,
			}
		);
	}
}
