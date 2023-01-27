import { notesArr, projArr } from "./main";

export function createNote(text, date) {
    console.log(date);
    const note = document.createElement('div');

    const noteDiv = document.createElement('div');
    noteDiv.classList.add('note-div');

    const para = document.createElement('p');
    para.innerText = text;

    note.appendChild(noteDiv);
    noteDiv.appendChild(para);

    if(text !== 'No notes!' && text !== "No projects!") {
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        
        const btnDiv = document.createElement('div');
        btnDiv.classList.add('btn-div');
        
        const del = document.createElement('button');
        del.classList.add('del-btn', 'btn-close');
        
        const todoDate = document.createElement('time');
        todoDate.innerText = date;

        note.appendChild(btnDiv);
        noteDiv.insertBefore(checkbox, para);
        if (date !== undefined) btnDiv.appendChild(todoDate);
        btnDiv.appendChild(del);
    }
    
    return note;
}

export function createPage(tab) {
    const content = document.querySelector('.content');
    content.innerHTML = '';

    const main = document.createElement('div');
    main.setAttribute('id', tab);

    const tabHeader = document.createElement('h1');
    tabHeader.classList.add('tab-header');
    tabHeader.innerText = tab;
    
    content.appendChild(main);
    main.appendChild(tabHeader);
    return main;
}

export function createProject(main, i) {
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

    return main;
}

export function createProjectTodo(item, i) {
    const body = document.createElement('div');
    const collapse = document.createElement('div');
    const addTodoDiv = document.createElement('div');
    const addTodo = document.createElement('input');
    const addTodoBtn = document.createElement('button');
    const delProjBtn = document.createElement('button');
    //set atr
    collapse.classList.add('accordion-collapse', 'collapse');
    collapse.setAttribute('id', `collapse${i}`);
    collapse.setAttribute('data-bs-parent', '.accordion');
    addTodoDiv.classList.add('todo-div');
    addTodo.setAttribute('type', 'text');
    addTodo.setAttribute('placeholder', 'add todo');
    addTodoBtn.classList.add('add-todo','btn','btn-outline-success');
    addTodoBtn.innerText = '+'
    delProjBtn.classList.add('del-project', 'btn', 'btn-outline-danger');
    delProjBtn.innerText = 'delete project';
    body.classList.add('accordion-body');
    //append
    item.appendChild(collapse);
    collapse.appendChild(body);
    
    projArr[i].projectTodos.forEach((todo, x) => {
        const note = createNote(todo);
        note.classList.add('list-item', `${x}`);
        body.appendChild(note);                
    })
    addTodoDiv.appendChild(addTodo);
    addTodoDiv.appendChild(addTodoBtn);
    addTodoDiv.appendChild(delProjBtn);
    collapse.appendChild(addTodoDiv)

    return item;
}