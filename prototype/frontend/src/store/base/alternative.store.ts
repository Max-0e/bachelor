import { Entity, EntityCreate } from '@/interfaces/base/entity.interface';
import { router } from '@/router';
import { PiniaCustomStateProperties, Store, _GettersTree } from 'pinia';
import { ref } from 'vue';

export interface EntityState<T> {
	entities: Entity<T>[];
	isLoaded: boolean;
}

export function getEntityStateDefaults<T>() {
	const emptyEntityArray: T[] = [];
	return { entities: emptyEntityArray, isLoaded: false };
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

export type EntityStoreDefinition<
	T,
	AdditionalGetters = {},
	AdditionalActions = {},
	Id extends string = string
> = Store<
	Id,
	EntityState<T>,
	EntityGetters<T> & AdditionalGetters,
	{
		loadEntities(): Promise<void>;
		createEntity(entityToCreate: EntityCreate<T>): void;
		updateEntity(entityId: string, entityToUpdate: EntityCreate<T>): void;
		updateEntityInState(entity: Entity<T>): void;
		deleteEntity(entity: Entity<T>): void;
		deleteEntityInState(entity: Entity<T>): void;
		findEntityIndexInState(entityId: string): number;
	} & AdditionalActions
>;

export type EntityGetters<T> = {
	currentEntity(state: EntityState<T>): Entity<T> | undefined;
};

export function makeEntityGetters<T>(
	storeName: string
): _GettersTree<EntityState<T> & PiniaCustomStateProperties<EntityGetters<T>>> {
	return {
		currentEntity(state) {
			const currentEntityId =
				router.currentRoute.value.params[storeName + 'Id'];
			return state.entities.find(
				(entity) => ref(entity).value.id === currentEntityId
			);
		},
	};
}
// export function makeEntityActions<T, AdditionalGetters, AdditionalActions>(
// 	this: EntityStoreDefinition<T, AdditionalGetters, AdditionalActions>,
// 	storeName: string,
// 	entityService: EntityService<T>
// ) {
// 	const state = this.$state;
// 	return {
// 		async loadEntities(
// 			this: EntityStoreDefinition<T, AdditionalGetters, AdditionalActions>
// 		) {
// 			const entities = await entityService.getEntities();
// 			state.entities = ref(entities).value;
// 			state.isLoaded = true;
// 		},
// 		createEntity(
// 			this: EntityStoreDefinition<T, AdditionalGetters, AdditionalActions>,
// 			entityToCreate: EntityCreate<T>
// 		) {
// 			entityService.createEntity(entityToCreate).then((entity) => {
// 				this.$patch((state) => state.entities.push(ref(entity).value));
// 				useToast().success('successfully created ' + storeName);
// 			});
// 		},
// 		updateEntity(
// 			entityId: string,
// 			entityToUpdate: EntityCreate<T>
// 		) {
// 			entityService.updateEntity(entityId, entityToUpdate).then((entity) => {
// 				this.updateEntityInState(entity);
// 				useToast().success('successfully updated ' + storeName);
// 			});
// 		},
// 		updateEntityInState(
// 			this: EntityStoreDefinition<T, AdditionalGetters, AdditionalActions>,
// 			entity: Entity<T>
// 		) {
// 			state.entities[this.findEntityIndexInState(entity.id)] = entity;
// 		},
// 		deleteEntity(
// 			this: EntityStoreDefinition<T, AdditionalGetters, AdditionalActions>,
// 			entity: Entity<T>
// 		) {
// 			entityService.deleteEntity(entity.id).then((_) => {
// 				this.deleteEntityInState(entity);
// 				useToast().success('successfully deleted ' + storeName);
// 			});
// 		},
// 		deleteEntityInState(
// 			this: EntityStoreDefinition<T, AdditionalGetters, AdditionalActions>,
// 			entity: Entity<T>
// 		) {
// 			this.$patch((state) => {
// 				state.entities.splice(this.findEntityIndexInState(entity.id), 1);
// 			});
// 		},
// 		findEntityIndexInState(
// 			this: EntityStoreDefinition<T, AdditionalGetters, AdditionalActions>,
// 			entityId: string
// 		) {
// 			return state.entities.findIndex(
// 				(entityInState) => entityInState.id === entityId
// 			);
// 		},
// 	};
// }
