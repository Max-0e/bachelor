export interface JiraIssueField {
	id: string;
	name: string;
	custom: boolean;
	orderable: boolean;
	navigable: boolean;
	searchable: boolean;
	clauseNames: string[];
	schema: {
		type?: string;
		system: string;
	};
}
