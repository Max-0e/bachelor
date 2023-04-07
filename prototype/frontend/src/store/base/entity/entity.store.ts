import { Store, StoreDefinition } from 'pinia';
import { EntityActions } from './entity.actions';
import { EntityGetters } from './entity.getters';
import { EntityState } from './entity.state';

export type EntityStore<T, Id extends string = string> = Store<
	Id,
	EntityState<T>,
	EntityGetters<T>,
	EntityActions<T>
>;
export type EntityStoreDefinition<
	T,
	Id extends string = string
> = StoreDefinition<Id, EntityState<T>, EntityGetters<T>, EntityActions<T>>;
