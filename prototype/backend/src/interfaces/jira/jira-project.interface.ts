export interface JiraGetProjectResponse {
	self: string;
	nextPage: string;
	maxResults: number;
	startAt: number;
	total: number;
	isLast: boolean;
	values: JiraProject[];
}

export interface JiraProject {
	self: string;
	id: string;
	key: string;
	name: string;
	avatarUrls: AvatarUrls;
	projectCategory: {
		self: string;
		id: string;
		name: string;
		description: string;
	};
	simplified: boolean;
	style: string;
	insight: JiraInsight;
}

export interface JiraProjectDetails {
	self: string;
	id: string;
	key: string;
	description: string;
	lead: {
		self: URL;
		key: string;
		accountId: string;
		accountType: string;
		name: string;
		avatarUrls: AvatarUrls;
		displayName: string;
		active: boolean;
	};
	components: [
		{
			self: URL;
			id: string;
			name: string;
			description: string;
			lead: JiraUser;
			assigneeType: string;
			assignee: JiraUser;
			realAssigneeType: string;
			realAssignee: JiraUser;
			isAssigneeTypeValid: boolean;
			project: string;
			projectId: number;
		}
	];
	issueTypes: JiraIssueType[];
	url: string;
	email: string;
	assigneeType: string;
	versions: string[];
	name: string;
	roles: {
		Developers: string;
	};
	avatarUrls: AvatarUrls;
	projectCategory: {
		self: string;
		id: string;
		name: string;
		description: string;
	};
	simplified: boolean;
	style: string;
	properties: {
		[key: string]: string;
	};
	insight: JiraInsight;
}

interface JiraIssueType {
	self: URL;
	id: string;
	description: string;
	iconUrl: URL;
	name: string;
	subtask: boolean;
	avatarId: number;
	hierarchyLevel: number;
	entityId?: string;
	scope?: {
		type: string;
		project: {
			id: string;
			key: string;
			name: string;
		};
	};
}

interface JiraUser {
	self: string;
	key: string;
	accountId: string;
	accountType: string;
	name: '';
	avatarUrls: AvatarUrls;
	displayName: string;
	active: false;
}

interface AvatarUrls {
	'48x48': URL;
	'24x24': URL;
	'16x16': URL;
	'32x32': URL;
}

interface JiraInsight {
	totalIssueCount: number;
	lastIssueUpdateTime: Date;
}
