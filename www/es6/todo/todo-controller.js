class TodoController{
	constructor($scope, $ionicModal, projectsService, $ionicSideMenuDelegate, $timeout) {
		this.projectsService = projectsService
		this.$ionicSideMenuDelegate = $ionicSideMenuDelegate
		this.projects = this.projectsService.all()
		this.activeProject = this.projects[this.projectsService.getLastActiveIndex()]
		this.newTaskModal = null

		$ionicModal
			.fromTemplateUrl(
				'new-task.html',
				modal => {
					this.newTaskModal = modal
				},
				{
					scope: $scope,
					animation: 'slide-in-up'
				}
			)

		$timeout(
			() => {
				if (this.projects.length) return

				while (true) {
					const title = prompt('Your first project title:')

					if (!title) continue

					this._createProject(title)

					return
				} 
			},
			1000)
	}

	_createProject(title) {
		let project = this.projectsService.newProject(title)

		this.projects.push(project)
		this.projectsService.save(this.projects)
		this.selectProject(project, this.projects.length - 1)
	}

	newProject() {
		const title = prompt('Project name')

		if (!title) return

		this._createProject(title)
	}

	selectProject(project, index) {
		this.activeProject = project
		this.projectsService.setLastActiveIndex(index)
		this.$ionicSideMenuDelegate.toggleLeft(false)

	}

	createTask(task) {
		if (!this.activeProject) return
		if (!task) return

		this.activeProject.tasks.push({
			title: task.title
		})
		this.newTaskModal.hide()
		this.projectsService.save(this.projects)
		task.title = ''
	}

	newTask() {
		this.newTaskModal.show()
	}

	closeNewTask() {
		this.newTaskModal.hide()
	}

	toggleProjects() {
		this.$ionicSideMenuDelegate.toggleLeft()
	}
}
TodoController.$inject = ['$scope', '$ionicModal', 'ProjectsService', '$ionicSideMenuDelegate', '$timeout']

angular
	.module('todo')
	.controller('TodoController', TodoController)