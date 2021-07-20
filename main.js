/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/layout.js":
/*!***********************!*\
  !*** ./src/layout.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function loadHeader() {
	const header = document.createElement("header");
	const title = document.createElement("div");

	title.textContent = "To-Do List";
	header.appendChild(title);

	return header;
}

function loadProjects() {
	const projects = document.createElement("div");
	const title = document.createElement("h2");
	const list = document.createElement("div");
	projects.setAttribute("id", "projects-container");
	title.setAttribute("id", "projects-title");
	list.setAttribute("id", "list");
	title.textContent = "Projects";
	projects.appendChild(title);
	projects.appendChild(list);

	return projects;
}

function loadSidebar() {
	const container = document.createElement("div");
	container.setAttribute("id", "sidebar");

	container.appendChild(loadProjects());

	return container;
}

function loadContent() {
	const content = document.createElement("div");
	const name = document.createElement("h1");
	const description = document.createElement("h2");
	const addTodo = document.createElement("button");

	content.setAttribute("id", "content");
	name.setAttribute("id", "content-name");
	description.setAttribute("id", "content-description");
	addTodo.setAttribute("id", "add-todo");

	addTodo.textContent = "Add Todo";

	content.appendChild(name);
	content.appendChild(description);
	content.appendChild(addTodo);

	return content;
}

function contentContainer() {
	const container = document.createElement("div");
	container.setAttribute("id", "content-container");
	container.appendChild(loadSidebar());
	container.appendChild(loadContent());

	return container;
}

function loadFooter() {
	const footer = document.createElement("footer");

	return footer;
}

function loadLayout() {
	const main = document.createElement("div");
	main.setAttribute("id", "main");

	main.appendChild(loadHeader());
	main.appendChild(contentContainer());
	main.appendChild(loadFooter());

	return main;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (loadLayout);


/***/ }),

/***/ "./src/modal.js":
/*!**********************!*\
  !*** ./src/modal.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function form() {
	const projectForm = document.createElement("form");
	const projectName = document.createElement("input");
	const projectDescription = document.createElement("textarea");
	const enter = document.createElement("input");

	projectForm.setAttribute("id", "project-form");
	projectName.setAttribute("id", "project-name");
	projectDescription.setAttribute("id", "project-description");
	enter.setAttribute("id", "enter");

	projectForm.setAttribute("required", "required");
	projectName.setAttribute("type", "text");
	projectName.setAttribute("required", "required");
	enter.setAttribute("type", "submit");

	projectName.setAttribute("maxlength", "10");
	projectDescription.setAttribute("maxlength", "50");

	projectName.setAttribute("placeholder", "Name");
	projectDescription.setAttribute("placeholder", "Description");
	enter.textContent = "Enter";

	projectForm.appendChild(projectName);
	projectForm.appendChild(projectDescription);
	projectForm.appendChild(enter);

	return projectForm;
}

function addModal() {
	const mainDiv = document.querySelector("#main");
	const modal = document.createElement("div");
	const modalOverlay = document.createElement("div");
	const closeBtn = document.createElement("button");
	closeBtn.setAttribute("id", "close-btn");

	closeBtn.textContent = "X";
	modal.setAttribute("id", "modal");
	modalOverlay.setAttribute("id", "modal-overlay");
	modal.classList.add("modal", "closed");
	modalOverlay.classList.add("modal-overlay", "closed");

	closeBtn.addEventListener("click", () => {
		modalOverlay.classList.toggle("closed");
		modal.classList.toggle("closed");
	});

	modal.appendChild(closeBtn);
	modal.appendChild(form());
	mainDiv.appendChild(modal);
	mainDiv.appendChild(modalOverlay);
}

function addProjectButton(id) {
	const container = document.querySelector(`#${id}`);
	const button = document.createElement("button");
	button.textContent = "+ Add Project";

	container.appendChild(button);
	addModal();

	button.addEventListener("click", () => {
		const modal = document.querySelector("#modal");
		const modalOverlay = document.querySelector("#modal-overlay");
		modalOverlay.classList.toggle("closed");
		modal.classList.toggle("closed");
	});

	return container;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (addProjectButton);


/***/ }),

/***/ "./src/project.js":
/*!************************!*\
  !*** ./src/project.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


// formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true });

class Project {
	constructor(projectName, description, list) {
		this.projectName = projectName;
		this.description = description;
		this.list = list;
	}

	getName() {
		return this.projectName;
	}

	getDescription() {
		return this.description;
	}

	setName(n) {
		return (this.name = n);
	}

	setDescription(n) {
		return (this.description = n);
	}

	getList() {
		return this.list;
	}

	addList(n) {
		this.list.push(n);
	}
}

class Todo {
	constructor(todoName, date, priority) {
		this.todoName = todoName;
		this.date = date;
		this.priority = priority;
	}

	getName() {
		return this.todoName;
	}

	setName(n) {
		return (this.todoName = n);
	}

	getPriority() {
		return this.priority;
	}

	setPriority(n) {
		return (this.priority = n);
	}
}

const projectModule = (() => {
	let projectArray = [];
	let todoArray = [];

	function saveToStorage() {
		localStorage.setItem("project", projectArray);
		localStorage.setItem("todo", todoArray);
	}

	function deleteAll() {
		const list = document.querySelector("#list");
		const project = document.querySelectorAll(".project");
		for (let i = 0; i < project.length; i++) {
			list.removeChild(project[i]);
		}
	}

	function clearContent() {
		const name = document.querySelector("#content-name");
		const description = document.querySelector("#content-description");
		name.textContent = "";
		description.textContent = "";
	}

	function projectDom() {
		const list = document.querySelector("#list");
		deleteAll();
		for (let i = 0; i < projectArray.length; i++) {
			const project = document.createElement("div");
			const name = document.createElement("div");
			const exit = document.createElement("button");
			exit.classList.add("project-exit");
			project.classList.add("project");

			exit.textContent = "X";
			exit.addEventListener("click", (e) => {
				e.stopPropagation();
				deleteProject(i);
			});

			project.addEventListener("click", () => {
				openProject(i);
				selectProject(i);
			});

			name.textContent = projectArray[i].getName();
			project.append(name);
			project.append(exit);
			list.append(project);
		}
	}

	function addProject(id) {
		const form = document.querySelector(`#${id}`);
		form.addEventListener("submit", (e) => {
			e.preventDefault();
			const modalOverlay = document.querySelector("#modal-overlay");
			const modal = document.querySelector("#modal");
			modalOverlay.classList.toggle("closed");
			modal.classList.toggle("closed");

			const projectTitle = document.querySelector("#project-name");
			const projectDescription = document.querySelector("#project-description");

			let temp = projectTitle.value;
			temp = new Project(projectTitle.value, projectDescription.value, []);
			projectArray.push(temp);
			saveToStorage();

			projectDom();
			console.log({ projectArray });
		});
	}

	function deleteProject(i) {
		const exit = document.querySelectorAll(".project-exit");
		const name = document.querySelector("#content-name");
		projectArray.splice(i, 1);
		clearContent();
		deleteAll();
		projectDom();
		clearList();
	}

	function openProject(i) {
		const name = document.querySelector("#content-name");
		const description = document.querySelector("#content-description");
		if (projectArray.length === 0) {
			clearContent();
		}
		name.textContent = projectArray[i].getName();
		description.textContent = projectArray[i].getDescription();
	}

	function addTodo(id) {
		const addTodo = document.querySelector(`#${id}`);
		addTodo.addEventListener("click", popup);
	}
	let index = -1;
	function selectProject(i) {
		const project = document.querySelectorAll(".project");
		if (index === -1) {
			project[i].style.cssText = "background-color: lightblue";
		} else if (projectArray[index] === undefined) {
			index = i;
		} else if (index !== i) {
			project[index].style.cssText = "background-color: transparent";
		}

		index = i;
		setIndex(i);
		project[i].style.cssText = "background-color: lightblue";
	}

	let selectedIndex = -1;
	function setIndex(i) {
		selectedIndex = i;
	}

	function dropdown() {
		const priorityList = document.createElement("select");
		const high = document.createElement("option");
		const medium = document.createElement("option");
		const low = document.createElement("option");

		priorityList.setAttribute("id", "priority");

		high.setAttribute("value", "high");
		medium.setAttribute("value", "medium");
		low.setAttribute("value", "low");

		high.textContent = "high";
		medium.textContent = "medium";
		low.textContent = "low";

		priorityList.appendChild(high);
		priorityList.appendChild(medium);
		priorityList.appendChild(low);

		return priorityList;
	}

	function popup() {
		const addTodo = document.querySelector(`#add-todo`);
		const content = document.querySelector("#content");
		const inputContainer = document.createElement("div");
		const textbox = document.createElement("input");
		const priorityList = dropdown();

		const add = document.createElement("button");
		const cancel = document.createElement("button");

		textbox.setAttribute("id", "textbox");
		inputContainer.setAttribute("id", "todo-prompt");
		add.textContent = "Add";
		cancel.textContent = "Cancel";

		add.addEventListener("click", () => {
			addButton();
			clear();
			addTodo.addEventListener("click", popup);
		});

		cancel.addEventListener("click", () => {
			clear();
			addTodo.addEventListener("click", popup);
		});

		inputContainer.appendChild(textbox);
		inputContainer.appendChild(priorityList);
		inputContainer.appendChild(add);
		inputContainer.appendChild(cancel);
		content.appendChild(inputContainer);
		addTodo.removeEventListener("click", popup);
	}

	function addButton() {
		const textbox = document.querySelector("#textbox");
		const priority = document.querySelector("#priority");
		let temp = new Todo(textbox.value, "00/00/00", priority.value);
		projectArray[selectedIndex].addList(temp);
		todoArray.push(temp);
		saveToStorage();

		clearList();
		todoDOM();
	}

	let projectTodoList = [];
	function todoDOM() {
		projectTodoList = projectArray[selectedIndex].getList();
		console.log(projectTodoList);
		for (let i = 0; i < projectTodoList.length; i++) {
			const content = document.querySelector("#content");
			const todoItemContainer = document.createElement("div");
			const checkContainer = document.createElement("div");
			const todoItem = document.createElement("div");
			const exit = document.createElement("button");
			const check = document.createElement("input");
			const edit = document.createElement("button");
			const date = document.createElement("input");

			date.setAttribute("type", "date");
			edit.classList.add("edit-todo");
			edit.textContent = "*";
			exit.classList.add("exit-todo");
			exit.textContent = "X";
			check.setAttribute("type", "checkbox");
			check.classList.add("check-todo");
			checkContainer.classList.add("check-container");
			todoItemContainer.classList.add("todo-item-container");
			todoItem.textContent = projectTodoList[i].getName();

			edit.addEventListener("click", () => {
				editTodo(i);
			});

			exit.addEventListener("click", () => {
				removeItem(i);
			});

			if (projectTodoList[i].getPriority() === "high") {
				todoItemContainer.style.cssText = "background-color: red;";
			} else if (projectTodoList[i].getPriority() === "medium") {
				todoItemContainer.style.cssText = "background-color: orange;";
			} else {
				todoItemContainer.style.cssText = "background-color: yellow;";
			}

			checkContainer.appendChild(check);
			checkContainer.appendChild(todoItem);
			todoItemContainer.appendChild(checkContainer);
			todoItemContainer.appendChild(edit);
			todoItemContainer.appendChild(date);
			todoItemContainer.appendChild(exit);
			content.appendChild(todoItemContainer);
		}
		sort(projectTodoList);
	}

	function sort() {
		console.log(projectTodoList);
		let sortList = [];
		for (let i = 0; i < projectTodoList.length; i++) {
			if (projectTodoList[i].getPriority() == "high") {
				sortList.push(i);
			}
		}

		for (let i = 0; i < projectTodoList.length; i++) {
			if (projectTodoList[i].getPriority() == "medium") {
				sortList.push(i);
			}
		}

		for (let i = 0; i < projectTodoList.length; i++) {
			if (projectTodoList[i].getPriority() == "low") {
				sortList.push(i);
			}
		}
		projectTodoList = sortList;

		return projectTodoList;
	}

	function editTodo(i) {
		const addTodo = document.querySelector(`#add-todo`);
		const content = document.querySelector("#content");
		const inputContainer = document.createElement("div");
		const textbox = document.createElement("input");
		const edit = document.createElement("button");
		const cancel = document.createElement("button");
		const priorityList = dropdown();

		textbox.setAttribute("id", "textbox");
		inputContainer.setAttribute("id", "todo-prompt");
		edit.textContent = "Edit";
		cancel.textContent = "Cancel";

		edit.addEventListener("click", () => {
			const priority = document.querySelector("#priority");
			let todo = projectArray[selectedIndex].getList();
			console.log(todo);
			let selected = todo[i];
			selected.setName(textbox.value);
			console.log(selected);
			if (priority.value === "high") {
				todo[i].setPriority("high");
			} else if (priority.value === "medium") {
				todo[i].setPriority("medium");
			} else {
				todo[i].setPriority("low");
			}

			console.log(priority.value);
			console.log(selected);
			sort();
			clear();
			clearList();
			todoDOM();

			addTodo.addEventListener("click", popup);
		});

		cancel.addEventListener("click", () => {
			clear();
			addTodo.addEventListener("click", popup);
		});

		inputContainer.appendChild(textbox);
		inputContainer.appendChild(priorityList);
		inputContainer.appendChild(edit);
		inputContainer.appendChild(cancel);
		content.appendChild(inputContainer);
		addTodo.removeEventListener("click", popup);
	}

	function removeItem(i) {
		let projectTodoList = projectArray[selectedIndex].getList();
		projectTodoList.splice(i, 1);
		clearList();
		todoDOM();
	}

	function clearList() {
		const content = document.querySelector("#content");
		const todoItemContainer = document.querySelectorAll(".todo-item-container");
		for (let i = 0; i < todoItemContainer.length; i++) {
			content.removeChild(todoItemContainer[i]);
		}
	}

	function clear() {
		const content = document.querySelector("#content");
		const todoPrompt = document.querySelector("#todo-prompt");
		content.removeChild(todoPrompt);
	}

	return { addProject, addTodo, projectArray };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (projectModule);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _layout_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layout.js */ "./src/layout.js");
/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal.js */ "./src/modal.js");
/* harmony import */ var _project_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./project.js */ "./src/project.js");




function loadPage() {
	document.body.appendChild((0,_layout_js__WEBPACK_IMPORTED_MODULE_0__.default)());
}

loadPage();
(0,_modal_js__WEBPACK_IMPORTED_MODULE_1__.default)("projects-container");
_project_js__WEBPACK_IMPORTED_MODULE_2__.default.addProject("project-form");
_project_js__WEBPACK_IMPORTED_MODULE_2__.default.addTodo("add-todo");

console.log("hellodas!");

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbGF5b3V0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2RhbC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpRUFBZSxVQUFVLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQy9FMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7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ZGVyKCkge1xuXHRjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaGVhZGVyXCIpO1xuXHRjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cblx0dGl0bGUudGV4dENvbnRlbnQgPSBcIlRvLURvIExpc3RcIjtcblx0aGVhZGVyLmFwcGVuZENoaWxkKHRpdGxlKTtcblxuXHRyZXR1cm4gaGVhZGVyO1xufVxuXG5mdW5jdGlvbiBsb2FkUHJvamVjdHMoKSB7XG5cdGNvbnN0IHByb2plY3RzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0Y29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG5cdGNvbnN0IGxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRwcm9qZWN0cy5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInByb2plY3RzLWNvbnRhaW5lclwiKTtcblx0dGl0bGUuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJwcm9qZWN0cy10aXRsZVwiKTtcblx0bGlzdC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImxpc3RcIik7XG5cdHRpdGxlLnRleHRDb250ZW50ID0gXCJQcm9qZWN0c1wiO1xuXHRwcm9qZWN0cy5hcHBlbmRDaGlsZCh0aXRsZSk7XG5cdHByb2plY3RzLmFwcGVuZENoaWxkKGxpc3QpO1xuXG5cdHJldHVybiBwcm9qZWN0cztcbn1cblxuZnVuY3Rpb24gbG9hZFNpZGViYXIoKSB7XG5cdGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInNpZGViYXJcIik7XG5cblx0Y29udGFpbmVyLmFwcGVuZENoaWxkKGxvYWRQcm9qZWN0cygpKTtcblxuXHRyZXR1cm4gY29udGFpbmVyO1xufVxuXG5mdW5jdGlvbiBsb2FkQ29udGVudCgpIHtcblx0Y29uc3QgY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdGNvbnN0IG5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG5cdGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuXHRjb25zdCBhZGRUb2RvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblxuXHRjb250ZW50LnNldEF0dHJpYnV0ZShcImlkXCIsIFwiY29udGVudFwiKTtcblx0bmFtZS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImNvbnRlbnQtbmFtZVwiKTtcblx0ZGVzY3JpcHRpb24uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJjb250ZW50LWRlc2NyaXB0aW9uXCIpO1xuXHRhZGRUb2RvLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiYWRkLXRvZG9cIik7XG5cblx0YWRkVG9kby50ZXh0Q29udGVudCA9IFwiQWRkIFRvZG9cIjtcblxuXHRjb250ZW50LmFwcGVuZENoaWxkKG5hbWUpO1xuXHRjb250ZW50LmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uKTtcblx0Y29udGVudC5hcHBlbmRDaGlsZChhZGRUb2RvKTtcblxuXHRyZXR1cm4gY29udGVudDtcbn1cblxuZnVuY3Rpb24gY29udGVudENvbnRhaW5lcigpIHtcblx0Y29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0Y29udGFpbmVyLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiY29udGVudC1jb250YWluZXJcIik7XG5cdGNvbnRhaW5lci5hcHBlbmRDaGlsZChsb2FkU2lkZWJhcigpKTtcblx0Y29udGFpbmVyLmFwcGVuZENoaWxkKGxvYWRDb250ZW50KCkpO1xuXG5cdHJldHVybiBjb250YWluZXI7XG59XG5cbmZ1bmN0aW9uIGxvYWRGb290ZXIoKSB7XG5cdGNvbnN0IGZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb290ZXJcIik7XG5cblx0cmV0dXJuIGZvb3Rlcjtcbn1cblxuZnVuY3Rpb24gbG9hZExheW91dCgpIHtcblx0Y29uc3QgbWFpbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdG1haW4uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJtYWluXCIpO1xuXG5cdG1haW4uYXBwZW5kQ2hpbGQobG9hZEhlYWRlcigpKTtcblx0bWFpbi5hcHBlbmRDaGlsZChjb250ZW50Q29udGFpbmVyKCkpO1xuXHRtYWluLmFwcGVuZENoaWxkKGxvYWRGb290ZXIoKSk7XG5cblx0cmV0dXJuIG1haW47XG59XG5cbmV4cG9ydCBkZWZhdWx0IGxvYWRMYXlvdXQ7XG4iLCJmdW5jdGlvbiBmb3JtKCkge1xuXHRjb25zdCBwcm9qZWN0Rm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpO1xuXHRjb25zdCBwcm9qZWN0TmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcblx0Y29uc3QgcHJvamVjdERlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIpO1xuXHRjb25zdCBlbnRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcblxuXHRwcm9qZWN0Rm9ybS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInByb2plY3QtZm9ybVwiKTtcblx0cHJvamVjdE5hbWUuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJwcm9qZWN0LW5hbWVcIik7XG5cdHByb2plY3REZXNjcmlwdGlvbi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInByb2plY3QtZGVzY3JpcHRpb25cIik7XG5cdGVudGVyLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiZW50ZXJcIik7XG5cblx0cHJvamVjdEZvcm0uc2V0QXR0cmlidXRlKFwicmVxdWlyZWRcIiwgXCJyZXF1aXJlZFwiKTtcblx0cHJvamVjdE5hbWUuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInRleHRcIik7XG5cdHByb2plY3ROYW1lLnNldEF0dHJpYnV0ZShcInJlcXVpcmVkXCIsIFwicmVxdWlyZWRcIik7XG5cdGVudGVyLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJzdWJtaXRcIik7XG5cblx0cHJvamVjdE5hbWUuc2V0QXR0cmlidXRlKFwibWF4bGVuZ3RoXCIsIFwiMTBcIik7XG5cdHByb2plY3REZXNjcmlwdGlvbi5zZXRBdHRyaWJ1dGUoXCJtYXhsZW5ndGhcIiwgXCI1MFwiKTtcblxuXHRwcm9qZWN0TmFtZS5zZXRBdHRyaWJ1dGUoXCJwbGFjZWhvbGRlclwiLCBcIk5hbWVcIik7XG5cdHByb2plY3REZXNjcmlwdGlvbi5zZXRBdHRyaWJ1dGUoXCJwbGFjZWhvbGRlclwiLCBcIkRlc2NyaXB0aW9uXCIpO1xuXHRlbnRlci50ZXh0Q29udGVudCA9IFwiRW50ZXJcIjtcblxuXHRwcm9qZWN0Rm9ybS5hcHBlbmRDaGlsZChwcm9qZWN0TmFtZSk7XG5cdHByb2plY3RGb3JtLmFwcGVuZENoaWxkKHByb2plY3REZXNjcmlwdGlvbik7XG5cdHByb2plY3RGb3JtLmFwcGVuZENoaWxkKGVudGVyKTtcblxuXHRyZXR1cm4gcHJvamVjdEZvcm07XG59XG5cbmZ1bmN0aW9uIGFkZE1vZGFsKCkge1xuXHRjb25zdCBtYWluRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtYWluXCIpO1xuXHRjb25zdCBtb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdGNvbnN0IG1vZGFsT3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdGNvbnN0IGNsb3NlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblx0Y2xvc2VCdG4uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJjbG9zZS1idG5cIik7XG5cblx0Y2xvc2VCdG4udGV4dENvbnRlbnQgPSBcIlhcIjtcblx0bW9kYWwuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJtb2RhbFwiKTtcblx0bW9kYWxPdmVybGF5LnNldEF0dHJpYnV0ZShcImlkXCIsIFwibW9kYWwtb3ZlcmxheVwiKTtcblx0bW9kYWwuY2xhc3NMaXN0LmFkZChcIm1vZGFsXCIsIFwiY2xvc2VkXCIpO1xuXHRtb2RhbE92ZXJsYXkuY2xhc3NMaXN0LmFkZChcIm1vZGFsLW92ZXJsYXlcIiwgXCJjbG9zZWRcIik7XG5cblx0Y2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRtb2RhbE92ZXJsYXkuY2xhc3NMaXN0LnRvZ2dsZShcImNsb3NlZFwiKTtcblx0XHRtb2RhbC5jbGFzc0xpc3QudG9nZ2xlKFwiY2xvc2VkXCIpO1xuXHR9KTtcblxuXHRtb2RhbC5hcHBlbmRDaGlsZChjbG9zZUJ0bik7XG5cdG1vZGFsLmFwcGVuZENoaWxkKGZvcm0oKSk7XG5cdG1haW5EaXYuYXBwZW5kQ2hpbGQobW9kYWwpO1xuXHRtYWluRGl2LmFwcGVuZENoaWxkKG1vZGFsT3ZlcmxheSk7XG59XG5cbmZ1bmN0aW9uIGFkZFByb2plY3RCdXR0b24oaWQpIHtcblx0Y29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7aWR9YCk7XG5cdGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdGJ1dHRvbi50ZXh0Q29udGVudCA9IFwiKyBBZGQgUHJvamVjdFwiO1xuXG5cdGNvbnRhaW5lci5hcHBlbmRDaGlsZChidXR0b24pO1xuXHRhZGRNb2RhbCgpO1xuXG5cdGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdGNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtb2RhbFwiKTtcblx0XHRjb25zdCBtb2RhbE92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21vZGFsLW92ZXJsYXlcIik7XG5cdFx0bW9kYWxPdmVybGF5LmNsYXNzTGlzdC50b2dnbGUoXCJjbG9zZWRcIik7XG5cdFx0bW9kYWwuY2xhc3NMaXN0LnRvZ2dsZShcImNsb3NlZFwiKTtcblx0fSk7XG5cblx0cmV0dXJuIGNvbnRhaW5lcjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYWRkUHJvamVjdEJ1dHRvbjtcbiIsImltcG9ydCB7IGZvcm1hdCB9IGZyb20gXCJkYXRlLWZuc1wiO1xuXG4vLyBmb3JtYXREaXN0YW5jZShzdWJEYXlzKG5ldyBEYXRlKCksIDMpLCBuZXcgRGF0ZSgpLCB7IGFkZFN1ZmZpeDogdHJ1ZSB9KTtcblxuY2xhc3MgUHJvamVjdCB7XG5cdGNvbnN0cnVjdG9yKHByb2plY3ROYW1lLCBkZXNjcmlwdGlvbiwgbGlzdCkge1xuXHRcdHRoaXMucHJvamVjdE5hbWUgPSBwcm9qZWN0TmFtZTtcblx0XHR0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG5cdFx0dGhpcy5saXN0ID0gbGlzdDtcblx0fVxuXG5cdGdldE5hbWUoKSB7XG5cdFx0cmV0dXJuIHRoaXMucHJvamVjdE5hbWU7XG5cdH1cblxuXHRnZXREZXNjcmlwdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5kZXNjcmlwdGlvbjtcblx0fVxuXG5cdHNldE5hbWUobikge1xuXHRcdHJldHVybiAodGhpcy5uYW1lID0gbik7XG5cdH1cblxuXHRzZXREZXNjcmlwdGlvbihuKSB7XG5cdFx0cmV0dXJuICh0aGlzLmRlc2NyaXB0aW9uID0gbik7XG5cdH1cblxuXHRnZXRMaXN0KCkge1xuXHRcdHJldHVybiB0aGlzLmxpc3Q7XG5cdH1cblxuXHRhZGRMaXN0KG4pIHtcblx0XHR0aGlzLmxpc3QucHVzaChuKTtcblx0fVxufVxuXG5jbGFzcyBUb2RvIHtcblx0Y29uc3RydWN0b3IodG9kb05hbWUsIGRhdGUsIHByaW9yaXR5KSB7XG5cdFx0dGhpcy50b2RvTmFtZSA9IHRvZG9OYW1lO1xuXHRcdHRoaXMuZGF0ZSA9IGRhdGU7XG5cdFx0dGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuXHR9XG5cblx0Z2V0TmFtZSgpIHtcblx0XHRyZXR1cm4gdGhpcy50b2RvTmFtZTtcblx0fVxuXG5cdHNldE5hbWUobikge1xuXHRcdHJldHVybiAodGhpcy50b2RvTmFtZSA9IG4pO1xuXHR9XG5cblx0Z2V0UHJpb3JpdHkoKSB7XG5cdFx0cmV0dXJuIHRoaXMucHJpb3JpdHk7XG5cdH1cblxuXHRzZXRQcmlvcml0eShuKSB7XG5cdFx0cmV0dXJuICh0aGlzLnByaW9yaXR5ID0gbik7XG5cdH1cbn1cblxuY29uc3QgcHJvamVjdE1vZHVsZSA9ICgoKSA9PiB7XG5cdGxldCBwcm9qZWN0QXJyYXkgPSBbXTtcblx0bGV0IHRvZG9BcnJheSA9IFtdO1xuXG5cdGZ1bmN0aW9uIHNhdmVUb1N0b3JhZ2UoKSB7XG5cdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0XCIsIHByb2plY3RBcnJheSk7XG5cdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ0b2RvXCIsIHRvZG9BcnJheSk7XG5cdH1cblxuXHRmdW5jdGlvbiBkZWxldGVBbGwoKSB7XG5cdFx0Y29uc3QgbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGlzdFwiKTtcblx0XHRjb25zdCBwcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcm9qZWN0XCIpO1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdC5sZW5ndGg7IGkrKykge1xuXHRcdFx0bGlzdC5yZW1vdmVDaGlsZChwcm9qZWN0W2ldKTtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBjbGVhckNvbnRlbnQoKSB7XG5cdFx0Y29uc3QgbmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGVudC1uYW1lXCIpO1xuXHRcdGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250ZW50LWRlc2NyaXB0aW9uXCIpO1xuXHRcdG5hbWUudGV4dENvbnRlbnQgPSBcIlwiO1xuXHRcdGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gXCJcIjtcblx0fVxuXG5cdGZ1bmN0aW9uIHByb2plY3REb20oKSB7XG5cdFx0Y29uc3QgbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGlzdFwiKTtcblx0XHRkZWxldGVBbGwoKTtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RBcnJheS5sZW5ndGg7IGkrKykge1xuXHRcdFx0Y29uc3QgcHJvamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0XHRjb25zdCBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRcdGNvbnN0IGV4aXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXHRcdFx0ZXhpdC5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1leGl0XCIpO1xuXHRcdFx0cHJvamVjdC5jbGFzc0xpc3QuYWRkKFwicHJvamVjdFwiKTtcblxuXHRcdFx0ZXhpdC50ZXh0Q29udGVudCA9IFwiWFwiO1xuXHRcdFx0ZXhpdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcblx0XHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0ZGVsZXRlUHJvamVjdChpKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRwcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0XHRcdG9wZW5Qcm9qZWN0KGkpO1xuXHRcdFx0XHRzZWxlY3RQcm9qZWN0KGkpO1xuXHRcdFx0fSk7XG5cblx0XHRcdG5hbWUudGV4dENvbnRlbnQgPSBwcm9qZWN0QXJyYXlbaV0uZ2V0TmFtZSgpO1xuXHRcdFx0cHJvamVjdC5hcHBlbmQobmFtZSk7XG5cdFx0XHRwcm9qZWN0LmFwcGVuZChleGl0KTtcblx0XHRcdGxpc3QuYXBwZW5kKHByb2plY3QpO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIGFkZFByb2plY3QoaWQpIHtcblx0XHRjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7aWR9YCk7XG5cdFx0Zm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChlKSA9PiB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRjb25zdCBtb2RhbE92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21vZGFsLW92ZXJsYXlcIik7XG5cdFx0XHRjb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbW9kYWxcIik7XG5cdFx0XHRtb2RhbE92ZXJsYXkuY2xhc3NMaXN0LnRvZ2dsZShcImNsb3NlZFwiKTtcblx0XHRcdG1vZGFsLmNsYXNzTGlzdC50b2dnbGUoXCJjbG9zZWRcIik7XG5cblx0XHRcdGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdC1uYW1lXCIpO1xuXHRcdFx0Y29uc3QgcHJvamVjdERlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0LWRlc2NyaXB0aW9uXCIpO1xuXG5cdFx0XHRsZXQgdGVtcCA9IHByb2plY3RUaXRsZS52YWx1ZTtcblx0XHRcdHRlbXAgPSBuZXcgUHJvamVjdChwcm9qZWN0VGl0bGUudmFsdWUsIHByb2plY3REZXNjcmlwdGlvbi52YWx1ZSwgW10pO1xuXHRcdFx0cHJvamVjdEFycmF5LnB1c2godGVtcCk7XG5cdFx0XHRzYXZlVG9TdG9yYWdlKCk7XG5cblx0XHRcdHByb2plY3REb20oKTtcblx0XHRcdGNvbnNvbGUubG9nKHsgcHJvamVjdEFycmF5IH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0ZnVuY3Rpb24gZGVsZXRlUHJvamVjdChpKSB7XG5cdFx0Y29uc3QgZXhpdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJvamVjdC1leGl0XCIpO1xuXHRcdGNvbnN0IG5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRlbnQtbmFtZVwiKTtcblx0XHRwcm9qZWN0QXJyYXkuc3BsaWNlKGksIDEpO1xuXHRcdGNsZWFyQ29udGVudCgpO1xuXHRcdGRlbGV0ZUFsbCgpO1xuXHRcdHByb2plY3REb20oKTtcblx0XHRjbGVhckxpc3QoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIG9wZW5Qcm9qZWN0KGkpIHtcblx0XHRjb25zdCBuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250ZW50LW5hbWVcIik7XG5cdFx0Y29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRlbnQtZGVzY3JpcHRpb25cIik7XG5cdFx0aWYgKHByb2plY3RBcnJheS5sZW5ndGggPT09IDApIHtcblx0XHRcdGNsZWFyQ29udGVudCgpO1xuXHRcdH1cblx0XHRuYW1lLnRleHRDb250ZW50ID0gcHJvamVjdEFycmF5W2ldLmdldE5hbWUoKTtcblx0XHRkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHByb2plY3RBcnJheVtpXS5nZXREZXNjcmlwdGlvbigpO1xuXHR9XG5cblx0ZnVuY3Rpb24gYWRkVG9kbyhpZCkge1xuXHRcdGNvbnN0IGFkZFRvZG8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtpZH1gKTtcblx0XHRhZGRUb2RvLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwb3B1cCk7XG5cdH1cblx0bGV0IGluZGV4ID0gLTE7XG5cdGZ1bmN0aW9uIHNlbGVjdFByb2plY3QoaSkge1xuXHRcdGNvbnN0IHByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb2plY3RcIik7XG5cdFx0aWYgKGluZGV4ID09PSAtMSkge1xuXHRcdFx0cHJvamVjdFtpXS5zdHlsZS5jc3NUZXh0ID0gXCJiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGJsdWVcIjtcblx0XHR9IGVsc2UgaWYgKHByb2plY3RBcnJheVtpbmRleF0gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0aW5kZXggPSBpO1xuXHRcdH0gZWxzZSBpZiAoaW5kZXggIT09IGkpIHtcblx0XHRcdHByb2plY3RbaW5kZXhdLnN0eWxlLmNzc1RleHQgPSBcImJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50XCI7XG5cdFx0fVxuXG5cdFx0aW5kZXggPSBpO1xuXHRcdHNldEluZGV4KGkpO1xuXHRcdHByb2plY3RbaV0uc3R5bGUuY3NzVGV4dCA9IFwiYmFja2dyb3VuZC1jb2xvcjogbGlnaHRibHVlXCI7XG5cdH1cblxuXHRsZXQgc2VsZWN0ZWRJbmRleCA9IC0xO1xuXHRmdW5jdGlvbiBzZXRJbmRleChpKSB7XG5cdFx0c2VsZWN0ZWRJbmRleCA9IGk7XG5cdH1cblxuXHRmdW5jdGlvbiBkcm9wZG93bigpIHtcblx0XHRjb25zdCBwcmlvcml0eUxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO1xuXHRcdGNvbnN0IGhpZ2ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuXHRcdGNvbnN0IG1lZGl1bSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG5cdFx0Y29uc3QgbG93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcblxuXHRcdHByaW9yaXR5TGlzdC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInByaW9yaXR5XCIpO1xuXG5cdFx0aGlnaC5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBcImhpZ2hcIik7XG5cdFx0bWVkaXVtLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIFwibWVkaXVtXCIpO1xuXHRcdGxvdy5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBcImxvd1wiKTtcblxuXHRcdGhpZ2gudGV4dENvbnRlbnQgPSBcImhpZ2hcIjtcblx0XHRtZWRpdW0udGV4dENvbnRlbnQgPSBcIm1lZGl1bVwiO1xuXHRcdGxvdy50ZXh0Q29udGVudCA9IFwibG93XCI7XG5cblx0XHRwcmlvcml0eUxpc3QuYXBwZW5kQ2hpbGQoaGlnaCk7XG5cdFx0cHJpb3JpdHlMaXN0LmFwcGVuZENoaWxkKG1lZGl1bSk7XG5cdFx0cHJpb3JpdHlMaXN0LmFwcGVuZENoaWxkKGxvdyk7XG5cblx0XHRyZXR1cm4gcHJpb3JpdHlMaXN0O1xuXHR9XG5cblx0ZnVuY3Rpb24gcG9wdXAoKSB7XG5cdFx0Y29uc3QgYWRkVG9kbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNhZGQtdG9kb2ApO1xuXHRcdGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRlbnRcIik7XG5cdFx0Y29uc3QgaW5wdXRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdGNvbnN0IHRleHRib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG5cdFx0Y29uc3QgcHJpb3JpdHlMaXN0ID0gZHJvcGRvd24oKTtcblxuXHRcdGNvbnN0IGFkZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdFx0Y29uc3QgY2FuY2VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblxuXHRcdHRleHRib3guc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJ0ZXh0Ym94XCIpO1xuXHRcdGlucHV0Q29udGFpbmVyLnNldEF0dHJpYnV0ZShcImlkXCIsIFwidG9kby1wcm9tcHRcIik7XG5cdFx0YWRkLnRleHRDb250ZW50ID0gXCJBZGRcIjtcblx0XHRjYW5jZWwudGV4dENvbnRlbnQgPSBcIkNhbmNlbFwiO1xuXG5cdFx0YWRkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0XHRhZGRCdXR0b24oKTtcblx0XHRcdGNsZWFyKCk7XG5cdFx0XHRhZGRUb2RvLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwb3B1cCk7XG5cdFx0fSk7XG5cblx0XHRjYW5jZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRcdGNsZWFyKCk7XG5cdFx0XHRhZGRUb2RvLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwb3B1cCk7XG5cdFx0fSk7XG5cblx0XHRpbnB1dENvbnRhaW5lci5hcHBlbmRDaGlsZCh0ZXh0Ym94KTtcblx0XHRpbnB1dENvbnRhaW5lci5hcHBlbmRDaGlsZChwcmlvcml0eUxpc3QpO1xuXHRcdGlucHV0Q29udGFpbmVyLmFwcGVuZENoaWxkKGFkZCk7XG5cdFx0aW5wdXRDb250YWluZXIuYXBwZW5kQ2hpbGQoY2FuY2VsKTtcblx0XHRjb250ZW50LmFwcGVuZENoaWxkKGlucHV0Q29udGFpbmVyKTtcblx0XHRhZGRUb2RvLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwb3B1cCk7XG5cdH1cblxuXHRmdW5jdGlvbiBhZGRCdXR0b24oKSB7XG5cdFx0Y29uc3QgdGV4dGJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGV4dGJveFwiKTtcblx0XHRjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJpb3JpdHlcIik7XG5cdFx0bGV0IHRlbXAgPSBuZXcgVG9kbyh0ZXh0Ym94LnZhbHVlLCBcIjAwLzAwLzAwXCIsIHByaW9yaXR5LnZhbHVlKTtcblx0XHRwcm9qZWN0QXJyYXlbc2VsZWN0ZWRJbmRleF0uYWRkTGlzdCh0ZW1wKTtcblx0XHR0b2RvQXJyYXkucHVzaCh0ZW1wKTtcblx0XHRzYXZlVG9TdG9yYWdlKCk7XG5cblx0XHRjbGVhckxpc3QoKTtcblx0XHR0b2RvRE9NKCk7XG5cdH1cblxuXHRsZXQgcHJvamVjdFRvZG9MaXN0ID0gW107XG5cdGZ1bmN0aW9uIHRvZG9ET00oKSB7XG5cdFx0cHJvamVjdFRvZG9MaXN0ID0gcHJvamVjdEFycmF5W3NlbGVjdGVkSW5kZXhdLmdldExpc3QoKTtcblx0XHRjb25zb2xlLmxvZyhwcm9qZWN0VG9kb0xpc3QpO1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdFRvZG9MaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjb25zdCBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250ZW50XCIpO1xuXHRcdFx0Y29uc3QgdG9kb0l0ZW1Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdFx0Y29uc3QgY2hlY2tDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdFx0Y29uc3QgdG9kb0l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdFx0Y29uc3QgZXhpdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdFx0XHRjb25zdCBjaGVjayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcblx0XHRcdGNvbnN0IGVkaXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXHRcdFx0Y29uc3QgZGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcblxuXHRcdFx0ZGF0ZS5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiZGF0ZVwiKTtcblx0XHRcdGVkaXQuY2xhc3NMaXN0LmFkZChcImVkaXQtdG9kb1wiKTtcblx0XHRcdGVkaXQudGV4dENvbnRlbnQgPSBcIipcIjtcblx0XHRcdGV4aXQuY2xhc3NMaXN0LmFkZChcImV4aXQtdG9kb1wiKTtcblx0XHRcdGV4aXQudGV4dENvbnRlbnQgPSBcIlhcIjtcblx0XHRcdGNoZWNrLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJjaGVja2JveFwiKTtcblx0XHRcdGNoZWNrLmNsYXNzTGlzdC5hZGQoXCJjaGVjay10b2RvXCIpO1xuXHRcdFx0Y2hlY2tDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImNoZWNrLWNvbnRhaW5lclwiKTtcblx0XHRcdHRvZG9JdGVtQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWl0ZW0tY29udGFpbmVyXCIpO1xuXHRcdFx0dG9kb0l0ZW0udGV4dENvbnRlbnQgPSBwcm9qZWN0VG9kb0xpc3RbaV0uZ2V0TmFtZSgpO1xuXG5cdFx0XHRlZGl0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0XHRcdGVkaXRUb2RvKGkpO1xuXHRcdFx0fSk7XG5cblx0XHRcdGV4aXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRcdFx0cmVtb3ZlSXRlbShpKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRpZiAocHJvamVjdFRvZG9MaXN0W2ldLmdldFByaW9yaXR5KCkgPT09IFwiaGlnaFwiKSB7XG5cdFx0XHRcdHRvZG9JdGVtQ29udGFpbmVyLnN0eWxlLmNzc1RleHQgPSBcImJhY2tncm91bmQtY29sb3I6IHJlZDtcIjtcblx0XHRcdH0gZWxzZSBpZiAocHJvamVjdFRvZG9MaXN0W2ldLmdldFByaW9yaXR5KCkgPT09IFwibWVkaXVtXCIpIHtcblx0XHRcdFx0dG9kb0l0ZW1Db250YWluZXIuc3R5bGUuY3NzVGV4dCA9IFwiYmFja2dyb3VuZC1jb2xvcjogb3JhbmdlO1wiO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dG9kb0l0ZW1Db250YWluZXIuc3R5bGUuY3NzVGV4dCA9IFwiYmFja2dyb3VuZC1jb2xvcjogeWVsbG93O1wiO1xuXHRcdFx0fVxuXG5cdFx0XHRjaGVja0NvbnRhaW5lci5hcHBlbmRDaGlsZChjaGVjayk7XG5cdFx0XHRjaGVja0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0b2RvSXRlbSk7XG5cdFx0XHR0b2RvSXRlbUNvbnRhaW5lci5hcHBlbmRDaGlsZChjaGVja0NvbnRhaW5lcik7XG5cdFx0XHR0b2RvSXRlbUNvbnRhaW5lci5hcHBlbmRDaGlsZChlZGl0KTtcblx0XHRcdHRvZG9JdGVtQ29udGFpbmVyLmFwcGVuZENoaWxkKGRhdGUpO1xuXHRcdFx0dG9kb0l0ZW1Db250YWluZXIuYXBwZW5kQ2hpbGQoZXhpdCk7XG5cdFx0XHRjb250ZW50LmFwcGVuZENoaWxkKHRvZG9JdGVtQ29udGFpbmVyKTtcblx0XHR9XG5cdFx0c29ydChwcm9qZWN0VG9kb0xpc3QpO1xuXHR9XG5cblx0ZnVuY3Rpb24gc29ydCgpIHtcblx0XHRjb25zb2xlLmxvZyhwcm9qZWN0VG9kb0xpc3QpO1xuXHRcdGxldCBzb3J0TGlzdCA9IFtdO1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdFRvZG9MaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpZiAocHJvamVjdFRvZG9MaXN0W2ldLmdldFByaW9yaXR5KCkgPT0gXCJoaWdoXCIpIHtcblx0XHRcdFx0c29ydExpc3QucHVzaChpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RUb2RvTGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKHByb2plY3RUb2RvTGlzdFtpXS5nZXRQcmlvcml0eSgpID09IFwibWVkaXVtXCIpIHtcblx0XHRcdFx0c29ydExpc3QucHVzaChpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RUb2RvTGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKHByb2plY3RUb2RvTGlzdFtpXS5nZXRQcmlvcml0eSgpID09IFwibG93XCIpIHtcblx0XHRcdFx0c29ydExpc3QucHVzaChpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cHJvamVjdFRvZG9MaXN0ID0gc29ydExpc3Q7XG5cblx0XHRyZXR1cm4gcHJvamVjdFRvZG9MaXN0O1xuXHR9XG5cblx0ZnVuY3Rpb24gZWRpdFRvZG8oaSkge1xuXHRcdGNvbnN0IGFkZFRvZG8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjYWRkLXRvZG9gKTtcblx0XHRjb25zdCBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250ZW50XCIpO1xuXHRcdGNvbnN0IGlucHV0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRjb25zdCB0ZXh0Ym94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuXHRcdGNvbnN0IGVkaXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXHRcdGNvbnN0IGNhbmNlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdFx0Y29uc3QgcHJpb3JpdHlMaXN0ID0gZHJvcGRvd24oKTtcblxuXHRcdHRleHRib3guc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJ0ZXh0Ym94XCIpO1xuXHRcdGlucHV0Q29udGFpbmVyLnNldEF0dHJpYnV0ZShcImlkXCIsIFwidG9kby1wcm9tcHRcIik7XG5cdFx0ZWRpdC50ZXh0Q29udGVudCA9IFwiRWRpdFwiO1xuXHRcdGNhbmNlbC50ZXh0Q29udGVudCA9IFwiQ2FuY2VsXCI7XG5cblx0XHRlZGl0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0XHRjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJpb3JpdHlcIik7XG5cdFx0XHRsZXQgdG9kbyA9IHByb2plY3RBcnJheVtzZWxlY3RlZEluZGV4XS5nZXRMaXN0KCk7XG5cdFx0XHRjb25zb2xlLmxvZyh0b2RvKTtcblx0XHRcdGxldCBzZWxlY3RlZCA9IHRvZG9baV07XG5cdFx0XHRzZWxlY3RlZC5zZXROYW1lKHRleHRib3gudmFsdWUpO1xuXHRcdFx0Y29uc29sZS5sb2coc2VsZWN0ZWQpO1xuXHRcdFx0aWYgKHByaW9yaXR5LnZhbHVlID09PSBcImhpZ2hcIikge1xuXHRcdFx0XHR0b2RvW2ldLnNldFByaW9yaXR5KFwiaGlnaFwiKTtcblx0XHRcdH0gZWxzZSBpZiAocHJpb3JpdHkudmFsdWUgPT09IFwibWVkaXVtXCIpIHtcblx0XHRcdFx0dG9kb1tpXS5zZXRQcmlvcml0eShcIm1lZGl1bVwiKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRvZG9baV0uc2V0UHJpb3JpdHkoXCJsb3dcIik7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnNvbGUubG9nKHByaW9yaXR5LnZhbHVlKTtcblx0XHRcdGNvbnNvbGUubG9nKHNlbGVjdGVkKTtcblx0XHRcdHNvcnQoKTtcblx0XHRcdGNsZWFyKCk7XG5cdFx0XHRjbGVhckxpc3QoKTtcblx0XHRcdHRvZG9ET00oKTtcblxuXHRcdFx0YWRkVG9kby5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcG9wdXApO1xuXHRcdH0pO1xuXG5cdFx0Y2FuY2VsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0XHRjbGVhcigpO1xuXHRcdFx0YWRkVG9kby5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcG9wdXApO1xuXHRcdH0pO1xuXG5cdFx0aW5wdXRDb250YWluZXIuYXBwZW5kQ2hpbGQodGV4dGJveCk7XG5cdFx0aW5wdXRDb250YWluZXIuYXBwZW5kQ2hpbGQocHJpb3JpdHlMaXN0KTtcblx0XHRpbnB1dENvbnRhaW5lci5hcHBlbmRDaGlsZChlZGl0KTtcblx0XHRpbnB1dENvbnRhaW5lci5hcHBlbmRDaGlsZChjYW5jZWwpO1xuXHRcdGNvbnRlbnQuYXBwZW5kQ2hpbGQoaW5wdXRDb250YWluZXIpO1xuXHRcdGFkZFRvZG8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHBvcHVwKTtcblx0fVxuXG5cdGZ1bmN0aW9uIHJlbW92ZUl0ZW0oaSkge1xuXHRcdGxldCBwcm9qZWN0VG9kb0xpc3QgPSBwcm9qZWN0QXJyYXlbc2VsZWN0ZWRJbmRleF0uZ2V0TGlzdCgpO1xuXHRcdHByb2plY3RUb2RvTGlzdC5zcGxpY2UoaSwgMSk7XG5cdFx0Y2xlYXJMaXN0KCk7XG5cdFx0dG9kb0RPTSgpO1xuXHR9XG5cblx0ZnVuY3Rpb24gY2xlYXJMaXN0KCkge1xuXHRcdGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRlbnRcIik7XG5cdFx0Y29uc3QgdG9kb0l0ZW1Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRvZG8taXRlbS1jb250YWluZXJcIik7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0b2RvSXRlbUNvbnRhaW5lci5sZW5ndGg7IGkrKykge1xuXHRcdFx0Y29udGVudC5yZW1vdmVDaGlsZCh0b2RvSXRlbUNvbnRhaW5lcltpXSk7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gY2xlYXIoKSB7XG5cdFx0Y29uc3QgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGVudFwiKTtcblx0XHRjb25zdCB0b2RvUHJvbXB0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0b2RvLXByb21wdFwiKTtcblx0XHRjb250ZW50LnJlbW92ZUNoaWxkKHRvZG9Qcm9tcHQpO1xuXHR9XG5cblx0cmV0dXJuIHsgYWRkUHJvamVjdCwgYWRkVG9kbywgcHJvamVjdEFycmF5IH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBwcm9qZWN0TW9kdWxlO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgbG9hZExheW91dCBmcm9tIFwiLi9sYXlvdXQuanNcIjtcbmltcG9ydCBhZGRQcm9qZWN0QnV0dG9uIGZyb20gXCIuL21vZGFsLmpzXCI7XG5pbXBvcnQgcHJvamVjdE1vZHVsZSBmcm9tIFwiLi9wcm9qZWN0LmpzXCI7XG5cbmZ1bmN0aW9uIGxvYWRQYWdlKCkge1xuXHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxvYWRMYXlvdXQoKSk7XG59XG5cbmxvYWRQYWdlKCk7XG5hZGRQcm9qZWN0QnV0dG9uKFwicHJvamVjdHMtY29udGFpbmVyXCIpO1xucHJvamVjdE1vZHVsZS5hZGRQcm9qZWN0KFwicHJvamVjdC1mb3JtXCIpO1xucHJvamVjdE1vZHVsZS5hZGRUb2RvKFwiYWRkLXRvZG9cIik7XG5cbmNvbnNvbGUubG9nKFwiaGVsbG9kYXMhXCIpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==