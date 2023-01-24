import * as bootstrap from 'bootstrap';

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
testProject2.projectTodos.push('please');



function displayTab(tab) {
    const content = document.querySelector('.content');
    const main = document.createElement('div');
    const tabHeader = document.createElement('h1');
    tabHeader.classList.add('tab-header');
    tabHeader.innerText = tab;
    content.appendChild(main);
    main.appendChild(tabHeader);

    if (tab !== 'Projects') {
        for (let i = 0; i < notesArr.length; i++) {
            //create elements
            const noteDiv = document.createElement('div');
            const checkbox = document.createElement('input');
            const para = document.createElement('p');
            const btnDiv = document.createElement('div');
            const edit = document.createElement('button');
            const del = document.createElement('button');
            const note = document.createElement('div');
            //set atr
            main.setAttribute('id', tab);
            noteDiv.classList.add('note-div');
            checkbox.setAttribute('type', 'checkbox');
            para.innerText = notesArr[i].note;
            btnDiv.classList.add('btn-div');
            edit.innerText = 'edit';
            del.innerText = 'del';
            note.classList.add('list-item', `${i}`);
            //append 
            noteDiv.appendChild(checkbox);
            noteDiv.appendChild(para);
            btnDiv.appendChild(edit);
            btnDiv.appendChild(del);
            main.appendChild(note);
            note.appendChild(noteDiv);
            note.appendChild(btnDiv);
        }
    }
    if (tab === 'Projects') {
        for (let i = 0; i < projArr.length; i++) {
            //create
            const item = document.createElement('div');
            const header = document.createElement('h2');
            const accBtn = document.createElement('button');
            const collapse = document.createElement('div');
            const body = document.createElement('div');
            
            //set atr
            main.classList.add('accordion');
            item.classList.add('accordion-item', i);
            header.classList.add('accordion-header');
            header.setAttribute('id', `heading${i}`);
            accBtn.classList.add('accordion-button');
            accBtn.setAttribute('data-bs-toggle', 'collapse');
            accBtn.setAttribute('data-bs-target', `#collapse${i}`);
            accBtn.innerText = projArr[i].project;
            collapse.classList.add('accordian-collapse', 'collapse');
            collapse.setAttribute('id', `collapse${i}`);
            collapse.setAttribute('data-bs-parent', '.accordion');
            body.classList.add('accordion-body');
            
            //append
            main.appendChild(item);
            item.appendChild(header);
            header.appendChild(accBtn);
            item.appendChild(collapse);
            collapse.appendChild(body);
            
            projArr[i].projectTodos.forEach((todo, x) => {
                const note = document.createElement('div');
                note.classList.add('list-item', `${x}`);
                note.innerText = todo;
                body.appendChild(note);                
            })
        }   
    };
};

//init
displayTab('Projects');

//listen
const navBtns = document.querySelectorAll('.navbtn');
navBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const content = document.querySelector('.content');
        if (e.target.innerText === content.firstChild.id) return;
        content.innerHTML = '';
        displayTab(btn.innerText);
    })
});
