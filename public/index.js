
let submit=document.querySelector('form')
let box=document.getElementsByClassName('color');
let task_container=document.getElementsByClassName('task-container')[0];
let wall=document.getElementsByClassName('walle')[0];
let get_color=`bg-emerald-200`;

function menu_helper(s,el){
    let active=document.getElementsByClassName(s)[0];
    active.classList.remove(s);
    active.classList.add('hidden');
    active=document.getElementsByClassName(`${el}`)[0];
    active.classList.remove('hidden');
    active.classList.add(s);
}
Array.from(document.getElementsByClassName('menu-list')).forEach((el)=>{
    el.addEventListener('click',(e)=>{
        document.body.getElementsByClassName('active-list')[0].classList.remove('active-list');
        el.classList.add('active-list');
        if(el.classList.contains('soon')){
            menu_helper('wall','comming-soon');
        }
        else{
            menu_helper('wall',el.id);
        }  
        

    })
})
document.getElementsByClassName('menu')[0].addEventListener('click',(e)=>{
    if(e.target.classList.contains('add-box')){
        task_container.classList.toggle('display-form')
    }
})
wall.addEventListener('click',(e)=>{
    if(e.target.classList.contains('add-task')) task_container.classList.toggle('display-form');
    else if(e.target.classList.contains('note-close')){
        localStorage.removeItem(`${e.target.parentElement.id}`);
        e.target.parentElement.remove();
    }
    
})

task_container.addEventListener('click',(e)=>{ // event delegation 
    if(e.target.classList.contains('remove-button')) e.target.parentElement.remove();

    else if(e.target.classList.contains('close-form')) task_container.classList.toggle('display-form');

    else if(e.target.classList.contains('add-button')){
        let bullets=document.getElementById('desc');
        let bullet_wrapper=document.getElementsByClassName('bullets-wrap')[0];
        bullet_wrapper.insertAdjacentHTML('afterbegin',`<div class="added-bullets flex items-center justify-between p-4 mt-3"><p>${bullets.value}</p><div class="remove-button bg-[#dc3545] text-white hover:bg-red-600 px-2 py-2 text-sm rounded-xl cursor-pointer">Remove</div>`);
        
    }

})
document.getElementsByClassName('submit')[0].addEventListener('click',(e)=>{
    const id=Math.random()*100;
    const heading=document.getElementById('head').value;
    const selected = document.querySelector('input[name="priority"]:checked').value;
    let local_obj={heading:heading,bullets:[],color:get_color,priority:selected};
    let notes=document.getElementsByClassName(`${selected}`)[0].lastElementChild;

    let bullet=document.getElementsByClassName('added-bullets');
    notes.insertAdjacentHTML('afterbegin',`<div class="note ${get_color}" id=${id}><i class="note-close fa-solid fa-xmark p-2 mt-1 ml-1 hover:bg-white"></i><p class="task-head ml-1 text-4xl text-gray-800">${heading}</p><ul class="bullets-${selected} list-disc flex flex-col ml-7 pt-2 items-start text-base"></ul></div>`)
    Array.from(bullet).forEach((val)=>{
        local_obj.bullets.push(`<li>${val.firstElementChild.textContent}</li>`);
        let li=document.createElement('li');
        li.innerText=val.firstElementChild.textContent;
        document.getElementsByClassName(`bullets-${selected}`)[0].appendChild(li);
        task_container.classList.toggle('display-form');
    });
    
    localStorage.setItem(`${id}`,JSON.stringify(local_obj));
    
})

Array.from(box).forEach(element => {
    element.addEventListener('click',(e)=>{
        let active=document.getElementsByClassName('active')[0];
        active.classList.remove('active');
        element.firstElementChild.classList.toggle('active');
        element.classList.forEach((cls)=>{
            if(cls.startsWith('bg-')){
                get_color=cls;
            }
        })
        
    })
});

window.addEventListener('DOMContentLoaded',(e)=>{
    if(localStorage.length){
        for(let i=0; i<localStorage.length; i++){
            const key=localStorage.key(i);
            let item=JSON.parse(localStorage.getItem(key));
            console.log(item.color);
            document.getElementsByClassName(`${item.priority.toLowerCase()}`)[0].lastElementChild.insertAdjacentHTML('afterbegin',`<div  class="note ${item.color}" id=${key}><i class="note-close fa-solid fa-xmark p-2 mt-1 ml-1 hover:bg-white"></i><p class="task-head ml-1 text-3xl text-gray-800">${item.heading}</p><ul class="bullets list-disc flex flex-col ml-7 pt-2 items-start text-base">${item.bullets.join(' ')}</ul></div>`)

        }
    }
})

