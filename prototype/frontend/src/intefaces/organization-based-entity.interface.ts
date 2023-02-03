export interface IOrganizationBasedEntity {
	organizationId: string;
}

export type OrganizationBasedEntity<T> = IOrganizationBasedEntity & T;
