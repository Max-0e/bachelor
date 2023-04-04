import { PiniaState, PiniaStateTree } from '../base/piniaTypes';
import { CounterStore } from './counter';

export interface CounterState extends PiniaStateTree {
	count: number;
}

export const state: PiniaState<CounterStore> = () => ({ count: 0 });
