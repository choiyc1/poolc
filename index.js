

let todoList=[
    {id:1, label:"일어나기", completed:false},
    {id:2, label:"아침먹기", completed:false},
    {id:3, label:"학교가기", completed:false},
];

const addTodo=(label)=>{
    const todo={
        id: new Date().getMilliseconds(),
        label: label, 
        completed: false,
    };

    todoList=[...todoList, todo];    
};

const deleteTodo=(targetId)=>{
    const newTodoList=todoList.filter(({id})=>id !== targetId);//filter는 이런 조건을 만족 시키는 친구들만 남겨놓아라
    // 이 {id} 는 구조 분해 할당이다
    todoList=newTodoList
};

const completeTodo=(targetId)=>{
    const newTodoList= todoList.map((todo)=>{
        if(todo.id===targetId){
            return {...todo, completed: true};
        }

        return todo;
    });
    todoList=newTodoList;

};

const renderTodo =(todo)=>{
    const todoLabel=document.createElement("p");
    todoLabel.className="todo-label";
    todoLabel.innerText=todo.label;

    const renameButton=document.createElement("button");
    renameButton.classList.add("todo-action");
    renameButton.classList.add("rename");   
    renameButton.innerText="수정";
    renameButton.onclick=()=>{
        let newlabel=prompt();
        todo.label=newlabel;
        renderTodoList();
    }

    const completeButton=document.createElement("button");
    completeButton.classList.add("todo-action");
    completeButton.classList.add("complete");
    completeButton.innerText="미완료";
    completeButton.onclick=()=>{
        completeTodo(todo.id);
        renderTodoList();
    };

    const deleteButton=document.createElement("button");
    deleteButton.classList.add("todo-action");
    deleteButton.classList.add("delete");
    deleteButton.innerText="삭제"
    deleteButton.onclick=()=>{
        deleteTodo(todo.id);
        renderTodoList();
    };

    const todoActionWrapper=document.createElement("div");
    todoActionWrapper.className="todo-action-wrapper";

    if(todo.completed){
        completeButton.innerText="완료";
        todoLabel.classList.toggle("strikeout");
    }

    todoActionWrapper.appendChild(completeButton);

    todoActionWrapper.appendChild(deleteButton);

    todoActionWrapper.appendChild(renameButton);

    const todoWrapper=document.createElement("div");
    todoWrapper.className="todo-wrapper";
    todoWrapper.appendChild(todoLabel);
    todoWrapper.appendChild(todoActionWrapper);

    const content=document.getElementById('content');
    content.appendChild(todoWrapper);

};

const makeactionwrapper=()=>{
    const actionwrapper=document.getElementById("action-wrapper");
    const addaction=document.getElementById("add-action");

    addaction.onclick=()=>{
        var label =prompt();
        addTodo(label);
        renderTodoList();
    };

    // addaction.appendChild(actionwrapper);

}

const renderTodoList=()=>{
    const content=document.getElementById("content");
    content.innerHTML="";

    todoList.forEach((todo)=>{
        renderTodo(todo);
    });
    
    makeactionwrapper();
};




renderTodoList();
