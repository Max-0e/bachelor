import { API_URL } from '@/config';
import { Entity } from '@/interfaces/base/entity.interface';
import { LinkableEntity } from '@/interfaces/base/linkable-entity.interface';
import { OrganizationBasedEntity } from '@/interfaces/base/organization-based-entity.interface';
import HttpClient from '../../utility/http';
import { OrganizationBasedEntityService } from './organization-based-entity.service';

export abstract class LinkableEntityService<
	T
> extends OrganizationBasedEntityService<LinkableEntity<T>> {
	public async link(
		organizationId: string,
		entityId: string,
		entityIdToLinkTo: string
	) {
		return await HttpClient.post<
			Entity<OrganizationBasedEntity<LinkableEntity<T>>>
		>(
			`${API_URL}/organization/${this.entityName}/${organizationId}/link/${entityId}/${entityIdToLinkTo}`,
			{},
			{
				withCredentials: true,
			}
		);
	}
}
