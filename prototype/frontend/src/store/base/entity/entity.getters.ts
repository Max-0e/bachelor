import { Entity, IEntity } from '@/interfaces/base/entity.interface';
import { router } from '@/router';
import { PiniaGetterTree, PiniaGetters } from '../piniaTypes';
import { EntityStore } from './entity.store';

export interface EntityGetters<T extends IEntity> extends PiniaGetterTree {
	currentEntity(): T | undefined;
}

export const entityGetters: PiniaGetters<EntityStore<Entity<unknown>>> = {
	currentEntity(state) {
		const currentEntityId = router.currentRoute.value.params[this.$id + 'Id'];
		return state.entities.find((entity) => entity.id === currentEntityId);
	},
};
