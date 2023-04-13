export interface UserDto {
	id: string;
	username: string;
	email: string;
	jiraApiToken?: string;
	jiraApiDomain?: string;
	jiraApiMail?: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - username
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         jiraApiToken:
 *           type: string
 *           description: The user's Jira API Token
 *         jiraApiDomain:
 *           type: string
 *           description: The user's Jira API Domain
 *         jiraApiMail:
 *           type: string
 *           description: The user's Jira API Mail
 *       example:
 *         id: 63db88dae89f6366bcd8f797
 *         username: John Doe
 *         email: john@doe.com
 *         jiraApiToken: SDfSczi45aS-aDaK8rT3OzpeR
 *         jiraApiDomain: dowjohn
 *         jiraApiMail: johndoe@jira.com
 */
