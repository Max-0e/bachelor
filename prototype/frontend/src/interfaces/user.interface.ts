export interface User {
	id: string;
	username: string;
	email: string;
	jiraApiToken?: string;
	jiraApiDomain?: string;
	jiraApiMail?: string;
}
