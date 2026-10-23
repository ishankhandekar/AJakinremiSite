import type { ImageMetadata } from 'astro';
import ssl2oolShot from '../assets/projects/ssl2ool.webp';

// Shared by the projects grid on the home page and the /projects/[slug] pages
export interface Project {
	slug: string;
	title: string;
	description: string;
	// Which placeholder drawing stands in until real screenshots exist
	visual: 'app' | 'terminal';
	// The full screenshot, for the project's own page
	image?: ImageMetadata;
	// A close crop of one panel, shown on the card in place of the drawing
	crop?: ImageMetadata;
	// A live recreation of part of the app, shown on the card in place of the drawing
	demo?: 'key-engine';
}

// Copy is drawn from AJ's CV; keep it to claims the CV supports
export const projects: Project[] = [
	{
		slug: 'ssl2ool',
		title: 'SSL2OOL',
		description:
			'A web-based tool that replaces command-line SSL utilities like OpenSSL. Built with Vue.js, Python and FastAPI, it gives developers and IT teams a point-and-click interface for generating certificate signing requests and Java keystores, and for validating SSL certificates.',
		visual: 'app',
		image: ssl2oolShot,
		demo: 'key-engine',
	},
	{
		slug: 'multi-ssh',
		title: 'MULTI-SSH',
		description:
			'A Java and Python tool that runs custom or predefined shell commands across multiple hosts at once over SSH. It centralizes execution and keeps a history of every run with logged results, for troubleshooting and audits.',
		visual: 'terminal',
	},
];
