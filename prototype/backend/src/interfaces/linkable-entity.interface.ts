export type ILinkableEntity = {
	entityGroupIds: string[];
};
export type LinkableEntity<T> = ILinkableEntity & T;
