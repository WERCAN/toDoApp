var form = document.getElementById('form')
var input = document.getElementById('input');
var itemList = document.querySelector('.item-list');
var clearBtn = document.getElementById('clear');
var addBtn = document.getElementById('add');
var tasks = document.getElementById("tasks");
var todosTask = document.getElementById('todos-task');
var trash = document.getElementById('trash');

var todos = JSON.parse(localStorage.getItem('notes'));

var goal = 0;


if (todos) {
    todos.forEach((todo) => {
        dodo(todo);
    });
}

//********execute the function when entered**************/

form.addEventListener("submit", (e) => {
    e.preventDefault();

    dodo();
});

//********Main Function ***********/

function dodo(todo) {

    let todoText = input.value;
    let item = document.createElement('li');
    item.classList.add("liEl");
    item.id = "liEl";


    //********* When page renewed items stay ********//
    if (todo) {
        todoText = todo.text;
    }

    if (todoText) {

        if (todo && todo.done) {
            item.classList.add('done');
        }

        item.innerText = todoText;

        itemList.appendChild(item);

        input.value = '';

        //********Items line through and removed when clicked********** */

        item.addEventListener('click', () => {
            item.classList.toggle('done');
            StorageItem();
        });

        item.addEventListener('contextmenu', (e) => {
            e.preventDefault();

            item.remove();
            StorageItem();
        });


        //--------Delete li element when clicked letter X----------

        let deleteBtn = document.createElement('a');
        deleteBtn.setAttribute("href", "#");
        deleteBtn.innerText = "X";
        item.appendChild(deleteBtn);

        deleteBtn.addEventListener('click', () => {
            item.remove();
            StorageItem();
        })


        StorageItem();
    }
}

//------------make new task list when click Add button----------

function addFn() {

    if (itemList.firstChild) {
        todosTask.innerHTML +=
            `<div class="task-box" id="box">
                    <div class="tools">
                         <strong contentEditable="true" class="task-name">Name your task</strong>
                        <button class="trash" id="trash"><i class="fas fa-trash-alt"></i>
                        </button>
                        <button class="palette"><i class="fas fa-palette"></i>
                        </button>
                    </div>
                    <div class="todo-task" id="todo-task">
                        <ul class="item-list2" id="item-list2">
                            
                     
                        </ul>    
                    </div>
                </div>`;

        const ulNew = document.getElementById("item-list2");

        while (itemList.hasChildNodes()) {
            ulNew.appendChild(itemList.firstChild);
        }
    }

    itemList.innerHTML = '';
    StorageItem();
}

// ***********LocalStorage***************

function StorageItem() {

    let itemEl = document.querySelectorAll('li');

    var notes = [];

    itemEl.forEach((item) => {
        notes.push({
            text: item.innerText,
            done: item.classList.contains('done'),
        });
    });

    localStorage.setItem('notes', JSON.stringify(notes));

}
//-------------Clear All list--------------

clearBtn.addEventListener('click', function() {
    localStorage.clear();


    itemList.innerHTML = '';
    // while (itemList.hasChildNodes()) {
    //     itemList.removeChild(itemList.firstChild);
    // }

    StorageItem();
})