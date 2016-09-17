const projectsService = {
	all: () => {
		const projects = window.localStorage['projects']

		return projects ? JSON.parse(projects) : []
	},
	save: (projects) => {
		window.localStorage['projects'] = JSON.stringify(projects)
	},
	newProject: (title) => ({
		title,
		tasks: []
	}),
	getLastActiveIndex: () => parseInt(window.localStorage['lastActiveProject']) || 0,
	setLastActiveIndex: (index) => {
		window.localStorage['lastActiveProject'] = index
	} 
}

angular
	.module('todo')
	.factory('ProjectsService', () => projectsService)