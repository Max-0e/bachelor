import { LinkableEntity } from '@/intefaces/linkable-entity.interface';
import { OrganizationBasedEntity } from '@/intefaces/organization-based-entity.interface';
import { LinkableEntityService } from '@/services/linkable-entity.service';
import { EntityStore } from './entity.store';
import {
	defineOrganizationBasedEntityStore,
	OrganizationBasedEntityState,
} from './organization-based-entity.store';

export function defineLinkableEntityStore<
	T,
	Getters extends { [getter: string]: (...args: any) => any },
	Actions
>(
	storeName: string,
	linkableEntityService: LinkableEntityService<T>,
	state: OrganizationBasedEntityState<LinkableEntity<T>>,
	getters: Getters,
	actions: Actions
) {
	return defineOrganizationBasedEntityStore(
		storeName,
		linkableEntityService,
		state,
		getters,
		{
			link(
				this: EntityStore<OrganizationBasedEntity<LinkableEntity<T>>>,
				entityId: string,
				entityIdToLinkTo: string
			) {
				linkableEntityService
					.link(entityId, entityIdToLinkTo)
					.then((updatedEntity) => this.updateEntityInState(updatedEntity));
			},
			...actions,
		}
	);
}
