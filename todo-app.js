(function() {

    let affairsList = [];

    let nameList = '';
    function getId(array)
    {
        let max = 0;
        for (let item of array)
        {
            if(item.id > max)
            {
                max = item.id
            }
        }
        return max + 1;
    }

    function createAppTitle(title)
    {
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }

    function highlightEvenItems(list) {
        const items = list.children;
    
        for (let i = 0; i < items.length; i++) {
            if (i % 2 === 1) {
                items[i].classList.toggle('highlight');
                affairsList[i].highlight = !affairsList[i].highlight;
            }
        }
        saveList(affairsList);
    }

    function highlightUnevenItems(list) {
        const items = list.children;
    
        for (let i = 0; i < items.length; i++) {
            if (i % 2 === 0) {
                items[i].classList.toggle('highlight');
                affairsList[i].highlight = !affairsList[i].highlight;
            }
        }
        saveList(affairsList);
    }

    function removeLastItem(list) {
        if (confirm('Вы уверены?')){
            const items = list.children;
            const lastItem = items[items.length - 1];
        
            if (lastItem) {
    
                affairsList.splice(affairsList.length-1, 1);
                lastItem.remove();
        
            }
            saveList(affairsList);
        }
    }

    function removeFirstItem(list) {
        if (confirm('Вы уверены?')){
            const items = list.children;
            const firstItem = items[0];
        
            if (firstItem) {
    
                firstItem.remove();
    
                affairsList.splice(0, 1);
        
                saveList(affairsList);
            }
        }
    }
    

    function createTodoItemForm(){
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = "Введите название нового дела";
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.textContent = 'Добавить дело';
        button.disabled = true;
        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        input.addEventListener('input', function(){
            button.disabled = false;
                if(!input.value)
                    {
                        button.disabled = true;
                    }
                });
        
        return {
            form,
            input,
            button,
        };
    }

    function createTodoList()
    {
        let list = document.createElement('ul');
        list.style.backgroundColor = 'darkgrey';
        list.classList.add('list-group');
        return list;
    }

    function createTodoItem(obj)
    {
        let item = document.createElement('li');

        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');


        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = obj.name;
        console.log(item.textContent)

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Удалить';

        if (obj.done){
            // item.classList.add('list-group-item-success');
            item.style.color = 'green';
            item.style.fontWeight = 'bold';
        }
        if(obj.highlight) {
            item.classList.toggle('highlight');
        }

        item.id = obj.id;

        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);
        console.log(item.textContent.slice(0, -13))

        doneButton.addEventListener('click', function(){

            for (let i = 0; i < affairsList.length; i++){
                if(affairsList[i].id === obj.id)
                {
                    affairsList[i].done = !affairsList[i].done;
                    let temp = affairsList[i];
                    affairsList.splice(i, 1);
                    affairsList.push(temp)
                    break;
                }
            }

            if(obj.done)
            {
                item.style.color = 'green';
                item.style.fontWeight = 'bold';
            }
            else {
                item.style.color = 'initial';
                item.style.fontWeight = 'initial';
            }

            if(obj.done)
            {
                let parent = item.parentElement;
                parent.removeChild(item);
                parent.appendChild(item);
            }


            // for (let item of affairsList){
            //     if(item.id === obj.id)
            //     {
            //         item.done = !item.done;
            //         console.log(affairsList);
            //     }
            // }

            // item.classList.toggle('list-group-item-success');
            saveList(affairsList);
        });

        deleteButton.addEventListener('click', function(){
            if (confirm('Вы уверены?')){
                for(let i = 0; i < affairsList.length; i++)
                {
                    if(affairsList[i].id === obj.id)
                    {
                        affairsList.splice(i, 1);
                    }
                }

                saveList(affairsList);
                item.remove();
            }
        });

        return {
            item,
            deleteButton,
            doneButton,
        }
    }

    function createTodoApp(container, title = 'Список дел', listName, def=[]) { 
        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();
        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);

        let highlightButtonEven = document.createElement('button');
        highlightButtonEven.classList.add('btn', 'btn-secondary');
        highlightButtonEven.textContent = 'Выделить четные';
        container.append(highlightButtonEven);

        let highlightButtonUneven = document.createElement('button');
        highlightButtonUneven.classList.add('btn', 'btn-secondary');
        highlightButtonUneven.textContent = 'Выделить нечетные';
        container.append(highlightButtonUneven);

        let removeLastButton = document.createElement('button');
        removeLastButton.classList.add('btn', 'btn-danger');
        removeLastButton.textContent = 'Удалить последний элемент';
        container.append(removeLastButton);

        let removeFirstButton = document.createElement('button');
        removeFirstButton.classList.add('btn', 'btn-danger');
        removeFirstButton.textContent = 'Удалить первый элемент';
        container.append(removeFirstButton);

        highlightButtonEven.addEventListener('click', function () {
            highlightEvenItems(todoList);
        });

        highlightButtonUneven.addEventListener('click', function () {
            highlightUnevenItems(todoList);
        });

        removeLastButton.addEventListener('click', function () {
            removeLastItem(todoList);
        });

        removeFirstButton.addEventListener('click', function () {
            removeFirstItem(todoList);
        });

        nameList = listName;

        let localData = localStorage.getItem(nameList);

        if(localData !== "" && localData !== null && localData !== "[]")
        {
            affairsList = JSON.parse(localData);
        }
        else if (def.length > 0)
        {
            affairsList = def;
        }

        if(affairsList.length > 0)
        {
            for(let obj of affairsList)
            {
                let todoItem = createTodoItem(obj);

                todoList.append(todoItem.item);
            }
        }

        todoItemForm.form.addEventListener('submit', function(e){

            e.preventDefault();

            if(!todoItemForm.input.value) {
                return;
            };

            let obj = {
                id : getId(affairsList),
                name : todoItemForm.input.value,
                done : false,
                highlight: false
            }

            affairsList.push(obj);

            console.log(affairsList);
            
            let todoItem = createTodoItem(obj);

            todoList.append(todoItem.item);

            todoItemForm.input.value = '';
            
            todoItemForm.button.disabled = true; 

            saveList(affairsList);  

            return false;
        });
    }

    function saveList(array)
    {
        localStorage.setItem(nameList, JSON.stringify(array));
    }

    window.createTodoApp = createTodoApp;
})();