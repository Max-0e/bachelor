import { LinkableEntity } from '@/intefaces/linkable-entity.interface';
import { LinkableEntityService } from '@/services/linkable-entity.service';
import { defineEntityStore, EntityState, EntityStore } from './entity.store';

export function defineLinkableEntityStore<
	T,
	Getters extends { [getter: string]: (...args: any) => any },
	Actions
>(
	storeName: string,
	linkableEntityService: LinkableEntityService<T>,
	state: EntityState<LinkableEntity<T>>,
	getters: Getters,
	actions: Actions
) {
	return defineEntityStore(storeName, linkableEntityService, state, getters, {
		link(
			this: EntityStore<LinkableEntity<T>>,
			entityId: string,
			entityIdToLinkTo: string
		) {
			linkableEntityService
				.link(entityId, entityIdToLinkTo)
				.then((updatedEntity) => this.updateEntityInState(updatedEntity));
		},
		...actions,
	});
}
