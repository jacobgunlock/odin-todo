import * as bootstrap from 'bootstrap';
import { createNote, createPage, createProject, createProjectTodo } from './createNote';

export const notesArr = [];
class Note {
    constructor(note, date) {
        this.note = note;
        this.date = date;
        this.isDone = false;
    }
}

export const projArr = [];
class Project {
    constructor(project) {
        this.project = project;
        this.projectTodos = [];
    }
}

function displayPage(tab) {
    const main = createPage(tab);
    if (tab !== 'Projects') {
        if (notesArr.length === 0) {
            const note = createNote('No notes!');
            note.classList.add('list-item');
            main.appendChild(note);
        };
        for (let i = 0; i < notesArr.length; i++) {
            const note = createNote(notesArr[i].note, notesArr[i].date);
            note.classList.add('list-item');
            note.setAttribute('id', i);
            main.appendChild(note);
        }
    }
    if (tab === 'Projects') {
        displayProjects(main);
    };
    
    const delBtn = document.querySelectorAll('.del-btn');
    delBtn.forEach(btn => {
        btn.addEventListener('click', deleteNote);
    })
};

function displayProjects(main) {
    if (projArr.length === 0) {
        const note = createNote('No projects!');
        note.classList.add('list-item');
        main.appendChild(note);
    }
    for (let i = 0; i < projArr.length; i++) {
        createProject(main, i);
    }
    displayProjectTodo();
}

function displayProjectTodo() {
    const listItems = document.getElementsByClassName('accordion-item');
    const x = document.getElementsByClassName('accordion-collapse');
    Array.from(x).forEach(div => div.innerHTML = '');
    
    Array.from(listItems).forEach((item, i) => {
        const todo = createProjectTodo(item, i);
    })

    const addTodoBtns = document.querySelectorAll('.add-todo');
    addTodoBtns.forEach(btn => btn.addEventListener('click', addProjectTodo));

    const delProjBtn = document.querySelectorAll('.del-project');
    delProjBtn.forEach(btn => btn.addEventListener('click', deleteProject));
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
    document.querySelector('.todo-title')
}

function addProjectTodo() {
    const note = this.previousElementSibling;
    const currProj = this.parentNode.parentNode.parentNode.id;
    projArr[currProj].projectTodos.unshift(note.value);
    updateProjTodosDisplay(note)
}

function updateProjTodosDisplay(note) {
    const parent = note.parentNode.parentNode;
    const input = parent.lastChild.previousElementSibling;
    const todo = createNote(note.value);
    todo.classList.add('list-item');
    parent.appendChild(todo);
    note.value = '';
    const delBtn = document.querySelectorAll('.del-btn');
    delBtn.forEach(btn => {
        btn.addEventListener('click', deleteNote);
    })
}

function deleteNote() {
    const currTab = document.querySelector('.content').firstChild.id;
    const currNote = this.parentNode.parentNode;
    const currProj = currNote.parentNode.parentNode;
    if(currTab !== 'Projects') {
        const index = notesArr.findIndex(x => x.note === currNote.firstChild.lastChild.innerText);
        notesArr.splice(index, 1);
        currNote.parentNode.removeChild(currNote);
        displayPage(currTab)
    } else if (currTab === 'Projects') {
        const listItems = document.querySelectorAll('.list-item');
        listItems.forEach((item, i) => {
            if (item.contains(currNote)) {
                console.log(currProj.id);
                projArr[currProj.id].projectTodos.splice(i, 1);
                currNote.parentNode.removeChild(currNote);
            };
        })
    }
}

function deleteProject() {
    const currProj = this.parentNode.parentNode.parentNode;
    projArr.splice(currProj.id, 1);
    currProj.parentNode.removeChild(currProj);
    displayPage('Projects');
}

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
    if (title === '') return;
    if (currTab !== 'Projects') {
        const todo = new Note(title, date)
        notesArr.push(todo);
        displayPage(currTab);
    } else {
        const project = new Project(title, date);
        projArr.push(project);
        displayPage(currTab);
    }
})

