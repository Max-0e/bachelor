import { PiniaGetters, PiniaGetterTree } from '../base/piniaTypes';
import { CounterStore } from './counter';

export interface CounterGetters extends PiniaGetterTree {
	doubleCount(): number;
	offsetCount(): (offset: number) => number;
	offsetDoubleCount(): (offset: number) => number;
}

export const getters: PiniaGetters<CounterStore> = {
	doubleCount(state) {
		return state.count * 2;
	},
	offsetCount(state) {
		return (amount) => state.count + amount;
	},
	offsetDoubleCount() {
		return (amount) => this.doubleCount + amount;
	},
};
