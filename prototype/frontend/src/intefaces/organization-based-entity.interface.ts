export interface IOrganizationBasedEntity {
	entityGroupIds: string[];
}

export type OrganizationBasedEntity<T> = IOrganizationBasedEntity & T;
