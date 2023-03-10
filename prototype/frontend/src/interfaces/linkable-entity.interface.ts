export interface ILinkableEntity {
	entityGroupIds: string[];
}

export type LinkableEntity<T> = ILinkableEntity & T;
