// // (types)
// interface CountStoreState {
// 	count: number;
// }

// interface CountStoreGetters {
// 	doubleCount: (state: CountStoreState) => number;
// 	quadrupleCount: (this: CountStoreStateAndGetters) => number;
// }

// type CountStoreComputedGetters = {
// 	[Getter in keyof CountStoreGetters]: ReturnType<CountStoreGetters[Getter]>;
// };

// type CountStoreStateAndGetters = CountStoreState & CountStoreComputedGetters; // (2)

// type CountStore = ReturnType<typeof useCountStore>;

// // (getters)

// const doubleCount = (state: CountStoreState): number => state.count * 2;

// function quadrupleCount(this: CountStoreStateAndGetters): number {
// 	return this.doubleCount * 2;
// }

// // (actions)

// // function increaseCount(this: CountStore, increment: number): void {
// // 	this.count += increment;
// // }

// // function increaseCountTwofold(this: CountStore): void {
// // 	this.increaseCount(this.count);
// // }

// // (store)

// const state = (): CountStoreState => ({
// 	count: 5,
// });

// const getters: CountStoreGetters = {
// 	doubleCount,
// 	quadrupleCount,
// };

// // const actions = {
// // 	increaseCount,
// // 	increaseCountTwofold,
// // };

// export const useCountStore = defineStore('count', {
// 	state: state,
// 	getters: { ...getters },
// 	// actions,
// });
