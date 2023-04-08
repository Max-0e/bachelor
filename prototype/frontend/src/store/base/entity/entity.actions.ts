import { Entity, EntityCreate } from '@/interfaces/base/entity.interface';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { PiniaActionTree, PiniaActions } from '../piniaTypes';
import { EntityState } from './entity.state';
import { EntityStore, isState } from './entity.store';

export interface EntityActions<T> extends PiniaActionTree {
	loadEntities(): Promise<void>;
	createEntity(entityToCreate: EntityCreate<T>): void;
	updateEntity(entityId: string, entityToUpdate: EntityCreate<T>): void;
	updateEntityInState(entity: Entity<T>): void;
	deleteEntity(entity: Entity<T>): void;
	deleteEntityInState(entity: Entity<T>): void;
	findEntityIndexInState(entityId: string): number;
}

export const makeEntityActions = <T>() => {
	const actions: PiniaActions<EntityStore<T>> = {
		async loadEntities() {
			const entities = await this.service.getEntities();
			this.entities = entities;
			this.isLoaded = true;
		},
		createEntity(entityToCreate: EntityCreate<T>) {
			this.service.createEntity(entityToCreate).then((entity) => {
				this.$patch((state) => {
					if (!isState<EntityState<T>>(state)) return;
					state.entities.push(entity);
				});
				useToast().success('successfully created ' + this.$id);
			});
		},
		updateEntity(entityId: string, entityToUpdate: EntityCreate<T>) {
			this.service.updateEntity(entityId, entityToUpdate).then((entity) => {
				this.updateEntityInState(entity);
				useToast().success('successfully updated ' + this.$id);
			});
		},
		updateEntityInState(entity: Entity<T>) {
			this.entities[this.findEntityIndexInState(entity.id)] = ref(entity).value;
		},
		deleteEntity(entity: Entity<T>) {
			this.service.deleteEntity(entity.id).then((_) => {
				this.deleteEntityInState(entity);
				useToast().success('successfully deleted ' + this.$id);
			});
		},
		deleteEntityInState(entity: Entity<T>) {
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
