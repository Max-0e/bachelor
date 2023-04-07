import { LinkableEntity } from '@/interfaces/base/linkable-entity.interface';
import { LinkableEntityService } from '@/services/base/linkable-entity.service';
import { LinkableEntityStore } from '../linkable-entity.store';
import { OrganizationBasedEntityState } from '../organization-based-entity/organization-based-entity.state';
import { PiniaState } from '../piniaTypes';

export interface LinkableEntityState<T>
	extends OrganizationBasedEntityState<LinkableEntity<T>> {
	service: LinkableEntityService<T>;
}

export const makeLinkableEntityState =
	<T>(
		entityService: LinkableEntityService<T>
	): PiniaState<LinkableEntityStore<T>> =>
	() => ({
		loadedOrganizations: [],
		entities: [],
		service: entityService,
	});
