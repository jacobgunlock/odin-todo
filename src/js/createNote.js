export function createNote(text) {
    const note = document.createElement('div');

    const noteDiv = document.createElement('div');
    noteDiv.classList.add('note-div');

    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');

    const para = document.createElement('p');
    para.innerText = text;

    const btnDiv = document.createElement('div');
    btnDiv.classList.add('btn-div');

    const del = document.createElement('button');
    del.innerText = 'del';
    
    note.appendChild(noteDiv);
    note.appendChild(btnDiv);
    noteDiv.appendChild(checkbox);
    noteDiv.appendChild(para);
    btnDiv.appendChild(del);

    return note;
}