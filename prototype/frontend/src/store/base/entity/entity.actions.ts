import {
	Entity,
	EntityCreate,
	IEntity,
} from '@/interfaces/base/entity.interface';
import { useToast } from 'vue-toastification';
import { PiniaActionTree, PiniaActions } from '../piniaTypes';
import { EntityStore } from './entity.store';

export interface EntityActions<T extends IEntity> extends PiniaActionTree {
	loadEntities(): Promise<void>;
	createEntity<C = T>(entityToCreate: EntityCreate<C>): void;
	updateEntity(entityId: string, entityToUpdate: EntityCreate<T>): void;
	updateEntityInState(entity: Entity<T>): void;
	deleteEntity(entity: Entity<T>): void;
	deleteEntityInState(entity: Entity<T>): void;
	findEntityIndexInState(entityId: string): number;
}

export const entityActions: PiniaActions<EntityStore<Entity<unknown>>> = {
	async loadEntities() {
		const entities = await this.service.getEntities();
		this.entities = entities;
		this.isLoaded = true;
	},
	createEntity(entityToCreate: EntityCreate<any>) {
		this.service.createEntity(entityToCreate).then((entity) => {
			this.$patch((state) => state.entities.push(entity));
			useToast().success('successfully created ' + this.$id);
		});
	},
	updateEntity(entityId: string, entityToUpdate: EntityCreate<any>) {
		this.service.updateEntity(entityId, entityToUpdate).then((entity) => {
			this.updateEntityInState(entity);
			useToast().success('successfully updated ' + this.$id);
		});
	},
	updateEntityInState(entity: Entity<unknown>) {
		this.entities[this.findEntityIndexInState(entity.id)] = entity;
	},
	deleteEntity(entity: Entity<unknown>) {
		this.service.deleteEntity(entity.id).then((_) => {
			this.deleteEntityInState(entity);
			useToast().success('successfully deleted ' + this.$id);
		});
	},
	deleteEntityInState(entity: Entity<unknown>) {
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

// export const makeEntityActions = <T>(): PiniaActions<EntityStore<Entity<T>>> => {
// 	const actions : PiniaActions<EntityStore<Entity<T>>> = {
// 		async loadEntities() {
// 			const entities = await this.service.getEntities();
// 			this.entities = entities;
// 			this.isLoaded = true;
// 		},
// 		createEntity(entityToCreate: EntityCreate<T>) {
// 			this.service.createEntity(entityToCreate).then((entity) => {
// 				this.$patch((state) => state.entities.push(entity));
// 				useToast().success('successfully created ' + this.$id);
// 			});
// 		},
// 		updateEntity(entityId: string, entityToUpdate: EntityCreate<T>) {
// 			this.service.updateEntity(entityId, entityToUpdate).then((entity) => {
// 				this.updateEntityInState(entity);
// 				useToast().success('successfully updated ' + this.$id);
// 			});
// 		},
// 		updateEntityInState(entity: Entity<T>) {
// 			this.entities[this.findEntityIndexInState(entity.id)] = entity;
// 		},
// 		deleteEntity(entity: Entity<T>) {
// 			this.service.deleteEntity(entity.id).then((_) => {
// 				this.deleteEntityInState(entity);
// 				useToast().success('successfully deleted ' + this.$id);
// 			});
// 		},
// 		deleteEntityInState(entity: Entity<T>) {
// 			this.$patch((state) => {
// 				state.entities.splice(this.findEntityIndexInState(entity.id), 1);
// 			});
// 		},
// 		findEntityIndexInState(entityId: string) {
// 			return this.entities.findIndex(
// 				(entityInState) => entityInState.id === entityId
// 			);
// 		},
// 	};

// 	return actions;
// }
