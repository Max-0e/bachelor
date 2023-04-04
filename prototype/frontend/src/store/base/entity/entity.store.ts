import { Entity, IEntity } from '@/interfaces/base/entity.interface';
import { Store, StoreDefinition, defineStore } from 'pinia';
import { EntityActions, entityActions } from './entity.actions';
import { EntityGetters, entityGetters } from './entity.getters';
import { EntityState, entityState } from './entity.state';

export type EntityStore<T extends IEntity, Id extends string = string> = Store<
	Id,
	EntityState<T>,
	EntityGetters<T>,
	EntityActions<T>
>;
export type EntityStoreDefinition<
	T extends IEntity,
	Id extends string = string
> = StoreDefinition<Id, EntityState<T>, EntityGetters<T>, EntityActions<T>>;

export const useStore: EntityStoreDefinition<Entity<unknown>> = defineStore(
	'entity',
	{
		state: entityState,
		getters: entityGetters,
		actions: entityActions,
	}
);
