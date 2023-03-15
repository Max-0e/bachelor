import Router from 'express';
import { jiraController } from '../controller/jira.controller';

export function makeJiraRouter() {
	const router = Router();

	router.get('/projects/', jiraController.getProjects);
	router.get('/projects/:projectKey/', jiraController.getProjectDetails);
	router.get(
		'/projects/:projectKey/issues',
		jiraController.getAllIssuesForProject
	);
	router.get(
		'/projects/:projectId/statuses',
		jiraController.getIssueStatusesForProject
	);
	router.put('/addApiToken/', jiraController.addJiraAPIToken);
	router.delete('/deleteApiToken/', jiraController.deleteJiraAPIToken);

	return router;
}
