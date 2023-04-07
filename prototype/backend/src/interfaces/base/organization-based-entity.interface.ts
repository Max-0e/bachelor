export type IOrganizationBasedEntity = {
	organizationId: string;
};
export type OrganizationBasedEntity<T> = IOrganizationBasedEntity & T;
