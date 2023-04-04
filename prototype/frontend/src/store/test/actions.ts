import { PiniaActions, PiniaActionTree } from '../base/piniaTypes';
import { CounterStore } from './counter';

export interface CounterActions extends PiniaActionTree {
	increment(amount: number): void;
}

export const actions: PiniaActions<CounterStore> = {
	increment(amount) {
		this.count += amount;
	},
};
