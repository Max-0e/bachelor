import { JiraIssueStatus } from './jira-issue-status.interface';
import { AvatarUrls, JiraUser } from './jira-project.interface';

export interface JiraIssue {
	expand: string;
	id: string;
	self: string;
	key: string;
	fields: {
		[key: string]: any;
		statuscategorychangedate: Date;
		issuetype: {
			self: string;
			id: string;
			description: string;
			iconUrl: string;
			name: string;
			subtask: boolean;
			avatarId: number;
			entityId: string;
			hierarchyLevel: number;
		};
		parent: {
			id: string;
			key: string;
			self: string;
			fields: {
				summary: string;
				status: {
					self: string;
					description: string;
					iconUrl: string;
					name: string;
					id: string;
					statusCategory: {
						self: string;
						id: number;
						key: string;
						colorName: string;
						name: string;
					};
				};
				priority: {
					self: string;
					iconUrl: string;
					name: string;
					id: string;
				};
				issuetype: {
					self: string;
					id: string;
					description: string;
					iconUrl: string;
					name: string;
					subtask: boolean;
					avatarId: number;
					entityId: string;
					hierarchyLevel: number;
				};
			};
		};
		timespent: null;
		project: {
			self: string;
			id: string;
			key: string;
			name: string;
			projectTypeKey: string;
			simplified: boolean;
			avatarUrls: AvatarUrls;
		};
		fixVersions: string[];
		aggregatetimespent?: number;
		workratio: number;
		lastViewed: Date;
		watches: {
			self: string;
			watchCount: number;
			isWatching: boolean;
		};
		created: Date;
		priority: {
			self: string;
			iconUrl: string;
			name: string;
			id: string;
		};
		labels: string[];
		timeestimate?: number;
		aggregatetimeoriginalestimate: number;
		versions: string[];
		issuelinks: string[];
		assignee: JiraUser;
		updated: Date;
		status: JiraIssueStatus;
		components: any[];
		timeoriginalestimate: number;
		description?: any | string;
		aggregatetimeestimate: number;
		summary: string;
		creator: JiraUser;
		subtasks: JiraIssue[];
		reporter: JiraUser;
		aggregateprogress: {
			progress: number;
			total: number;
		};
		duedate: Date;
		progress: {
			progress: number;
			total: number;
		};
		votes: {
			self: string;
			votes: number;
			hasVoted: boolean;
		};
	};
}
