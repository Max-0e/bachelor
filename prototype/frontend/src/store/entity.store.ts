import { Entity, EntityCreate } from '@/intefaces/entity.interface';
import { EntityService } from '@/services/entity.service';
import { defineStore } from 'pinia';
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
		getters: getters as PiniaReadyGetters,
		actions: {
			async loadEntities() {
				const entities = await entityService.getEntities();
				state.entities = entities;
				state.isLoaded = true;
			},
			createEntity(entityToCreate: EntityCreate<T>) {
				entityService.createEntity(entityToCreate).then((entity) => {
					state.entities.push(entity);
					useToast().success('successfully created' + storeName);
				});
			},
			updateProject(entityId: string, entityToUpdate: EntityCreate<T>) {
				entityService.updateEntity(entityId, entityToUpdate).then((entity) => {
					this.updateEntityInState(entity);
					useToast().success('successfully updated' + storeName);
				});
			},
			updateEntityInState(entity: Entity<T>) {
				state.entities[
					state.entities.findIndex(
						(entityInState) => entityInState.id === entity.id
					)
				] = ref(entity).value;
			},
			deleteEntity(entity: Entity<T>) {
				entityService.deleteEntity(entity.id).then((_) => {
					this.deleteEntityInState(entity);
					useToast().success('successfully deleted' + storeName);
				});
			},
			deleteEntityInState(entity: Entity<T>) {
				state.entities = state.entities.filter(
					(entityInState) => entityInState !== entity
				);
			},
			...actions,
		},
	});
}
