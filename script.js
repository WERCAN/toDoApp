let form = document.getElementById('form')
let input = document.getElementById('input');
var itemList = document.querySelector('.item-list');
let button = document.querySelector('button');

var todos = JSON.parse(localStorage.getItem('notes'));



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

        let deleteBtn = document.createElement('a');
        deleteBtn.setAttribute("href", "#");
        deleteBtn.innerText = "X";
        item.appendChild(deleteBtn);

        deleteBtn.addEventListener('click', (e) => {
            item.remove();
            StorageItem();
        })

        StorageItem();
    }
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

button.addEventListener('click', function() {
    localStorage.clear();

    while (itemList.hasChildNodes()) {
        itemList.removeChild(itemList.firstChild);
    }

})