import { Entity } from '@/interfaces/base/entity.interface';
import { router } from '@/router';
import { PiniaGetterTree, PiniaGetters } from '../piniaTypes';
import { EntityStore } from './entity.store';

export interface EntityGetters<T> extends PiniaGetterTree {
	currentEntity(): Entity<T> | undefined;
}

export const makeEntityGetters = <T>() => {
	// TODO: fix types
	// for some reason not using an absolute type breaks the state-parameter from the the PiniaGetters-type
	// that is injected into the getter functions resulting in a heavily complex union type
	// @ts-ignore
	const getters: PiniaGetters<EntityStore<T>> = {
		currentEntity(state) {
			const currentEntityId = router.currentRoute.value.params[this.$id + 'Id'];
			return (state.entities as Entity<T>[]).find(
				(entity) => entity.id === currentEntityId
			);
		},
	};
	return getters;
};
