"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* ===Project Type Start */
/* this replaces the literal type */
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
var Project = /** @class */ (function () {
    function Project(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
    return Project;
}());
var ProjectState = /** @class */ (function () {
    function ProjectState() {
        this.listeners = [];
        this.projects = [];
    }
    ProjectState.getInstance = function () {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    };
    /* <<<singleton */
    ProjectState.prototype.addListener = function (listenerFn) {
        this.listeners.push(listenerFn);
    };
    ProjectState.prototype.addProject = function (title, description, numOfPeople) {
        var newProject = new Project(Math.random().toString(), title, description, numOfPeople, ProjectStatus.Active);
        this.projects.push(newProject);
        for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
            var listenerFn = _a[_i];
            /* slice()  w/ no param will return a COPY of array */
            listenerFn(this.projects.slice());
        }
    };
    return ProjectState;
}());
var projectState = ProjectState.getInstance();
/* validator
takes in a Validatable
returns boolean */
function validate(validatableInput) {
    var isValid = true;
    /*  if required == true,
    check that this input has a value */
    if (validatableInput.required) {
        console.log("dmdddo" + validatableInput.value.toString().trim().length);
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    /* checking for input length */
    if (validatableInput.minLength != null
        && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length > validatableInput.minLength;
    }
    if (validatableInput.maxLength != null
        && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length < validatableInput.maxLength;
    }
    /* checking for input value min/max */
    if (validatableInput.min != null
        && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if (validatableInput.max != null
        && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
}
/* ===Validation end */
/* ===autobind decorator start */
/* decorator to use for some functions.
takes in 3 set-in-stone params,
returns a PropertyDescriptor ,
w/ target method bound to its intended object */
function autobind(_, _2, descriptor) {
    /* get original function */
    var originalMethod = descriptor.value;
    /* set modified PropertyDescriptor */
    var modiDescriptor = {
        /* ?? why this */
        configurable: true,
        /* a getter...
        ? is this called automatically? */
        get: function () {
            var boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return modiDescriptor;
}
/* ===autobind decorator end */
/* ===Component base start */
/* why the abstract? */
/* basically,
taking a template and attaching it to host
trying to use generic types, abstract class */
var Component = /** @class */ (function () {
    function Component(templateId, hostElementId, insertAtStart, newElementId) {
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostElementId);
        var importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach(insertAtStart);
    }
    /* where to attach is unknown,
    so we take one more param */
    Component.prototype.attach = function (insertAtBeginning) {
        this.hostElement.insertAdjacentElement(insertAtBeginning ? 'afterbegin' : 'beforeend', this.element);
    };
    return Component;
}());
/* ===Component base end */
/* ===ProjectList Class Start */
var ProjectList = /** @class */ (function (_super) {
    __extends(ProjectList, _super);
    /* extending a class, so most actions are done their.
    we just pass some params here to super() */
    function ProjectList(type) {
        var _this = _super.call(this, "project-list", //template id
        "app", // host id
        false, // where to attach
        type + "-projects" // if new elem, its id
        ) || this;
        _this.type = type;
        /* template */
        _this.templateElement = document.getElementById("project-list");
        _this.assignedProjects = [];
        /* now render elem
        attach is called at super()'s constructor*/
        _this.configure();
        _this.renderContent();
        return _this;
    }
    /* in case of event,
    configures projects to appropriate ul */
    ProjectList.prototype.configure = function () {
        var _this = this;
        projectState.addListener(function (projects) {
            var relevantProjects = projects.filter(function (prj) {
                if (_this.type === "active") {
                    return prj.status === ProjectStatus.Active;
                }
                return prj.status === ProjectStatus.Finished;
            });
            _this.assignedProjects = relevantProjects;
            _this.renderProjects();
        });
    };
    ProjectList.prototype.renderContent = function () {
        var listId = this.type + "-projects-list";
        this.element.querySelector("ul").id = listId;
        this.element.querySelector("h2").textContent
            = this.type.toUpperCase() + " PROJECTS";
    };
    /* i guess umm....asdfasdf dk */
    ProjectList.prototype.renderProjects = function () {
        /* get ul from html.
        possible since we added the id at
        ProjectList.renderContent() */
        var listEl = document.getElementById(this.type + "-projects-list");
        /* band-aid solution for this project.
        should keep a note on which is already in list and not
        for real projects*/
        listEl.innerHTML = "";
        /* for projects w/ changed stuff,
        create <li/>
        add textcontent,
        and add to <ul/> */
        for (var _i = 0, _a = this.assignedProjects; _i < _a.length; _i++) {
            var prjItem = _a[_i];
            var listItem = document.createElement('li');
            listItem.textContent = prjItem.title;
            listEl.appendChild(listItem);
        }
    };
    return ProjectList;
}(Component));
/* ===ProjectList Class end */
/*=== ProjectInput Class Start */
/* trying to access the `templates` in index.html.
?but why use class? */
var ProjectInput = /** @class */ (function (_super) {
    __extends(ProjectInput, _super);
    function ProjectInput() {
        var _this = _super.call(this, 'project-input', 'app', true, 'user-input') || this;
        /* most functionality movedto Component Class */
        /* assigning handlers its HTML elems */
        _this.titleInputHandler = _this.element.querySelector("#title");
        // ??is this... hm.. input?
        _this.descInputHandler = _this.element.querySelector("#description");
        _this.userNumHandler = _this.element.querySelector("#people");
        // this.submitButtonHandler = this.elem.querySelector("")
        /* deals with submission
        calls submitHandler function*/
        _this.configure();
        return _this;
    }
    ProjectInput.prototype.configure = function () {
        /* remember to bind */
        this.element.addEventListener("submit", this.submitHandler);
    };
    ProjectInput.prototype.renderContent = function () {
    };
    /* gather and validate user input */
    ProjectInput.prototype.gatherUserInput = function () {
        /* get the values from class property */
        var enteredTitle = this.titleInputHandler.value;
        var enteredDescription = this.descInputHandler.value;
        var enteredPeople = this.userNumHandler.value;
        /* create Validatable type objects from obtained values */
        var titleValidatable = {
            value: enteredTitle,
            required: true
        };
        var descriptionValidatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        };
        var peopleValidatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 30
        };
        /* validate using validate() */
        /* if one of these fail, call alert() and return
        else, return the input in tuple form */
        if (!validate(titleValidatable) ||
            !validate(descriptionValidatable) ||
            !validate(peopleValidatable)) {
            alert('dmddo, Invalid input, please try again!');
            return;
        }
        else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    };
    /* clr */
    ProjectInput.prototype.clearInputs = function () {
        this.titleInputHandler.value = '';
        this.descInputHandler.value = '';
        this.userNumHandler.value = '';
    };
    /* ?why should decorator be one this function? */
    /* used at configure()
    takes in event,
    does stuff */
    ProjectInput.prototype.submitHandler = function (event) {
        /* ?no idea what this does */
        event.preventDefault();
        /* parse userinput,
        create project
        add to list */
        var userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            var title = userInput[0], desc = userInput[1], people = userInput[2];
            projectState.addProject(title, desc, people);
            this.clearInputs();
        }
    };
    __decorate([
        autobind
    ], ProjectInput.prototype, "submitHandler", null);
    return ProjectInput;
}(Component));
/* ===ProjectInput Class end */
var prjInput = new ProjectInput();
var activePrjList = new ProjectList("active");
var finishedPrjList = new ProjectList("finished");
