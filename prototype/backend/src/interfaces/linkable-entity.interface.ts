export type ILinkableEntity = {
	entityGroupIds: string[];
};
export type LinkableEntity<T> = {
	entityGroupIds: string[];
} & T;
