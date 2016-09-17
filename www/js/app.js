'use strict';

angular.module('todo', ['ionic']).run(function ($ionicPlatform) {
  return $ionicPlatform.ready(function () {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
'use strict';

var projectsService = {
	all: function all() {
		var projects = window.localStorage['projects'];

		return projects ? JSON.parse(projects) : [];
	},
	save: function save(projects) {
		window.localStorage['projects'] = JSON.stringify(projects);
	},
	newProject: function newProject(title) {
		return {
			title: title,
			tasks: []
		};
	},
	getLastActiveIndex: function getLastActiveIndex() {
		return parseInt(window.localStorage['lastActiveProject']) || 0;
	},
	setLastActiveIndex: function setLastActiveIndex(index) {
		window.localStorage['lastActiveProject'] = index;
	}
};

angular.module('todo').factory('ProjectsService', function () {
	return projectsService;
});
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TodoController = function () {
	function TodoController($scope, $ionicModal, projectsService, $ionicSideMenuDelegate, $timeout) {
		var _this = this;

		_classCallCheck(this, TodoController);

		this.projectsService = projectsService;
		this.$ionicSideMenuDelegate = $ionicSideMenuDelegate;
		this.projects = this.projectsService.all();
		this.activeProject = this.projects[this.projectsService.getLastActiveIndex()];
		this.newTaskModal = null;

		$ionicModal.fromTemplateUrl('new-task.html', function (modal) {
			_this.newTaskModal = modal;
		}, {
			scope: $scope,
			animation: 'slide-in-up'
		});

		$timeout(function () {
			if (_this.projects.length) return;

			while (true) {
				var title = prompt('Your first project title:');

				if (!title) continue;

				_this._createProject(title);

				return;
			}
		}, 1000);
	}

	_createClass(TodoController, [{
		key: '_createProject',
		value: function _createProject(title) {
			var project = this.projectsService.newProject(title);

			this.projects.push(project);
			this.projectsService.save(this.projects);
			this.selectProject(project, this.projects.length - 1);
		}
	}, {
		key: 'newProject',
		value: function newProject() {
			var title = prompt('Project name');

			if (!title) return;

			this._createProject(title);
		}
	}, {
		key: 'selectProject',
		value: function selectProject(project, index) {
			this.activeProject = project;
			this.projectsService.setLastActiveIndex(index);
			this.$ionicSideMenuDelegate.toggleLeft(false);
		}
	}, {
		key: 'createTask',
		value: function createTask(task) {
			if (!this.activeProject) return;
			if (!task) return;

			this.activeProject.tasks.push({
				title: task.title
			});
			this.newTaskModal.hide();
			this.projectsService.save(this.projects);
			task.title = '';
		}
	}, {
		key: 'newTask',
		value: function newTask() {
			this.newTaskModal.show();
		}
	}, {
		key: 'closeNewTask',
		value: function closeNewTask() {
			this.newTaskModal.hide();
		}
	}, {
		key: 'toggleProjects',
		value: function toggleProjects() {
			this.$ionicSideMenuDelegate.toggleLeft();
		}
	}]);

	return TodoController;
}();

TodoController.$inject = ['$scope', '$ionicModal', 'ProjectsService', '$ionicSideMenuDelegate', '$timeout'];

angular.module('todo').controller('TodoController', TodoController);