import { Entity, EntityCreate } from '@/interfaces/base/entity.interface';
import { OrganizationBasedEntity } from '@/interfaces/base/organization-based-entity.interface';
import { useOrganizationStore } from '@/store/organization.store';
import { UnwrapRef, ref } from 'vue';
import { useToast } from 'vue-toastification';
import { PiniaActionTree, PiniaActions } from '../piniaTypes';
import { OrganizationBasedEntityStore } from './organization-based-entity.store';

export interface OrganizationBasedEntityActions<T> extends PiniaActionTree {
	loadEntities(organizationId?: string): Promise<void>;
	createEntity(entityToCreate: EntityCreate<T>, organizationId?: string): void;
	updateEntity(
		entityId: string,
		entityToUpdate: EntityCreate<OrganizationBasedEntity<T>>,
		organizationId?: string
	): void;
	updateEntityInState(entity: Entity<OrganizationBasedEntity<T>>): void;
	deleteEntity(
		entity: Entity<OrganizationBasedEntity<T>>,
		organizationId?: string
	): void;
	deleteEntityInState(entity: Entity<OrganizationBasedEntity<T>>): void;
	findEntityIndexInState(entityId: string): number;
}

export const makeOrganizationBasedEntityActions = <T>() => {
	const actions: PiniaActions<OrganizationBasedEntityStore<T>> = {
		async loadEntities(
			organizationId: string | undefined = useOrganizationStore().currentEntity
				?.id
		) {
			if (!organizationId) {
				await Promise.all(
					this.loadedOrganizations.map(async (x) => await this.loadEntities(x))
				);
				return;
			}
			const entities = await this.service.getEntities(organizationId);
			this.$patch((state) => {
				state.entities = (
					state.entities as UnwrapRef<Entity<OrganizationBasedEntity<T>>[]>
				).concat(ref(entities).value);
				state.loadedOrganizations.push(organizationId);
			});
		},
		async createEntity(
			entityToCreate: EntityCreate<T>,
			organizationId: string | undefined = useOrganizationStore().currentEntity
				?.id
		) {
			if (!organizationId) return;
			const entity = await this.service.createEntity(
				organizationId,
				entityToCreate
			);
			this.$patch((state) => state.entities.push(ref(entity).value));
			useToast().success('successfully created ' + this.$id);
			return entity;
		},
		async createMultipleEntities(
			entitiesToCreate: EntityCreate<T>[],
			organizationId: string | undefined = useOrganizationStore().currentEntity
				?.id
		) {
			if (!organizationId) return;
			const entities = await this.service.createMultipleEntities(
				organizationId,
				entitiesToCreate
			);
			entities.forEach((entity) =>
				this.$patch((state) => state.entities.push(ref(entity).value))
			);
			useToast().success('successfully created ' + this.$id);
			return entities;
		},
		updateEntity(
			entityId: string,
			entityToUpdate: EntityCreate<T>,
			organizationId: string | undefined = useOrganizationStore().currentEntity
				?.id
		) {
			if (!organizationId) return;
			this.service
				.updateEntity(organizationId, entityId, entityToUpdate)
				.then((entity) => {
					this.updateEntityInState(entity);
					useToast().success('successfully updated ' + this.$id);
				});
		},
		updateEntityInState(entity: Entity<OrganizationBasedEntity<T>>) {
			this.$patch((state) => {
				state.entities[this.findEntityIndexInState(entity.id)] =
					ref(entity).value;
			});
		},
		deleteEntity(
			entity: Entity<OrganizationBasedEntity<T>>,
			organizationId: string | undefined = useOrganizationStore().currentEntity
				?.id
		) {
			if (!organizationId) return;
			this.service.deleteEntity(organizationId, entity.id).then((_) => {
				this.deleteEntityInState(entity);
				useToast().success('successfully deleted ' + this.$id);
			});
		},
		deleteEntityInState(entity: Entity<OrganizationBasedEntity<T>>) {
			this.$patch((state) => {
				state.entities.splice(this.findEntityIndexInState(entity.id), 1);
			});
		},
		findEntityIndexInState(entityId: string) {
			return this.entities.findIndex(
				(entityInState) => entityInState.id === entityId
			);
		},
	};

	return actions;
};
