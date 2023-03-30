import { Entity } from '@/interfaces/base/entity.interface';
import { LinkableEntity } from '@/interfaces/base/linkable-entity.interface';
import { OrganizationBasedEntity } from '@/interfaces/base/organization-based-entity.interface';
import { LinkableEntityService } from '@/services/base/linkable-entity.service';
import { useToast } from 'vue-toastification';
import { useOrganizationStore } from '../organization.store';
import {
	defineOrganizationBasedEntityStore,
	OrganizationBasedEntityState,
	OrganizationBasedEntityStore,
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
		{
			getEntitiesLinkedToEntityGroupId(
				state: OrganizationBasedEntityState<LinkableEntity<T>>
			) {
				return (entityGroupId: string) =>
					state.entities.filter(({ entityGroupIds }) =>
						entityGroupIds.includes(entityGroupId)
					);
			},
			...getters,
		},
		{
			link(
				this: LinkableEntityStore<T>,
				entityId: string,
				entityIdToLinkTo: string,
				organizationId: string | undefined = useOrganizationStore()
					.currentEntity?.id
			) {
				if (!organizationId) return;
				linkableEntityService
					.link(organizationId, entityId, entityIdToLinkTo)
					.then((updatedEntity) => {
						this.updateEntityInState(updatedEntity);
						useToast().success('linked successfully');
					})
					.catch((e) => {
						useToast().error(e.message);
					});
			},
			...actions,
		}
	);
}

export type LinkableEntityStore<
	T,
	AdditionalGetters = {},
	AdditionalActions = {},
	Id extends string = string
> = OrganizationBasedEntityStore<
	LinkableEntity<T>,
	{
		getEntitiesLinkedToEntityGroupId: (
			entityGroupId: string
		) => Entity<OrganizationBasedEntity<LinkableEntity<T>>>[];
	} & AdditionalGetters,
	{
		link: (
			entityId: string,
			entityIdToLinkTo: string,
			organizationId?: string | undefined
		) => void;
	} & AdditionalActions,
	Id
>;
