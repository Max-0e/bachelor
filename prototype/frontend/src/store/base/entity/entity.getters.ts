import { Entity } from '@/interfaces/base/entity.interface';
import { useRouter } from 'vue-router';
import { PiniaGetterTree, PiniaGetters } from '../piniaTypes';
import { EntityState } from './entity.state';
import { EntityStore, isState } from './entity.store';

export interface EntityGetters<T> extends PiniaGetterTree {
	currentEntity(): Entity<T> | undefined;
}

export const makeEntityGetters = <T>() => {
	const getters: PiniaGetters<EntityStore<T>> = {
		currentEntity(state) {
			if (!isState<EntityState<T>>(state)) return;
			const currentEntityId =
				useRouter().currentRoute.value.params[this.$id + 'Id'];
			return state.entities.find((entity) => entity.id === currentEntityId);
		},
	};
	return getters;
};
