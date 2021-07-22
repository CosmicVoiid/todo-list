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
	function saveToStorage(p) {
		localStorage.setItem("project", JSON.stringify(p));
		// localStorage.setItem("todo", JSON.stringify(todoArray));
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
		let oldProjects = JSON.parse(localStorage.getItem("project"));
		console.log({ projectArray });
		// if (projectArray === null) {
		// 	projectArray = [];
		// }
		for (let i = 0; i < projectArray.length; i++) {
			// let temp = new Project(
			// 	projectArray[i].projectName,
			// 	projectArray[i].description,
			// 	projectArray[i].list
			// );
			// projectArray.splice(i, 1, temp);
			console.log(projectArray);
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

			console.log(projectArray[i]);
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
			// saveToStorage(projectArray);

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
		sort(projectTodoList);
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

	function hello() {
		console.log("Hello");
	}

	return { addProject, addTodo, projectDom, projectArray, hello };
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
_project_js__WEBPACK_IMPORTED_MODULE_2__.default.projectDom();
_project_js__WEBPACK_IMPORTED_MODULE_2__.default.hello();
(0,_modal_js__WEBPACK_IMPORTED_MODULE_1__.default)("projects-container");
_project_js__WEBPACK_IMPORTED_MODULE_2__.default.addProject("project-form");
_project_js__WEBPACK_IMPORTED_MODULE_2__.default.addTodo("add-todo");

console.log("hello!");

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbGF5b3V0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2RhbC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpRUFBZSxVQUFVLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQy9FMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4Q0FBOEMsR0FBRztBQUNqRDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTs7QUFFQSxpRUFBZSxnQkFBZ0IsRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDeEVoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLG9CQUFvQjtBQUNyQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxlQUFlO0FBQzlCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQix5QkFBeUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMENBQTBDLEdBQUc7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZ0IsZUFBZTtBQUMvQixHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZDQUE2QyxHQUFHO0FBQ2hEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsNEJBQTRCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQSw2REFBNkQ7QUFDN0QsSUFBSTtBQUNKLGdFQUFnRTtBQUNoRSxJQUFJO0FBQ0osZ0VBQWdFO0FBQ2hFOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQiw0QkFBNEI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLDRCQUE0QjtBQUM3QztBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsNEJBQTRCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLDhCQUE4QjtBQUMvQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUztBQUNULENBQUM7O0FBRUQsaUVBQWUsYUFBYSxFQUFDOzs7Ozs7O1VDOVo3QjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7O0FDTnFDO0FBQ0s7QUFDRDs7QUFFekM7QUFDQSwyQkFBMkIsbURBQVU7QUFDckM7O0FBRUE7QUFDQSwyREFBd0I7QUFDeEIsc0RBQW1CO0FBQ25CLGtEQUFnQjtBQUNoQiwyREFBd0I7QUFDeEIsd0RBQXFCOztBQUVyQiIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gbG9hZEhlYWRlcigpIHtcblx0Y29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhlYWRlclwiKTtcblx0Y29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG5cdHRpdGxlLnRleHRDb250ZW50ID0gXCJUby1EbyBMaXN0XCI7XG5cdGhlYWRlci5hcHBlbmRDaGlsZCh0aXRsZSk7XG5cblx0cmV0dXJuIGhlYWRlcjtcbn1cblxuZnVuY3Rpb24gbG9hZFByb2plY3RzKCkge1xuXHRjb25zdCBwcm9qZWN0cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuXHRjb25zdCBsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0cHJvamVjdHMuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJwcm9qZWN0cy1jb250YWluZXJcIik7XG5cdHRpdGxlLnNldEF0dHJpYnV0ZShcImlkXCIsIFwicHJvamVjdHMtdGl0bGVcIik7XG5cdGxpc3Quc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJsaXN0XCIpO1xuXHR0aXRsZS50ZXh0Q29udGVudCA9IFwiUHJvamVjdHNcIjtcblx0cHJvamVjdHMuYXBwZW5kQ2hpbGQodGl0bGUpO1xuXHRwcm9qZWN0cy5hcHBlbmRDaGlsZChsaXN0KTtcblxuXHRyZXR1cm4gcHJvamVjdHM7XG59XG5cbmZ1bmN0aW9uIGxvYWRTaWRlYmFyKCkge1xuXHRjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRjb250YWluZXIuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJzaWRlYmFyXCIpO1xuXG5cdGNvbnRhaW5lci5hcHBlbmRDaGlsZChsb2FkUHJvamVjdHMoKSk7XG5cblx0cmV0dXJuIGNvbnRhaW5lcjtcbn1cblxuZnVuY3Rpb24gbG9hZENvbnRlbnQoKSB7XG5cdGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRjb25zdCBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuXHRjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcblx0Y29uc3QgYWRkVG9kbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cblx0Y29udGVudC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImNvbnRlbnRcIik7XG5cdG5hbWUuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJjb250ZW50LW5hbWVcIik7XG5cdGRlc2NyaXB0aW9uLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiY29udGVudC1kZXNjcmlwdGlvblwiKTtcblx0YWRkVG9kby5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImFkZC10b2RvXCIpO1xuXG5cdGFkZFRvZG8udGV4dENvbnRlbnQgPSBcIkFkZCBUb2RvXCI7XG5cblx0Y29udGVudC5hcHBlbmRDaGlsZChuYW1lKTtcblx0Y29udGVudC5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbik7XG5cdGNvbnRlbnQuYXBwZW5kQ2hpbGQoYWRkVG9kbyk7XG5cblx0cmV0dXJuIGNvbnRlbnQ7XG59XG5cbmZ1bmN0aW9uIGNvbnRlbnRDb250YWluZXIoKSB7XG5cdGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImNvbnRlbnQtY29udGFpbmVyXCIpO1xuXHRjb250YWluZXIuYXBwZW5kQ2hpbGQobG9hZFNpZGViYXIoKSk7XG5cdGNvbnRhaW5lci5hcHBlbmRDaGlsZChsb2FkQ29udGVudCgpKTtcblxuXHRyZXR1cm4gY29udGFpbmVyO1xufVxuXG5mdW5jdGlvbiBsb2FkRm9vdGVyKCkge1xuXHRjb25zdCBmb290ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9vdGVyXCIpO1xuXG5cdHJldHVybiBmb290ZXI7XG59XG5cbmZ1bmN0aW9uIGxvYWRMYXlvdXQoKSB7XG5cdGNvbnN0IG1haW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRtYWluLnNldEF0dHJpYnV0ZShcImlkXCIsIFwibWFpblwiKTtcblxuXHRtYWluLmFwcGVuZENoaWxkKGxvYWRIZWFkZXIoKSk7XG5cdG1haW4uYXBwZW5kQ2hpbGQoY29udGVudENvbnRhaW5lcigpKTtcblx0bWFpbi5hcHBlbmRDaGlsZChsb2FkRm9vdGVyKCkpO1xuXG5cdHJldHVybiBtYWluO1xufVxuXG5leHBvcnQgZGVmYXVsdCBsb2FkTGF5b3V0O1xuIiwiZnVuY3Rpb24gZm9ybSgpIHtcblx0Y29uc3QgcHJvamVjdEZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKTtcblx0Y29uc3QgcHJvamVjdE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG5cdGNvbnN0IHByb2plY3REZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiKTtcblx0Y29uc3QgZW50ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG5cblx0cHJvamVjdEZvcm0uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJwcm9qZWN0LWZvcm1cIik7XG5cdHByb2plY3ROYW1lLnNldEF0dHJpYnV0ZShcImlkXCIsIFwicHJvamVjdC1uYW1lXCIpO1xuXHRwcm9qZWN0RGVzY3JpcHRpb24uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJwcm9qZWN0LWRlc2NyaXB0aW9uXCIpO1xuXHRlbnRlci5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImVudGVyXCIpO1xuXG5cdHByb2plY3RGb3JtLnNldEF0dHJpYnV0ZShcInJlcXVpcmVkXCIsIFwicmVxdWlyZWRcIik7XG5cdHByb2plY3ROYW1lLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0XCIpO1xuXHRwcm9qZWN0TmFtZS5zZXRBdHRyaWJ1dGUoXCJyZXF1aXJlZFwiLCBcInJlcXVpcmVkXCIpO1xuXHRlbnRlci5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwic3VibWl0XCIpO1xuXG5cdHByb2plY3ROYW1lLnNldEF0dHJpYnV0ZShcIm1heGxlbmd0aFwiLCBcIjEwXCIpO1xuXHRwcm9qZWN0RGVzY3JpcHRpb24uc2V0QXR0cmlidXRlKFwibWF4bGVuZ3RoXCIsIFwiNTBcIik7XG5cblx0cHJvamVjdE5hbWUuc2V0QXR0cmlidXRlKFwicGxhY2Vob2xkZXJcIiwgXCJOYW1lXCIpO1xuXHRwcm9qZWN0RGVzY3JpcHRpb24uc2V0QXR0cmlidXRlKFwicGxhY2Vob2xkZXJcIiwgXCJEZXNjcmlwdGlvblwiKTtcblx0ZW50ZXIudGV4dENvbnRlbnQgPSBcIkVudGVyXCI7XG5cblx0cHJvamVjdEZvcm0uYXBwZW5kQ2hpbGQocHJvamVjdE5hbWUpO1xuXHRwcm9qZWN0Rm9ybS5hcHBlbmRDaGlsZChwcm9qZWN0RGVzY3JpcHRpb24pO1xuXHRwcm9qZWN0Rm9ybS5hcHBlbmRDaGlsZChlbnRlcik7XG5cblx0cmV0dXJuIHByb2plY3RGb3JtO1xufVxuXG5mdW5jdGlvbiBhZGRNb2RhbCgpIHtcblx0Y29uc3QgbWFpbkRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFpblwiKTtcblx0Y29uc3QgbW9kYWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRjb25zdCBtb2RhbE92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRjb25zdCBjbG9zZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdGNsb3NlQnRuLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiY2xvc2UtYnRuXCIpO1xuXG5cdGNsb3NlQnRuLnRleHRDb250ZW50ID0gXCJYXCI7XG5cdG1vZGFsLnNldEF0dHJpYnV0ZShcImlkXCIsIFwibW9kYWxcIik7XG5cdG1vZGFsT3ZlcmxheS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcIm1vZGFsLW92ZXJsYXlcIik7XG5cdG1vZGFsLmNsYXNzTGlzdC5hZGQoXCJtb2RhbFwiLCBcImNsb3NlZFwiKTtcblx0bW9kYWxPdmVybGF5LmNsYXNzTGlzdC5hZGQoXCJtb2RhbC1vdmVybGF5XCIsIFwiY2xvc2VkXCIpO1xuXG5cdGNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0bW9kYWxPdmVybGF5LmNsYXNzTGlzdC50b2dnbGUoXCJjbG9zZWRcIik7XG5cdFx0bW9kYWwuY2xhc3NMaXN0LnRvZ2dsZShcImNsb3NlZFwiKTtcblx0fSk7XG5cblx0bW9kYWwuYXBwZW5kQ2hpbGQoY2xvc2VCdG4pO1xuXHRtb2RhbC5hcHBlbmRDaGlsZChmb3JtKCkpO1xuXHRtYWluRGl2LmFwcGVuZENoaWxkKG1vZGFsKTtcblx0bWFpbkRpdi5hcHBlbmRDaGlsZChtb2RhbE92ZXJsYXkpO1xufVxuXG5mdW5jdGlvbiBhZGRQcm9qZWN0QnV0dG9uKGlkKSB7XG5cdGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2lkfWApO1xuXHRjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXHRidXR0b24udGV4dENvbnRlbnQgPSBcIisgQWRkIFByb2plY3RcIjtcblxuXHRjb250YWluZXIuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcblx0YWRkTW9kYWwoKTtcblxuXHRidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRjb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbW9kYWxcIik7XG5cdFx0Y29uc3QgbW9kYWxPdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtb2RhbC1vdmVybGF5XCIpO1xuXHRcdG1vZGFsT3ZlcmxheS5jbGFzc0xpc3QudG9nZ2xlKFwiY2xvc2VkXCIpO1xuXHRcdG1vZGFsLmNsYXNzTGlzdC50b2dnbGUoXCJjbG9zZWRcIik7XG5cdH0pO1xuXG5cdHJldHVybiBjb250YWluZXI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFkZFByb2plY3RCdXR0b247XG4iLCJjbGFzcyBQcm9qZWN0IHtcblx0Y29uc3RydWN0b3IocHJvamVjdE5hbWUsIGRlc2NyaXB0aW9uLCBsaXN0KSB7XG5cdFx0dGhpcy5wcm9qZWN0TmFtZSA9IHByb2plY3ROYW1lO1xuXHRcdHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcblx0XHR0aGlzLmxpc3QgPSBsaXN0O1xuXHR9XG5cblx0Z2V0TmFtZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5wcm9qZWN0TmFtZTtcblx0fVxuXG5cdGdldERlc2NyaXB0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLmRlc2NyaXB0aW9uO1xuXHR9XG5cblx0c2V0TmFtZShuKSB7XG5cdFx0cmV0dXJuICh0aGlzLm5hbWUgPSBuKTtcblx0fVxuXG5cdHNldERlc2NyaXB0aW9uKG4pIHtcblx0XHRyZXR1cm4gKHRoaXMuZGVzY3JpcHRpb24gPSBuKTtcblx0fVxuXG5cdGdldExpc3QoKSB7XG5cdFx0cmV0dXJuIHRoaXMubGlzdDtcblx0fVxuXG5cdGFkZExpc3Qobikge1xuXHRcdHRoaXMubGlzdC5wdXNoKG4pO1xuXHR9XG59XG5cbmNsYXNzIFRvZG8ge1xuXHRjb25zdHJ1Y3Rvcih0b2RvTmFtZSwgZGF0ZSwgcHJpb3JpdHkpIHtcblx0XHR0aGlzLnRvZG9OYW1lID0gdG9kb05hbWU7XG5cdFx0dGhpcy5kYXRlID0gZGF0ZTtcblx0XHR0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG5cdH1cblxuXHRnZXROYW1lKCkge1xuXHRcdHJldHVybiB0aGlzLnRvZG9OYW1lO1xuXHR9XG5cblx0c2V0TmFtZShuKSB7XG5cdFx0cmV0dXJuICh0aGlzLnRvZG9OYW1lID0gbik7XG5cdH1cblxuXHRnZXRQcmlvcml0eSgpIHtcblx0XHRyZXR1cm4gdGhpcy5wcmlvcml0eTtcblx0fVxuXG5cdHNldFByaW9yaXR5KG4pIHtcblx0XHRyZXR1cm4gKHRoaXMucHJpb3JpdHkgPSBuKTtcblx0fVxufVxuXG5jb25zdCBwcm9qZWN0TW9kdWxlID0gKCgpID0+IHtcblx0bGV0IHByb2plY3RBcnJheSA9IFtdO1xuXHRsZXQgdG9kb0FycmF5ID0gW107XG5cdGZ1bmN0aW9uIHNhdmVUb1N0b3JhZ2UocCkge1xuXHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicHJvamVjdFwiLCBKU09OLnN0cmluZ2lmeShwKSk7XG5cdFx0Ly8gbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ0b2RvXCIsIEpTT04uc3RyaW5naWZ5KHRvZG9BcnJheSkpO1xuXHR9XG5cblx0ZnVuY3Rpb24gZGVsZXRlQWxsKCkge1xuXHRcdGNvbnN0IGxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xpc3RcIik7XG5cdFx0Y29uc3QgcHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJvamVjdFwiKTtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3QubGVuZ3RoOyBpKyspIHtcblx0XHRcdGxpc3QucmVtb3ZlQ2hpbGQocHJvamVjdFtpXSk7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gY2xlYXJDb250ZW50KCkge1xuXHRcdGNvbnN0IG5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRlbnQtbmFtZVwiKTtcblx0XHRjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGVudC1kZXNjcmlwdGlvblwiKTtcblx0XHRuYW1lLnRleHRDb250ZW50ID0gXCJcIjtcblx0XHRkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IFwiXCI7XG5cdH1cblxuXHRmdW5jdGlvbiBwcm9qZWN0RG9tKCkge1xuXHRcdGNvbnN0IGxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xpc3RcIik7XG5cdFx0ZGVsZXRlQWxsKCk7XG5cdFx0bGV0IG9sZFByb2plY3RzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInByb2plY3RcIikpO1xuXHRcdGNvbnNvbGUubG9nKHsgcHJvamVjdEFycmF5IH0pO1xuXHRcdC8vIGlmIChwcm9qZWN0QXJyYXkgPT09IG51bGwpIHtcblx0XHQvLyBcdHByb2plY3RBcnJheSA9IFtdO1xuXHRcdC8vIH1cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RBcnJheS5sZW5ndGg7IGkrKykge1xuXHRcdFx0Ly8gbGV0IHRlbXAgPSBuZXcgUHJvamVjdChcblx0XHRcdC8vIFx0cHJvamVjdEFycmF5W2ldLnByb2plY3ROYW1lLFxuXHRcdFx0Ly8gXHRwcm9qZWN0QXJyYXlbaV0uZGVzY3JpcHRpb24sXG5cdFx0XHQvLyBcdHByb2plY3RBcnJheVtpXS5saXN0XG5cdFx0XHQvLyApO1xuXHRcdFx0Ly8gcHJvamVjdEFycmF5LnNwbGljZShpLCAxLCB0ZW1wKTtcblx0XHRcdGNvbnNvbGUubG9nKHByb2plY3RBcnJheSk7XG5cdFx0XHRjb25zdCBwcm9qZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRcdGNvbnN0IG5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdFx0Y29uc3QgZXhpdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdFx0XHRleGl0LmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LWV4aXRcIik7XG5cdFx0XHRwcm9qZWN0LmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0XCIpO1xuXG5cdFx0XHRleGl0LnRleHRDb250ZW50ID0gXCJYXCI7XG5cdFx0XHRleGl0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuXHRcdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHRkZWxldGVQcm9qZWN0KGkpO1xuXHRcdFx0fSk7XG5cblx0XHRcdHByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRcdFx0b3BlblByb2plY3QoaSk7XG5cdFx0XHRcdHNlbGVjdFByb2plY3QoaSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0Y29uc29sZS5sb2cocHJvamVjdEFycmF5W2ldKTtcblx0XHRcdG5hbWUudGV4dENvbnRlbnQgPSBwcm9qZWN0QXJyYXlbaV0uZ2V0TmFtZSgpO1xuXHRcdFx0cHJvamVjdC5hcHBlbmQobmFtZSk7XG5cdFx0XHRwcm9qZWN0LmFwcGVuZChleGl0KTtcblx0XHRcdGxpc3QuYXBwZW5kKHByb2plY3QpO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIGFkZFByb2plY3QoaWQpIHtcblx0XHRjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7aWR9YCk7XG5cdFx0Zm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChlKSA9PiB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRjb25zdCBtb2RhbE92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21vZGFsLW92ZXJsYXlcIik7XG5cdFx0XHRjb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbW9kYWxcIik7XG5cdFx0XHRtb2RhbE92ZXJsYXkuY2xhc3NMaXN0LnRvZ2dsZShcImNsb3NlZFwiKTtcblx0XHRcdG1vZGFsLmNsYXNzTGlzdC50b2dnbGUoXCJjbG9zZWRcIik7XG5cblx0XHRcdGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdC1uYW1lXCIpO1xuXHRcdFx0Y29uc3QgcHJvamVjdERlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0LWRlc2NyaXB0aW9uXCIpO1xuXG5cdFx0XHRsZXQgdGVtcCA9IHByb2plY3RUaXRsZS52YWx1ZTtcblx0XHRcdHRlbXAgPSBuZXcgUHJvamVjdChwcm9qZWN0VGl0bGUudmFsdWUsIHByb2plY3REZXNjcmlwdGlvbi52YWx1ZSwgW10pO1xuXHRcdFx0cHJvamVjdEFycmF5LnB1c2godGVtcCk7XG5cdFx0XHQvLyBzYXZlVG9TdG9yYWdlKHByb2plY3RBcnJheSk7XG5cblx0XHRcdHByb2plY3REb20oKTtcblx0XHRcdGNvbnNvbGUubG9nKHsgcHJvamVjdEFycmF5IH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0ZnVuY3Rpb24gZGVsZXRlUHJvamVjdChpKSB7XG5cdFx0Y29uc3QgZXhpdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJvamVjdC1leGl0XCIpO1xuXHRcdGNvbnN0IG5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRlbnQtbmFtZVwiKTtcblx0XHRwcm9qZWN0QXJyYXkuc3BsaWNlKGksIDEpO1xuXHRcdGNsZWFyQ29udGVudCgpO1xuXHRcdGRlbGV0ZUFsbCgpO1xuXHRcdHByb2plY3REb20oKTtcblx0XHRjbGVhckxpc3QoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIG9wZW5Qcm9qZWN0KGkpIHtcblx0XHRjb25zdCBuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250ZW50LW5hbWVcIik7XG5cdFx0Y29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRlbnQtZGVzY3JpcHRpb25cIik7XG5cdFx0aWYgKHByb2plY3RBcnJheS5sZW5ndGggPT09IDApIHtcblx0XHRcdGNsZWFyQ29udGVudCgpO1xuXHRcdH1cblx0XHRuYW1lLnRleHRDb250ZW50ID0gcHJvamVjdEFycmF5W2ldLmdldE5hbWUoKTtcblx0XHRkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHByb2plY3RBcnJheVtpXS5nZXREZXNjcmlwdGlvbigpO1xuXHR9XG5cblx0ZnVuY3Rpb24gYWRkVG9kbyhpZCkge1xuXHRcdGNvbnN0IGFkZFRvZG8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtpZH1gKTtcblx0XHRhZGRUb2RvLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwb3B1cCk7XG5cdH1cblxuXHRsZXQgaW5kZXggPSAtMTtcblx0ZnVuY3Rpb24gc2VsZWN0UHJvamVjdChpKSB7XG5cdFx0Y29uc3QgcHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJvamVjdFwiKTtcblx0XHRpZiAoaW5kZXggPT09IC0xKSB7XG5cdFx0XHRwcm9qZWN0W2ldLnN0eWxlLmNzc1RleHQgPSBcImJhY2tncm91bmQtY29sb3I6IGxpZ2h0Ymx1ZVwiO1xuXHRcdH0gZWxzZSBpZiAocHJvamVjdEFycmF5W2luZGV4XSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRpbmRleCA9IGk7XG5cdFx0fSBlbHNlIGlmIChpbmRleCAhPT0gaSkge1xuXHRcdFx0cHJvamVjdFtpbmRleF0uc3R5bGUuY3NzVGV4dCA9IFwiYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnRcIjtcblx0XHR9XG5cblx0XHRpbmRleCA9IGk7XG5cdFx0c2V0SW5kZXgoaSk7XG5cdFx0cHJvamVjdFtpXS5zdHlsZS5jc3NUZXh0ID0gXCJiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGJsdWVcIjtcblx0fVxuXG5cdGxldCBzZWxlY3RlZEluZGV4ID0gLTE7XG5cdGZ1bmN0aW9uIHNldEluZGV4KGkpIHtcblx0XHRzZWxlY3RlZEluZGV4ID0gaTtcblx0fVxuXG5cdGZ1bmN0aW9uIGRyb3Bkb3duKCkge1xuXHRcdGNvbnN0IHByaW9yaXR5TGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7XG5cdFx0Y29uc3QgaGlnaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG5cdFx0Y29uc3QgbWVkaXVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcblx0XHRjb25zdCBsb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuXG5cdFx0cHJpb3JpdHlMaXN0LnNldEF0dHJpYnV0ZShcImlkXCIsIFwicHJpb3JpdHlcIik7XG5cblx0XHRoaWdoLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIFwiaGlnaFwiKTtcblx0XHRtZWRpdW0uc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgXCJtZWRpdW1cIik7XG5cdFx0bG93LnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIFwibG93XCIpO1xuXG5cdFx0aGlnaC50ZXh0Q29udGVudCA9IFwiaGlnaFwiO1xuXHRcdG1lZGl1bS50ZXh0Q29udGVudCA9IFwibWVkaXVtXCI7XG5cdFx0bG93LnRleHRDb250ZW50ID0gXCJsb3dcIjtcblxuXHRcdHByaW9yaXR5TGlzdC5hcHBlbmRDaGlsZChoaWdoKTtcblx0XHRwcmlvcml0eUxpc3QuYXBwZW5kQ2hpbGQobWVkaXVtKTtcblx0XHRwcmlvcml0eUxpc3QuYXBwZW5kQ2hpbGQobG93KTtcblxuXHRcdHJldHVybiBwcmlvcml0eUxpc3Q7XG5cdH1cblxuXHRmdW5jdGlvbiBwb3B1cCgpIHtcblx0XHRjb25zdCBhZGRUb2RvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2FkZC10b2RvYCk7XG5cdFx0Y29uc3QgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGVudFwiKTtcblx0XHRjb25zdCBpbnB1dENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0Y29uc3QgdGV4dGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcblx0XHRjb25zdCBwcmlvcml0eUxpc3QgPSBkcm9wZG93bigpO1xuXG5cdFx0Y29uc3QgYWRkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblx0XHRjb25zdCBjYW5jZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXG5cdFx0dGV4dGJveC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInRleHRib3hcIik7XG5cdFx0aW5wdXRDb250YWluZXIuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJ0b2RvLXByb21wdFwiKTtcblx0XHRhZGQudGV4dENvbnRlbnQgPSBcIkFkZFwiO1xuXHRcdGNhbmNlbC50ZXh0Q29udGVudCA9IFwiQ2FuY2VsXCI7XG5cblx0XHRhZGQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRcdGFkZEJ1dHRvbigpO1xuXHRcdFx0Y2xlYXIoKTtcblx0XHRcdGFkZFRvZG8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHBvcHVwKTtcblx0XHR9KTtcblxuXHRcdGNhbmNlbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdFx0Y2xlYXIoKTtcblx0XHRcdGFkZFRvZG8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHBvcHVwKTtcblx0XHR9KTtcblxuXHRcdGlucHV0Q29udGFpbmVyLmFwcGVuZENoaWxkKHRleHRib3gpO1xuXHRcdGlucHV0Q29udGFpbmVyLmFwcGVuZENoaWxkKHByaW9yaXR5TGlzdCk7XG5cdFx0aW5wdXRDb250YWluZXIuYXBwZW5kQ2hpbGQoYWRkKTtcblx0XHRpbnB1dENvbnRhaW5lci5hcHBlbmRDaGlsZChjYW5jZWwpO1xuXHRcdGNvbnRlbnQuYXBwZW5kQ2hpbGQoaW5wdXRDb250YWluZXIpO1xuXHRcdGFkZFRvZG8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHBvcHVwKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGFkZEJ1dHRvbigpIHtcblx0XHRjb25zdCB0ZXh0Ym94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0ZXh0Ym94XCIpO1xuXHRcdGNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcmlvcml0eVwiKTtcblx0XHRsZXQgdGVtcCA9IG5ldyBUb2RvKHRleHRib3gudmFsdWUsIFwiMDAvMDAvMDBcIiwgcHJpb3JpdHkudmFsdWUpO1xuXHRcdHByb2plY3RBcnJheVtzZWxlY3RlZEluZGV4XS5hZGRMaXN0KHRlbXApO1xuXHRcdHRvZG9BcnJheS5wdXNoKHRlbXApO1xuXHRcdHNhdmVUb1N0b3JhZ2UoKTtcblxuXHRcdGNsZWFyTGlzdCgpO1xuXHRcdHRvZG9ET00oKTtcblx0fVxuXG5cdGxldCBwcm9qZWN0VG9kb0xpc3QgPSBbXTtcblx0ZnVuY3Rpb24gdG9kb0RPTSgpIHtcblx0XHRwcm9qZWN0VG9kb0xpc3QgPSBwcm9qZWN0QXJyYXlbc2VsZWN0ZWRJbmRleF0uZ2V0TGlzdCgpO1xuXHRcdHNvcnQocHJvamVjdFRvZG9MaXN0KTtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RUb2RvTGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdFx0Y29uc3QgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGVudFwiKTtcblx0XHRcdGNvbnN0IHRvZG9JdGVtQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRcdGNvbnN0IGNoZWNrQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRcdGNvbnN0IHRvZG9JdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRcdGNvbnN0IGV4aXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXHRcdFx0Y29uc3QgY2hlY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG5cdFx0XHRjb25zdCBlZGl0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblx0XHRcdGNvbnN0IGRhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG5cblx0XHRcdGRhdGUuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImRhdGVcIik7XG5cdFx0XHRlZGl0LmNsYXNzTGlzdC5hZGQoXCJlZGl0LXRvZG9cIik7XG5cdFx0XHRlZGl0LnRleHRDb250ZW50ID0gXCIqXCI7XG5cdFx0XHRleGl0LmNsYXNzTGlzdC5hZGQoXCJleGl0LXRvZG9cIik7XG5cdFx0XHRleGl0LnRleHRDb250ZW50ID0gXCJYXCI7XG5cdFx0XHRjaGVjay5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiY2hlY2tib3hcIik7XG5cdFx0XHRjaGVjay5jbGFzc0xpc3QuYWRkKFwiY2hlY2stdG9kb1wiKTtcblx0XHRcdGNoZWNrQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJjaGVjay1jb250YWluZXJcIik7XG5cdFx0XHR0b2RvSXRlbUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwidG9kby1pdGVtLWNvbnRhaW5lclwiKTtcblx0XHRcdHRvZG9JdGVtLnRleHRDb250ZW50ID0gcHJvamVjdFRvZG9MaXN0W2ldLmdldE5hbWUoKTtcblxuXHRcdFx0ZWRpdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdFx0XHRlZGl0VG9kbyhpKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRleGl0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0XHRcdHJlbW92ZUl0ZW0oaSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0aWYgKHByb2plY3RUb2RvTGlzdFtpXS5nZXRQcmlvcml0eSgpID09PSBcImhpZ2hcIikge1xuXHRcdFx0XHR0b2RvSXRlbUNvbnRhaW5lci5zdHlsZS5jc3NUZXh0ID0gXCJiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XCI7XG5cdFx0XHR9IGVsc2UgaWYgKHByb2plY3RUb2RvTGlzdFtpXS5nZXRQcmlvcml0eSgpID09PSBcIm1lZGl1bVwiKSB7XG5cdFx0XHRcdHRvZG9JdGVtQ29udGFpbmVyLnN0eWxlLmNzc1RleHQgPSBcImJhY2tncm91bmQtY29sb3I6IG9yYW5nZTtcIjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRvZG9JdGVtQ29udGFpbmVyLnN0eWxlLmNzc1RleHQgPSBcImJhY2tncm91bmQtY29sb3I6IHllbGxvdztcIjtcblx0XHRcdH1cblxuXHRcdFx0Y2hlY2tDb250YWluZXIuYXBwZW5kQ2hpbGQoY2hlY2spO1xuXHRcdFx0Y2hlY2tDb250YWluZXIuYXBwZW5kQ2hpbGQodG9kb0l0ZW0pO1xuXHRcdFx0dG9kb0l0ZW1Db250YWluZXIuYXBwZW5kQ2hpbGQoY2hlY2tDb250YWluZXIpO1xuXHRcdFx0dG9kb0l0ZW1Db250YWluZXIuYXBwZW5kQ2hpbGQoZWRpdCk7XG5cdFx0XHR0b2RvSXRlbUNvbnRhaW5lci5hcHBlbmRDaGlsZChkYXRlKTtcblx0XHRcdHRvZG9JdGVtQ29udGFpbmVyLmFwcGVuZENoaWxkKGV4aXQpO1xuXHRcdFx0Y29udGVudC5hcHBlbmRDaGlsZCh0b2RvSXRlbUNvbnRhaW5lcik7XG5cdFx0fVxuXHRcdHNvcnQocHJvamVjdFRvZG9MaXN0KTtcblx0fVxuXG5cdGZ1bmN0aW9uIHNvcnQoKSB7XG5cdFx0Y29uc29sZS5sb2cocHJvamVjdFRvZG9MaXN0KTtcblx0XHRsZXQgc29ydExpc3QgPSBbXTtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RUb2RvTGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKHByb2plY3RUb2RvTGlzdFtpXS5nZXRQcmlvcml0eSgpID09IFwiaGlnaFwiKSB7XG5cdFx0XHRcdHNvcnRMaXN0LnB1c2goaSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0VG9kb0xpc3QubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmIChwcm9qZWN0VG9kb0xpc3RbaV0uZ2V0UHJpb3JpdHkoKSA9PSBcIm1lZGl1bVwiKSB7XG5cdFx0XHRcdHNvcnRMaXN0LnB1c2goaSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0VG9kb0xpc3QubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmIChwcm9qZWN0VG9kb0xpc3RbaV0uZ2V0UHJpb3JpdHkoKSA9PSBcImxvd1wiKSB7XG5cdFx0XHRcdHNvcnRMaXN0LnB1c2goaSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHByb2plY3RUb2RvTGlzdCA9IHNvcnRMaXN0O1xuXG5cdFx0cmV0dXJuIHByb2plY3RUb2RvTGlzdDtcblx0fVxuXG5cdGZ1bmN0aW9uIGVkaXRUb2RvKGkpIHtcblx0XHRjb25zdCBhZGRUb2RvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2FkZC10b2RvYCk7XG5cdFx0Y29uc3QgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGVudFwiKTtcblx0XHRjb25zdCBpbnB1dENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0Y29uc3QgdGV4dGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcblx0XHRjb25zdCBlZGl0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblx0XHRjb25zdCBjYW5jZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXHRcdGNvbnN0IHByaW9yaXR5TGlzdCA9IGRyb3Bkb3duKCk7XG5cblx0XHR0ZXh0Ym94LnNldEF0dHJpYnV0ZShcImlkXCIsIFwidGV4dGJveFwiKTtcblx0XHRpbnB1dENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInRvZG8tcHJvbXB0XCIpO1xuXHRcdGVkaXQudGV4dENvbnRlbnQgPSBcIkVkaXRcIjtcblx0XHRjYW5jZWwudGV4dENvbnRlbnQgPSBcIkNhbmNlbFwiO1xuXG5cdFx0ZWRpdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdFx0Y29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3ByaW9yaXR5XCIpO1xuXHRcdFx0bGV0IHRvZG8gPSBwcm9qZWN0QXJyYXlbc2VsZWN0ZWRJbmRleF0uZ2V0TGlzdCgpO1xuXHRcdFx0Y29uc29sZS5sb2codG9kbyk7XG5cdFx0XHRsZXQgc2VsZWN0ZWQgPSB0b2RvW2ldO1xuXHRcdFx0c2VsZWN0ZWQuc2V0TmFtZSh0ZXh0Ym94LnZhbHVlKTtcblx0XHRcdGNvbnNvbGUubG9nKHNlbGVjdGVkKTtcblx0XHRcdGlmIChwcmlvcml0eS52YWx1ZSA9PT0gXCJoaWdoXCIpIHtcblx0XHRcdFx0dG9kb1tpXS5zZXRQcmlvcml0eShcImhpZ2hcIik7XG5cdFx0XHR9IGVsc2UgaWYgKHByaW9yaXR5LnZhbHVlID09PSBcIm1lZGl1bVwiKSB7XG5cdFx0XHRcdHRvZG9baV0uc2V0UHJpb3JpdHkoXCJtZWRpdW1cIik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0b2RvW2ldLnNldFByaW9yaXR5KFwibG93XCIpO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zb2xlLmxvZyhwcmlvcml0eS52YWx1ZSk7XG5cdFx0XHRjb25zb2xlLmxvZyhzZWxlY3RlZCk7XG5cdFx0XHRzb3J0KCk7XG5cdFx0XHRjbGVhcigpO1xuXHRcdFx0Y2xlYXJMaXN0KCk7XG5cdFx0XHR0b2RvRE9NKCk7XG5cblx0XHRcdGFkZFRvZG8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHBvcHVwKTtcblx0XHR9KTtcblxuXHRcdGNhbmNlbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdFx0Y2xlYXIoKTtcblx0XHRcdGFkZFRvZG8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHBvcHVwKTtcblx0XHR9KTtcblxuXHRcdGlucHV0Q29udGFpbmVyLmFwcGVuZENoaWxkKHRleHRib3gpO1xuXHRcdGlucHV0Q29udGFpbmVyLmFwcGVuZENoaWxkKHByaW9yaXR5TGlzdCk7XG5cdFx0aW5wdXRDb250YWluZXIuYXBwZW5kQ2hpbGQoZWRpdCk7XG5cdFx0aW5wdXRDb250YWluZXIuYXBwZW5kQ2hpbGQoY2FuY2VsKTtcblx0XHRjb250ZW50LmFwcGVuZENoaWxkKGlucHV0Q29udGFpbmVyKTtcblx0XHRhZGRUb2RvLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwb3B1cCk7XG5cdH1cblxuXHRmdW5jdGlvbiByZW1vdmVJdGVtKGkpIHtcblx0XHRsZXQgcHJvamVjdFRvZG9MaXN0ID0gcHJvamVjdEFycmF5W3NlbGVjdGVkSW5kZXhdLmdldExpc3QoKTtcblx0XHRwcm9qZWN0VG9kb0xpc3Quc3BsaWNlKGksIDEpO1xuXHRcdGNsZWFyTGlzdCgpO1xuXHRcdHRvZG9ET00oKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGNsZWFyTGlzdCgpIHtcblx0XHRjb25zdCBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250ZW50XCIpO1xuXHRcdGNvbnN0IHRvZG9JdGVtQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50b2RvLWl0ZW0tY29udGFpbmVyXCIpO1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdG9kb0l0ZW1Db250YWluZXIubGVuZ3RoOyBpKyspIHtcblx0XHRcdGNvbnRlbnQucmVtb3ZlQ2hpbGQodG9kb0l0ZW1Db250YWluZXJbaV0pO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIGNsZWFyKCkge1xuXHRcdGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRlbnRcIik7XG5cdFx0Y29uc3QgdG9kb1Byb21wdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdG9kby1wcm9tcHRcIik7XG5cdFx0Y29udGVudC5yZW1vdmVDaGlsZCh0b2RvUHJvbXB0KTtcblx0fVxuXG5cdGZ1bmN0aW9uIGhlbGxvKCkge1xuXHRcdGNvbnNvbGUubG9nKFwiSGVsbG9cIik7XG5cdH1cblxuXHRyZXR1cm4geyBhZGRQcm9qZWN0LCBhZGRUb2RvLCBwcm9qZWN0RG9tLCBwcm9qZWN0QXJyYXksIGhlbGxvIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBwcm9qZWN0TW9kdWxlO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgbG9hZExheW91dCBmcm9tIFwiLi9sYXlvdXQuanNcIjtcbmltcG9ydCBhZGRQcm9qZWN0QnV0dG9uIGZyb20gXCIuL21vZGFsLmpzXCI7XG5pbXBvcnQgcHJvamVjdE1vZHVsZSBmcm9tIFwiLi9wcm9qZWN0LmpzXCI7XG5cbmZ1bmN0aW9uIGxvYWRQYWdlKCkge1xuXHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxvYWRMYXlvdXQoKSk7XG59XG5cbmxvYWRQYWdlKCk7XG5wcm9qZWN0TW9kdWxlLnByb2plY3REb20oKTtcbnByb2plY3RNb2R1bGUuaGVsbG8oKTtcbmFkZFByb2plY3RCdXR0b24oXCJwcm9qZWN0cy1jb250YWluZXJcIik7XG5wcm9qZWN0TW9kdWxlLmFkZFByb2plY3QoXCJwcm9qZWN0LWZvcm1cIik7XG5wcm9qZWN0TW9kdWxlLmFkZFRvZG8oXCJhZGQtdG9kb1wiKTtcblxuY29uc29sZS5sb2coXCJoZWxsbyFcIik7XG4iXSwic291cmNlUm9vdCI6IiJ9