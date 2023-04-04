import { defineStore, Store, StoreDefinition } from 'pinia';
import { actions, CounterActions } from './actions';
import { CounterGetters, getters } from './getters';
import { CounterState, state } from './state';

export type CounterStore = Store<
	'counter',
	CounterState,
	CounterGetters,
	CounterActions
>;
export type CounterStoreDefinition = StoreDefinition<
	'counter',
	CounterState,
	CounterGetters,
	CounterActions
>;

export const useStore: CounterStoreDefinition = defineStore('counter', {
	state,
	getters,
	actions,
});
