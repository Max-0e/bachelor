import { LinkableEntity } from '@/interfaces/base/linkable-entity.interface';
import { useOrganizationStore } from '@/store/organization.store';
import { useToast } from 'vue-toastification';
import {
	OrganizationBasedEntityActions,
	makeOrganizationBasedEntityActions,
} from '../organization-based-entity/organization-based-entity.action';
import { PiniaActions } from '../piniaTypes';
import { LinkableEntityStore } from './linkable-entity.store';

export interface LinkableEntityActions<T>
	extends OrganizationBasedEntityActions<LinkableEntity<T>> {
	link: (
		entityId: string,
		entityIdToLinkTo: string,
		organizationId?: string | undefined
	) => void;
}

export const makeLinkableEntityActions = <T>() => {
	const actions: PiniaActions<LinkableEntityStore<T>> = {
		link(
			entityId: string,
			entityIdToLinkTo: string,
			organizationId: string | undefined = useOrganizationStore().currentEntity
				?.id
		) {
			if (!organizationId) return;
			this.service
				.link(organizationId, entityId, entityIdToLinkTo)
				.then((updatedEntity) => {
					this.updateEntityInState(updatedEntity);
					useToast().success('linked successfully');
				})
				.catch((e) => {
					useToast().error(e.message);
				});
		},
		...makeOrganizationBasedEntityActions<LinkableEntity<T>>(),
	};

	return actions;
};
