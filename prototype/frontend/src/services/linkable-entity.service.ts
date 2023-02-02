import { API_URL } from '@/config';
import { Entity } from '@/intefaces/entity.interface';
import { LinkableEntity } from '@/intefaces/linkable-entity.interface';
import { OrganizationBasedEntity } from '@/intefaces/organization-based-entity.interface';
import HttpClient from '../utility/http';
import { OrganizationBasedEntityService } from './organization-based-entity.service';

export abstract class LinkableEntityService<
	T
> extends OrganizationBasedEntityService<LinkableEntity<T>> {
	public async link(entityId: string, entityIdToLinkTo: string) {
		return await HttpClient.post<
			Entity<OrganizationBasedEntity<LinkableEntity<T>>>
		>(
			`${API_URL}/${this.entityName}/link/${entityId}/${entityIdToLinkTo}`,
			{},
			{
				withCredentials: true,
			}
		);
	}
}
