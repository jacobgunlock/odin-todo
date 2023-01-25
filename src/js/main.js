import * as bootstrap from 'bootstrap';
import { createNote } from './createNote';

class Note {
    constructor(note) {
        this.note = note;
        this.isDone = false;
    }
}

const notesArr = [];
const testNote = new Note('test note');
const testNote2 = new Note('test 2');
notesArr.push(testNote, testNote2);

class Project {
    constructor(project) {
        this.project = project;
        this.projectTodos = [];
    }
}

const projArr = [];

const testProject = new Project('test project');
const testProject2 = new Project('test project 2');

projArr.push(testProject);
projArr.push(testProject2);

testProject.projectTodos.push('hey new note');
testProject.projectTodos.push('and another');


function displayProjectTodo() {
    const listItems = document.getElementsByClassName('accordion-item');
    const x = document.getElementsByClassName('accordion-collapse');
    Array.from(x).forEach(div => div.innerHTML = '');
    Array.from(listItems).forEach((item, i) => {
        const body = document.createElement('div');
        const collapse = document.createElement('div');
        const addTodo = document.createElement('input');
        const addTodoBtn = document.createElement('button');
        
        collapse.classList.add('accordion-collapse', 'collapse');
        collapse.setAttribute('id', `collapse${i}`);
        collapse.setAttribute('data-bs-parent', '.accordion');
        addTodo.setAttribute('type', 'text');
        addTodo.setAttribute('placeholder', 'add todo');
        addTodoBtn.innerText = '+'
        addTodoBtn.addEventListener('click', addProjectTodo);
        body.classList.add('accordion-body');

        item.appendChild(collapse);
        collapse.appendChild(body);

        projArr[i].projectTodos.forEach((todo, x) => {
            const note = createNote(todo);
            note.classList.add('list-item', `${x}`);
            body.appendChild(note);                
        })
        body.appendChild(addTodo);
        body.appendChild(addTodoBtn);
    })
}



function displayProjects(main) {
    for (let i = 0; i < projArr.length; i++) {
        //create
        const item = document.createElement('div');
        const header = document.createElement('h2');
        const accBtn = document.createElement('button');
        
        //set atr
        main.classList.add('accordion');
        item.classList.add('accordion-item');
        item.setAttribute('id', i);
        header.classList.add('accordion-header');
        header.setAttribute('id', `heading${i}`);
        accBtn.classList.add('accordion-button');
        accBtn.setAttribute('data-bs-toggle', 'collapse');
        accBtn.setAttribute('data-bs-target', `#collapse${i}`);
        accBtn.innerText = projArr[i].project;
        
        //append
        main.appendChild(item);
        item.appendChild(header);
        header.appendChild(accBtn);
    } 
    displayProjectTodo();
}

function addProjectTodo() {
    const note = this.previousElementSibling;
    const currProj = this.parentNode.parentNode.parentNode.id;
    projArr[currProj].projectTodos.push(note.value);
    updateProjTodos(note)
}

function updateProjTodos(note) {
    const parent = note.parentNode;
    const input = parent.lastChild.previousElementSibling;
    const todo = createNote(note.value);
    todo.classList.add('list-item');
    parent.insertBefore(todo, input);
    note.value = '';
    console.log(projArr);

}

function displayModal(){
    const content = document.querySelector('.modal-content');
    const currTab = document.querySelector('.content').firstChild.id;
    const title = document.querySelector('.modal-title');
    const body = document.querySelector('.modal-body');
    const todoTitle = document.querySelector('.todo-title');
    todoTitle.value = '';
    const todoDate = document.querySelector('.todo-date');
    todoDate.value = '';
    content.setAttribute('id', currTab);

    if (currTab === 'Projects') {
        title.innerText = 'New Project'
        todoTitle.setAttribute('placeholder', 'Project Name');
    } else {
        title.innerText = 'New To-Do'
        todoTitle.setAttribute('placeholder', 'Todo');
    }
}

function displayPage(tab) {
    const content = document.querySelector('.content');
    content.innerHTML = '';
    const main = document.createElement('div');
    main.setAttribute('id', tab);
    const tabHeader = document.createElement('h1');
    tabHeader.classList.add('tab-header');
    tabHeader.innerText = tab;
    
    content.appendChild(main);
    main.appendChild(tabHeader);
    
    if (tab !== 'Projects') {
        for (let i = 0; i < notesArr.length; i++) {
            const note = createNote(notesArr[i].note);
            note.classList.add('list-item');
            main.appendChild(note);
        }
    }
    if (tab === 'Projects') {
        displayProjects(main);
    };
};

//init
displayPage('Projects');

//listen
const navBtns = document.querySelectorAll('.navbtn');
navBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const content = document.querySelector('.content');
        if (e.target.innerText === content.firstChild.id) return;
        content.innerHTML = '';
        displayPage(btn.innerText);
    })
});

const addBtn = document.querySelector('.add');
addBtn.addEventListener('click', () => {
    displayModal();
});

const saveBtn = document.querySelector('.save-btn');
saveBtn.addEventListener('click', () => {
    const currTab = saveBtn.parentElement.parentElement.id;
    const title = document.querySelector('.todo-title').value;
    const date = document.querySelector('.todo-date').value;
    if (currTab !== 'Projects') {
        const todo = new Note(title)
        notesArr.push(todo);
        displayPage(currTab);
    } else {
        const project = new Project(title);
        projArr.push(project);
        displayPage(currTab);
    }
})
