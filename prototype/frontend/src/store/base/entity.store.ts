import { Entity, EntityCreate } from '@/interfaces/base/entity.interface';
import { router } from '@/router';
import { EntityService } from '@/services/base/entity.service';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

export interface EntityState<T> {
	entities: Entity<T>[];
	isLoaded: boolean;
}

export function getEntityStateDefaults<T>() {
	const emptyEntityArray: T[] = [];
	return { entities: emptyEntityArray, isLoaded: false };
}

export function defineEntityStore<
	T,
	Getters extends { [getter: string]: (...args: any) => any },
	Actions
>(
	storeName: string,
	entityService: EntityService<T>,
	state: EntityState<T>,
	getters: Getters,
	actions: Actions
) {
	// for some reason pinia doesnt like typeannotations for the state with Generics
	// so we need to convert stateParameter for getters of type EntityState<T> to any
	type PiniaReadyGetters = {
		[Getter in keyof Getters]: (state: any) => ReturnType<Getters[Getter]>;
	};

	return defineStore(storeName, {
		state: (): EntityState<T> => state,
		getters: {
			currentEntity(state: EntityState<T>) {
				const currentEntityId =
					router.currentRoute.value.params[storeName + 'Id'];
				return state.entities.find((entity) => entity.id === currentEntityId);
			},
			...(getters as PiniaReadyGetters),
		},
		actions: {
			async loadEntities() {
				const entities = await entityService.getEntities();
				state.entities = entities;
				state.isLoaded = true;
			},
			createEntity(entityToCreate: EntityCreate<T>) {
				entityService.createEntity(entityToCreate).then((entity) => {
					this.$patch((state) => state.entities.push(ref(entity).value));
					useToast().success('successfully created ' + storeName);
				});
			},
			updateEntity(entityId: string, entityToUpdate: EntityCreate<T>) {
				entityService.updateEntity(entityId, entityToUpdate).then((entity) => {
					this.updateEntityInState(entity);
					useToast().success('successfully updated ' + storeName);
				});
			},
			updateEntityInState(entity: Entity<T>) {
				state.entities[this.findEntityIndexInState(entity.id)] = entity;
			},
			deleteEntity(entity: Entity<T>) {
				entityService.deleteEntity(entity.id).then((_) => {
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

export type EntityStore<T, AdditionalGetters, AdditionalActions> =
	EntityState<T> & {
		currentEntity(state: EntityState<T>): Entity<T> | undefined;
	} & AdditionalGetters & {
			loadEntities(): Promise<void>;
			createEntity(entityToCreate: EntityCreate<T>): void;
			updateEntity(entityId: string, entityToUpdate: EntityCreate<T>): void;
			updateEntityInState(entity: Entity<T>): void;
			deleteEntity(entity: Entity<T>): void;
			deleteEntityInState(entity: Entity<T>): void;
			findEntityIndexInState(entityId: string): number;
		} & AdditionalActions;
