export interface UserDto {
	id: string;
	username: string;
	email: string;
	jiraApiToken?: string;
	jiraApiDomain?: string;
	jiraApiMail?: string;
}
