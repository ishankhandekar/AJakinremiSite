// Shared by the projects grid on the home page and the /projects/[slug] pages
export interface Project {
	slug: string;
	title: string;
	description: string;
	// Which placeholder drawing stands in until real screenshots exist
	visual: 'app' | 'topology' | 'metric' | 'terminal';
}

// Copy is drawn from AJ's CV; keep it to claims the CV supports
export const projects: Project[] = [
	{
		slug: 'ssl2ool',
		title: 'SSL2OOL',
		description:
			'A web-based tool that replaces command-line SSL utilities like OpenSSL. Built with Vue.js, Python and FastAPI, it gives developers and IT teams a point-and-click interface for generating certificate signing requests and Java keystores, and for validating SSL certificates.',
		visual: 'app',
	},
	{
		slug: 'linux-environment',
		title: '7-Server Linux Environment',
		description:
			'Designed and deployed a seven-server Linux environment at Global Equity Finance to deliver graphic news content across two floors. Custom Bash scripts and systemd services automate content changes, with Ansible handling configuration management.',
		visual: 'topology',
	},
	{
		slug: 'deployment-automation',
		title: 'Workstation Deployment Automation',
		description:
			'Python automation tools for wide-scale software deployments at Global Equity Finance, which reduced workstation deployment times by 85%.',
		visual: 'metric',
	},
	{
		slug: 'multi-ssh',
		title: 'MULTI-SSH',
		description:
			'A Java and Python tool that runs custom or predefined shell commands across multiple hosts at once over SSH. It centralizes execution and keeps a history of every run with logged results, for troubleshooting and audits.',
		visual: 'terminal',
	},
];
