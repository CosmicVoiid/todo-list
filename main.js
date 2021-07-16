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
	const title = document.createElement("div");
	projects.setAttribute("id", "projects-container");
	title.setAttribute("id", "projects-title");
	title.textContent = "Projects";
	projects.appendChild(title);

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
	content.setAttribute("id", "content");

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
	constructor(projectName, description, todoList) {
		this.projectName = projectName;
		this.description = description;
		this.todoList = todoList;
	}

	getName() {
		return projectName;
	}
}

const projectModule = (() => {
	let projectArray = [];

	function addProject(id) {
		const form = document.querySelector(`#${id}`);
		const projectName = document.querySelector("#project-name");
		console.log(form);
		form.addEventListener("submit", (e) => {
			e.preventDefault();
			const modalOverlay = document.querySelector("#modal-overlay");
			const modal = document.querySelector("#modal");
			modalOverlay.classList.toggle("closed");
			modal.classList.toggle("closed");

			projectArray.push(projectName.value);
			console.log(projectArray);
		});
	}

	return { addProject };
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

console.log("hellodas!");

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbGF5b3V0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2RhbC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsaUVBQWUsVUFBVSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUMvRDFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOENBQThDLEdBQUc7QUFDakQ7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7O0FBRUEsaUVBQWUsZ0JBQWdCLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ3hFaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSwwQ0FBMEMsR0FBRztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUEsU0FBUztBQUNULENBQUM7O0FBRUQsaUVBQWUsYUFBYSxFQUFDOzs7Ozs7O1VDbEM3QjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7O0FDTnFDO0FBQ0s7QUFDRDs7QUFFekM7QUFDQSwyQkFBMkIsbURBQVU7QUFDckM7O0FBRUE7QUFDQSxrREFBZ0I7QUFDaEIsMkRBQXdCOztBQUV4QiIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gbG9hZEhlYWRlcigpIHtcblx0Y29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhlYWRlclwiKTtcblx0Y29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG5cdHRpdGxlLnRleHRDb250ZW50ID0gXCJUby1EbyBMaXN0XCI7XG5cdGhlYWRlci5hcHBlbmRDaGlsZCh0aXRsZSk7XG5cblx0cmV0dXJuIGhlYWRlcjtcbn1cblxuZnVuY3Rpb24gbG9hZFByb2plY3RzKCkge1xuXHRjb25zdCBwcm9qZWN0cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0cHJvamVjdHMuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJwcm9qZWN0cy1jb250YWluZXJcIik7XG5cdHRpdGxlLnNldEF0dHJpYnV0ZShcImlkXCIsIFwicHJvamVjdHMtdGl0bGVcIik7XG5cdHRpdGxlLnRleHRDb250ZW50ID0gXCJQcm9qZWN0c1wiO1xuXHRwcm9qZWN0cy5hcHBlbmRDaGlsZCh0aXRsZSk7XG5cblx0cmV0dXJuIHByb2plY3RzO1xufVxuXG5mdW5jdGlvbiBsb2FkU2lkZWJhcigpIHtcblx0Y29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0Y29udGFpbmVyLnNldEF0dHJpYnV0ZShcImlkXCIsIFwic2lkZWJhclwiKTtcblxuXHRjb250YWluZXIuYXBwZW5kQ2hpbGQobG9hZFByb2plY3RzKCkpO1xuXG5cdHJldHVybiBjb250YWluZXI7XG59XG5cbmZ1bmN0aW9uIGxvYWRDb250ZW50KCkge1xuXHRjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0Y29udGVudC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImNvbnRlbnRcIik7XG5cblx0cmV0dXJuIGNvbnRlbnQ7XG59XG5cbmZ1bmN0aW9uIGNvbnRlbnRDb250YWluZXIoKSB7XG5cdGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImNvbnRlbnQtY29udGFpbmVyXCIpO1xuXHRjb250YWluZXIuYXBwZW5kQ2hpbGQobG9hZFNpZGViYXIoKSk7XG5cdGNvbnRhaW5lci5hcHBlbmRDaGlsZChsb2FkQ29udGVudCgpKTtcblxuXHRyZXR1cm4gY29udGFpbmVyO1xufVxuXG5mdW5jdGlvbiBsb2FkRm9vdGVyKCkge1xuXHRjb25zdCBmb290ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9vdGVyXCIpO1xuXG5cdHJldHVybiBmb290ZXI7XG59XG5cbmZ1bmN0aW9uIGxvYWRMYXlvdXQoKSB7XG5cdGNvbnN0IG1haW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRtYWluLnNldEF0dHJpYnV0ZShcImlkXCIsIFwibWFpblwiKTtcblxuXHRtYWluLmFwcGVuZENoaWxkKGxvYWRIZWFkZXIoKSk7XG5cdG1haW4uYXBwZW5kQ2hpbGQoY29udGVudENvbnRhaW5lcigpKTtcblx0bWFpbi5hcHBlbmRDaGlsZChsb2FkRm9vdGVyKCkpO1xuXG5cdHJldHVybiBtYWluO1xufVxuXG5leHBvcnQgZGVmYXVsdCBsb2FkTGF5b3V0O1xuIiwiZnVuY3Rpb24gZm9ybSgpIHtcblx0Y29uc3QgcHJvamVjdEZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKTtcblx0Y29uc3QgcHJvamVjdE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG5cdGNvbnN0IHByb2plY3REZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiKTtcblx0Y29uc3QgZW50ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG5cblx0cHJvamVjdEZvcm0uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJwcm9qZWN0LWZvcm1cIik7XG5cdHByb2plY3ROYW1lLnNldEF0dHJpYnV0ZShcImlkXCIsIFwicHJvamVjdC1uYW1lXCIpO1xuXHRwcm9qZWN0RGVzY3JpcHRpb24uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJwcm9qZWN0LWRlc2NyaXB0aW9uXCIpO1xuXHRlbnRlci5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImVudGVyXCIpO1xuXG5cdHByb2plY3RGb3JtLnNldEF0dHJpYnV0ZShcInJlcXVpcmVkXCIsIFwicmVxdWlyZWRcIik7XG5cdHByb2plY3ROYW1lLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0XCIpO1xuXHRwcm9qZWN0TmFtZS5zZXRBdHRyaWJ1dGUoXCJyZXF1aXJlZFwiLCBcInJlcXVpcmVkXCIpO1xuXHRlbnRlci5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwic3VibWl0XCIpO1xuXG5cdHByb2plY3ROYW1lLnNldEF0dHJpYnV0ZShcIm1heGxlbmd0aFwiLCBcIjEwXCIpO1xuXHRwcm9qZWN0RGVzY3JpcHRpb24uc2V0QXR0cmlidXRlKFwibWF4bGVuZ3RoXCIsIFwiNTBcIik7XG5cblx0cHJvamVjdE5hbWUuc2V0QXR0cmlidXRlKFwicGxhY2Vob2xkZXJcIiwgXCJOYW1lXCIpO1xuXHRwcm9qZWN0RGVzY3JpcHRpb24uc2V0QXR0cmlidXRlKFwicGxhY2Vob2xkZXJcIiwgXCJEZXNjcmlwdGlvblwiKTtcblx0ZW50ZXIudGV4dENvbnRlbnQgPSBcIkVudGVyXCI7XG5cblx0cHJvamVjdEZvcm0uYXBwZW5kQ2hpbGQocHJvamVjdE5hbWUpO1xuXHRwcm9qZWN0Rm9ybS5hcHBlbmRDaGlsZChwcm9qZWN0RGVzY3JpcHRpb24pO1xuXHRwcm9qZWN0Rm9ybS5hcHBlbmRDaGlsZChlbnRlcik7XG5cblx0cmV0dXJuIHByb2plY3RGb3JtO1xufVxuXG5mdW5jdGlvbiBhZGRNb2RhbCgpIHtcblx0Y29uc3QgbWFpbkRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFpblwiKTtcblx0Y29uc3QgbW9kYWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRjb25zdCBtb2RhbE92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRjb25zdCBjbG9zZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdGNsb3NlQnRuLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiY2xvc2UtYnRuXCIpO1xuXG5cdGNsb3NlQnRuLnRleHRDb250ZW50ID0gXCJYXCI7XG5cdG1vZGFsLnNldEF0dHJpYnV0ZShcImlkXCIsIFwibW9kYWxcIik7XG5cdG1vZGFsT3ZlcmxheS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcIm1vZGFsLW92ZXJsYXlcIik7XG5cdG1vZGFsLmNsYXNzTGlzdC5hZGQoXCJtb2RhbFwiLCBcImNsb3NlZFwiKTtcblx0bW9kYWxPdmVybGF5LmNsYXNzTGlzdC5hZGQoXCJtb2RhbC1vdmVybGF5XCIsIFwiY2xvc2VkXCIpO1xuXG5cdGNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0bW9kYWxPdmVybGF5LmNsYXNzTGlzdC50b2dnbGUoXCJjbG9zZWRcIik7XG5cdFx0bW9kYWwuY2xhc3NMaXN0LnRvZ2dsZShcImNsb3NlZFwiKTtcblx0fSk7XG5cblx0bW9kYWwuYXBwZW5kQ2hpbGQoY2xvc2VCdG4pO1xuXHRtb2RhbC5hcHBlbmRDaGlsZChmb3JtKCkpO1xuXHRtYWluRGl2LmFwcGVuZENoaWxkKG1vZGFsKTtcblx0bWFpbkRpdi5hcHBlbmRDaGlsZChtb2RhbE92ZXJsYXkpO1xufVxuXG5mdW5jdGlvbiBhZGRQcm9qZWN0QnV0dG9uKGlkKSB7XG5cdGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2lkfWApO1xuXHRjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXHRidXR0b24udGV4dENvbnRlbnQgPSBcIisgQWRkIFByb2plY3RcIjtcblxuXHRjb250YWluZXIuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcblx0YWRkTW9kYWwoKTtcblxuXHRidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRjb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbW9kYWxcIik7XG5cdFx0Y29uc3QgbW9kYWxPdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtb2RhbC1vdmVybGF5XCIpO1xuXHRcdG1vZGFsT3ZlcmxheS5jbGFzc0xpc3QudG9nZ2xlKFwiY2xvc2VkXCIpO1xuXHRcdG1vZGFsLmNsYXNzTGlzdC50b2dnbGUoXCJjbG9zZWRcIik7XG5cdH0pO1xuXG5cdHJldHVybiBjb250YWluZXI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFkZFByb2plY3RCdXR0b247XG4iLCJjbGFzcyBQcm9qZWN0IHtcblx0Y29uc3RydWN0b3IocHJvamVjdE5hbWUsIGRlc2NyaXB0aW9uLCB0b2RvTGlzdCkge1xuXHRcdHRoaXMucHJvamVjdE5hbWUgPSBwcm9qZWN0TmFtZTtcblx0XHR0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG5cdFx0dGhpcy50b2RvTGlzdCA9IHRvZG9MaXN0O1xuXHR9XG5cblx0Z2V0TmFtZSgpIHtcblx0XHRyZXR1cm4gcHJvamVjdE5hbWU7XG5cdH1cbn1cblxuY29uc3QgcHJvamVjdE1vZHVsZSA9ICgoKSA9PiB7XG5cdGxldCBwcm9qZWN0QXJyYXkgPSBbXTtcblxuXHRmdW5jdGlvbiBhZGRQcm9qZWN0KGlkKSB7XG5cdFx0Y29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2lkfWApO1xuXHRcdGNvbnN0IHByb2plY3ROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0LW5hbWVcIik7XG5cdFx0Y29uc29sZS5sb2coZm9ybSk7XG5cdFx0Zm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChlKSA9PiB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRjb25zdCBtb2RhbE92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21vZGFsLW92ZXJsYXlcIik7XG5cdFx0XHRjb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbW9kYWxcIik7XG5cdFx0XHRtb2RhbE92ZXJsYXkuY2xhc3NMaXN0LnRvZ2dsZShcImNsb3NlZFwiKTtcblx0XHRcdG1vZGFsLmNsYXNzTGlzdC50b2dnbGUoXCJjbG9zZWRcIik7XG5cblx0XHRcdHByb2plY3RBcnJheS5wdXNoKHByb2plY3ROYW1lLnZhbHVlKTtcblx0XHRcdGNvbnNvbGUubG9nKHByb2plY3RBcnJheSk7XG5cdFx0fSk7XG5cdH1cblxuXHRyZXR1cm4geyBhZGRQcm9qZWN0IH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBwcm9qZWN0TW9kdWxlO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgbG9hZExheW91dCBmcm9tIFwiLi9sYXlvdXQuanNcIjtcbmltcG9ydCBhZGRQcm9qZWN0QnV0dG9uIGZyb20gXCIuL21vZGFsLmpzXCI7XG5pbXBvcnQgcHJvamVjdE1vZHVsZSBmcm9tIFwiLi9wcm9qZWN0LmpzXCI7XG5cbmZ1bmN0aW9uIGxvYWRQYWdlKCkge1xuXHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxvYWRMYXlvdXQoKSk7XG59XG5cbmxvYWRQYWdlKCk7XG5hZGRQcm9qZWN0QnV0dG9uKFwicHJvamVjdHMtY29udGFpbmVyXCIpO1xucHJvamVjdE1vZHVsZS5hZGRQcm9qZWN0KFwicHJvamVjdC1mb3JtXCIpO1xuXG5jb25zb2xlLmxvZyhcImhlbGxvZGFzIVwiKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=