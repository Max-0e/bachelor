export interface JiraIssueStatusResponse {
	self: string;
	nextPage: string;
	maxResults: number;
	startAt: number;
	total: number;
	isLast: boolean;
	values: JiraIssueStatus[];
}
export interface JiraIssueStatus {
	id: string;
	name: string;
	statusCategory: string;
	scope: {
		type: string;
		project: {
			id: string;
		};
	};
	description: string;
	usages: {
		project: {
			id: string;
		};
		issueTypes: [string];
	}[];
}
