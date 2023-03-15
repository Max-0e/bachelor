export interface JiraIssue {
	expand: '';
	id: '10002';
	self: 'https://your-domain.atlassian.net/rest/api/2/issue/10002';
	key: 'ED-1';
	fields: {
		watcher: {
			self: 'https://your-domain.atlassian.net/rest/api/2/issue/EX-1/watchers';
			isWatching: false;
			watchCount: 1;
			watchers: [
				{
					self: 'https://your-domain.atlassian.net/rest/api/2/user?accountId=5b10a2844c20165700ede21g';
					accountId: '5b10a2844c20165700ede21g';
					displayName: 'Mia Krystof';
					active: false;
				}
			];
		};
		attachment: [
			{
				id: 10001;
				self: 'https://your-domain.atlassian.net/rest/api/2/attachments/10001';
				filename: 'debuglog.txt';
				author: {
					self: 'https://your-domain.atlassian.net/rest/api/2/user?accountId=5b10a2844c20165700ede21g';
					key: '';
					accountId: '5b10a2844c20165700ede21g';
					accountType: 'atlassian';
					name: '';
					avatarUrls: {
						'48x48': 'https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=48&s=48';
						'24x24': 'https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=24&s=24';
						'16x16': 'https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=16&s=16';
						'32x32': 'https://avatar-management--avatars.server-location.prod.public.atl-paas.net/initials/MK-5.png?size=32&s=32';
					};
					displayName: 'Mia Krystof';
					active: false;
				};
				created: '2023-03-13T08:04:05.634+0000';
				size: 2460;
				mimeType: 'text/plain';
				content: 'https://your-domain.atlassian.net/jira/rest/api/3/attachment/content/10001';
			}
		];
		'sub-tasks': [
			{
				id: '10000';
				type: {
					id: '10000';
					name: '';
					inward: 'Parent';
					outward: 'Sub-task';
				};
				outwardIssue: {
					id: '10003';
					key: 'ED-2';
					self: 'https://your-domain.atlassian.net/rest/api/2/issue/ED-2';
					fields: {
						status: {
							iconUrl: 'https://your-domain.atlassian.net/images/icons/statuses/open.png';
							name: 'Open';
						};
					};
				};
			}
		];
		description: 'Main order flow broken';
		project: {
			self: 'https://your-domain.atlassian.net/rest/api/2/project/EX';
			id: '10000';
			key: 'EX';
			name: 'Example';
			avatarUrls: {
				'48x48': 'https://your-domain.atlassian.net/secure/projectavatar?size=large&pid=10000';
				'24x24': 'https://your-domain.atlassian.net/secure/projectavatar?size=small&pid=10000';
				'16x16': 'https://your-domain.atlassian.net/secure/projectavatar?size=xsmall&pid=10000';
				'32x32': 'https://your-domain.atlassian.net/secure/projectavatar?size=medium&pid=10000';
			};
			projectCategory: {
				self: 'https://your-domain.atlassian.net/rest/api/2/projectCategory/10000';
				id: '10000';
				name: 'FIRST';
				description: 'First Project Category';
			};
			simplified: false;
			style: 'classic';
			insight: {
				totalIssueCount: 100;
				lastIssueUpdateTime: '2023-03-13T08:04:05.633+0000';
			};
		};
		comment: [
			{
				self: 'https://your-domain.atlassian.net/rest/api/2/issue/10010/comment/10000';
				id: '10000';
				author: {
					self: 'https://your-domain.atlassian.net/rest/api/2/user?accountId=5b10a2844c20165700ede21g';
					accountId: '5b10a2844c20165700ede21g';
					displayName: 'Mia Krystof';
					active: false;
				};
				body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget venenatis elit. Duis eu justo eget augue iaculis fermentum. Sed semper quam laoreet nisi egestas at posuere augue semper.';
				updateAuthor: {
					self: 'https://your-domain.atlassian.net/rest/api/2/user?accountId=5b10a2844c20165700ede21g';
					accountId: '5b10a2844c20165700ede21g';
					displayName: 'Mia Krystof';
					active: false;
				};
				created: '2021-01-17T12:34:00.000+0000';
				updated: '2021-01-18T23:45:00.000+0000';
				visibility: {
					type: 'role';
					value: 'Administrators';
					identifier: 'Administrators';
				};
			}
		];
		issuelinks: [
			{
				id: '10001';
				type: {
					id: '10000';
					name: 'Dependent';
					inward: 'depends on';
					outward: 'is depended by';
				};
				outwardIssue: {
					id: '10004L';
					key: 'PR-2';
					self: 'https://your-domain.atlassian.net/rest/api/2/issue/PR-2';
					fields: {
						status: {
							iconUrl: 'https://your-domain.atlassian.net/images/icons/statuses/open.png';
							name: 'Open';
						};
					};
				};
			},
			{
				id: '10002';
				type: {
					id: '10000';
					name: 'Dependent';
					inward: 'depends on';
					outward: 'is depended by';
				};
				inwardIssue: {
					id: '10004';
					key: 'PR-3';
					self: 'https://your-domain.atlassian.net/rest/api/2/issue/PR-3';
					fields: {
						status: {
							iconUrl: 'https://your-domain.atlassian.net/images/icons/statuses/open.png';
							name: 'Open';
						};
					};
				};
			}
		];
		worklog: [
			{
				self: 'https://your-domain.atlassian.net/rest/api/2/issue/10010/worklog/10000';
				author: {
					self: 'https://your-domain.atlassian.net/rest/api/2/user?accountId=5b10a2844c20165700ede21g';
					accountId: '5b10a2844c20165700ede21g';
					displayName: 'Mia Krystof';
					active: false;
				};
				updateAuthor: {
					self: 'https://your-domain.atlassian.net/rest/api/2/user?accountId=5b10a2844c20165700ede21g';
					accountId: '5b10a2844c20165700ede21g';
					displayName: 'Mia Krystof';
					active: false;
				};
				comment: 'I did some work here.';
				updated: '2021-01-18T23:45:00.000+0000';
				visibility: {
					type: 'group';
					value: 'jira-developers';
					identifier: '276f955c-63d7-42c8-9520-92d01dca0625';
				};
				started: '2021-01-17T12:34:00.000+0000';
				timeSpent: '3h 20m';
				timeSpentSeconds: 12000;
				id: '100028';
				issueId: '10002';
			}
		];
		updated: 1;
		timetracking: {
			originalEstimate: '10m';
			remainingEstimate: '3m';
			timeSpent: '6m';
			originalEstimateSeconds: 600;
			remainingEstimateSeconds: 200;
			timeSpentSeconds: 400;
		};
	};
}
