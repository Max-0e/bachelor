import { Entity, EntityCreate } from '@/interfaces/entity.interface';
import { OrganizationBasedEntity } from '@/interfaces/organization-based-entity.interface';

import { OrganizationBasedEntityService } from '@/services/organization-based-entity.service';
import { defineStore, Store } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { EntityState } from './entity.store';
import { useOrganizationStore } from './organization.store';

export interface OrganizationBasedEntityState<T> {
	entities: Entity<OrganizationBasedEntity<T>>[];
	loadedOrganizations: string[];
}

export function getOrganizationBasedEntityStateDefaults<T>() {
	const emptyEntityArray: OrganizationBasedEntity<T>[] = [];
	const loadedOrganizations: string[] = [];
	return { entities: emptyEntityArray, loadedOrganizations };
}

export function defineOrganizationBasedEntityStore<
	T,
	Getters extends { [getter: string]: (...args: any) => any },
	Actions
>(
	storeName: string,
	entityService: OrganizationBasedEntityService<T>,
	state: OrganizationBasedEntityState<T>,
	getters: Getters,
	actions: Actions
) {
	// for some reason pinia doesnt like typeannotations for the state with Generics
	// so we need to convert stateParameter for getters of type EntityState<T> to any
	type PiniaReadyGetters = {
		[Getter in keyof Getters]: (state: any) => ReturnType<Getters[Getter]>;
	};

	return defineStore(storeName, {
		state: (): OrganizationBasedEntityState<T> => state,
		getters: {
			currentEntity(state: OrganizationBasedEntityState<T>) {
				const router = useRouter();
				const currentEntityId =
					router.currentRoute.value.params[storeName + 'Id'];
				return state.entities.find((entity) => entity.id === currentEntityId);
			},
			currentEntitiesFromOrganization(state: OrganizationBasedEntityState<T>) {
				const router = useRouter();
				const currentOrganizationId =
					router.currentRoute.value.params['organizationId'];
				// this does not react to change in entities
				return state.entities.filter(
					(entity) => entity.organizationId === currentOrganizationId
				);
			},
			...(getters as PiniaReadyGetters),
		},
		actions: {
			async loadEntities(
				organizationId: string | undefined = useOrganizationStore()
					.currentEntity?.id
			) {
				if (!organizationId) {
					await Promise.all(
						state.loadedOrganizations.map(
							async (x) => await this.loadEntities(x)
						)
					);
					return;
				}
				const entities = await entityService.getEntities(organizationId);
				state.entities = entities;
				state.loadedOrganizations.push(organizationId);
			},
			async createEntity(
				entityToCreate: EntityCreate<T>,
				organizationId: string | undefined = useOrganizationStore()
					.currentEntity?.id
			) {
				if (!organizationId) return;
				const entity = await entityService.createEntity(
					organizationId,
					entityToCreate
				);
				this.$patch((state) => state.entities.push(ref(entity).value));
				useToast().success('successfully created ' + storeName);
				return entity;
			},
			async createMultipleEntities(
				entitiesToCreate: EntityCreate<T>[],
				organizationId: string | undefined = useOrganizationStore()
					.currentEntity?.id
			) {
				if (!organizationId) return;
				const entities = await entityService.createMultipleEntities(
					organizationId,
					entitiesToCreate
				);
				entities.forEach((entity) =>
					this.$patch((state) => state.entities.push(ref(entity).value))
				);
				useToast().success('successfully created ' + storeName);
				return entities;
			},
			updateEntity(
				entityId: string,
				entityToUpdate: EntityCreate<T>,
				organizationId: string | undefined = useOrganizationStore()
					.currentEntity?.id
			) {
				if (!organizationId) return;
				entityService
					.updateEntity(organizationId, entityId, entityToUpdate)
					.then((entity) => {
						this.updateEntityInState(entity);
						useToast().success('successfully updated ' + storeName);
					});
			},
			updateEntityInState(entity: Entity<OrganizationBasedEntity<T>>) {
				this.$patch((state) => {
					state.entities[this.findEntityIndexInState(entity.id)] =
						ref(entity).value;
				});
			},
			deleteEntity(
				entity: Entity<T>,
				organizationId: string | undefined = useOrganizationStore()
					.currentEntity?.id
			) {
				if (!organizationId) return;
				entityService.deleteEntity(organizationId, entity.id).then((_) => {
					this.deleteEntityInState(entity);
					useToast().success('successfully deleted ' + storeName);
				});
			},
			deleteEntityInState(entity: Entity<T>) {
				this.$patch((state) => {
					state.entities.splice(this.findEntityIndexInState(entity.id), 1);
				});
			},
			findEntityIndexInState(entityId: string) {
				return state.entities.findIndex(
					(entityInState) => entityInState.id === entityId
				);
			},
			...actions,
		},
	});
}

export type OrganizationBasedEntityStore<
	T,
	AdditionalGetters,
	AdditionalActions,
	Id extends string = string
> = Store<
	Id,
	OrganizationBasedEntityState<T> & {
		currentEntity(
			state: EntityState<OrganizationBasedEntity<T>>
		): Entity<OrganizationBasedEntity<T>> | undefined;
		currentEntitiesFromOrganization(
			state: EntityState<OrganizationBasedEntity<T>>
		): Entity<OrganizationBasedEntity<T>>[];
	} & AdditionalGetters & {
			loadEntities(organizationId: string | undefined): Promise<void>;
			createEntity(
				entityToCreate: EntityCreate<OrganizationBasedEntity<T>>,
				organizationId: string | undefined
			): void;
			updateEntity(
				entityId: string,
				entityToUpdate: EntityCreate<OrganizationBasedEntity<T>>,
				organizationId: string | undefined
			): void;
			updateEntityInState(entity: Entity<OrganizationBasedEntity<T>>): void;
			deleteEntity(
				entity: Entity<OrganizationBasedEntity<T>>,
				organizationId: string | undefined
			): void;
			deleteEntityInState(entity: Entity<OrganizationBasedEntity<T>>): void;
			findEntityIndexInState(entityId: string): number;
		} & AdditionalActions
>;
