import { defineStore, Store, StoreDefinition } from 'pinia';
import { PiniaStore } from '../base/piniaTypes';
import { actions, CounterActions } from './actions';
import { CounterGetters, getters } from './getters';
import { CounterState, state } from './state';

interface ExtendedCounterState extends CounterState {
	currencySymbol: string;
}

interface ExtendedCounterGetters extends CounterGetters {
	countWithCurrency(): string;
}

type ExtendedCounterStore = Store<
	'extendedCounterStore',
	ExtendedCounterState,
	ExtendedCounterGetters,
	CounterActions
>;
type ExtendedCounterStoreDefinition = StoreDefinition<
	'extendedCounterStore',
	ExtendedCounterState,
	ExtendedCounterGetters,
	CounterActions
>;

const extendedStore: PiniaStore<ExtendedCounterStore> = {
	state: () => ({ ...state(), currencySymbol: '$' }),
	getters: {
		...getters,
		countWithCurrency(state) {
			return `${state.count} ${state.currencySymbol}`;
		},
	},
	actions: {
		...actions,
	},
};

export const useExtendedCounter: ExtendedCounterStoreDefinition = defineStore(
	'extendedCounterStore',
	extendedStore
);
