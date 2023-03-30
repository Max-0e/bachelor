export function sortByString<T>(sortedBy: keyof T): (a: T, b: T) => number {
	return (a: T, b: T) => {
		const val_a = a[sortedBy] as string | undefined;
		const val_b = b[sortedBy] as string | undefined;

		if (!val_a || val_a === '') return 1;
		if (!val_b || val_b === '') return -1;
		return val_a.localeCompare(val_b, undefined, { numeric: true });
	};
}
export function sortByNumber<T>(sortedBy: keyof T): (a: T, b: T) => number {
	return (a: T, b: T) => {
		const val_a = a[sortedBy] as number;
		const val_b = b[sortedBy] as number;

		if (val_a === undefined) return 1;
		if (val_b === undefined) return -1;
		return val_a - val_b;
	};
}
