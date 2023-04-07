import { Entity } from '@/interfaces/base/entity.interface';
import { OrganizationBasedEntity } from '@/interfaces/base/organization-based-entity.interface';
import { OrganizationBasedEntityService } from '@/services/base/organization-based-entity.service';
import { PiniaState, PiniaStateTree } from '../piniaTypes';
import { OrganizationBasedEntityStore } from './organization-based-entity.store';

export interface OrganizationBasedEntityState<T> extends PiniaStateTree {
	loadedOrganizations: string[];
	entities: Entity<OrganizationBasedEntity<T>>[];
	service: OrganizationBasedEntityService<T>;
}

export const makeOrganizationBasedEntityState =
	<T>(
		entityService: OrganizationBasedEntityService<T>
	): PiniaState<OrganizationBasedEntityStore<T>> =>
	() => ({
		loadedOrganizations: [],
		entities: [],
		service: entityService,
	});
