import Router from 'express';
import { jiraController } from '../controller/jira.controller';

export function makeJiraRouter() {
	const router = Router();

	router.get('/projects/', jiraController.getProjects);
	router.put('/addApiToken/', jiraController.addJiraAPIToken);
	router.delete('/deleteApiToken/', jiraController.deleteJiraAPIToken);

	return router;
}
