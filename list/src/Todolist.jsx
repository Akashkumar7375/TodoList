
import {useEffect, useState} from 'react'
import {AiOutlineDelete} from 'react-icons/ai'
import { BsCheckLg } from 'react-icons/bs'
function Todolist() {



    const[isCompleteScreen,setIsCompleteScreen]=useState(false)
    const[allTodo,setAllTodo]=useState([])
    const[completedTodo,setCompletedTodo]=useState([])
    const[newTitle,SetTitle]=useState('')
   const[newDesc,setDesc]=useState('')    



 function handelform(e){
    e.preventDefault()
    let todo={
        title:newTitle,
        desc:newDesc
    }

    let updatetodoArray=[...allTodo];
    updatetodoArray.push(todo)
    localStorage.setItem('todolist',JSON.stringify(updatetodoArray))
    setAllTodo(updatetodoArray)
  
 }

 function tododelete(e,index) {
    let deletetodo=[...allTodo]
    deletetodo.splice(index,1)
    localStorage.setItem('todolist',JSON.stringify(deletetodo))
    setAllTodo(deletetodo)
 }


 function movedata(e,index){

    let fileitem={
        ...allTodo[index],
        completedTodo:completedTodo
    }

    let move=[...completedTodo]
    move.push(fileitem)
    localStorage.setItem('completedTodo',JSON.stringify(move))
    setCompletedTodo(move)
    tododelete(e,index)
 }

 function completedTodelete(e,index){
    function dele(e,index){
        let as=[...completedTodo]
        as.splice(index,1)
        localStorage.setItem('completedTodo',JSON.stringify(as))
        setCompletedTodo(as)
    }
    let compaleteddelete={
        ...completedTodo[index],
        allTodo:allTodo
    }

    let tt=[...allTodo]
    tt.push(compaleteddelete)
    localStorage.setItem("todolist",JSON.stringify(tt))
    setAllTodo(tt)
    dele(e,index)
 }

 useEffect(()=>{
    let todosaved=JSON.parse(localStorage.getItem('todolist'))
    let copmsaved=JSON.parse(localStorage.getItem('completedTodo'))
    if(todosaved){
        setAllTodo(todosaved)
    }
    if(copmsaved){
        setCompletedTodo(copmsaved)
    }
 })
    return ( 
        <>
         <div id='todo'>
         <h1 >My Todos</h1>
          <div className='todo-wrapper'>
            <div className='todo-input'>    
                   <form onSubmit={(e)=>{handelform(e)}}>
                        <div className='todo-input-item'>
                        
                        <lable >Title:</lable>
                        <input type='text' name='' id=''  placeholder='What`s the task title?'  value={newTitle} onChange={(e)=>{
                            SetTitle(e.target.value)
                        }}/>
                        </div>

                        <div className='todo-input-item'>
                        <lable >Description:</lable>
                        <input type='text' name='' id='' placeholder='What`s the task title?' value={newDesc} onChange={(e)=>{
                            setDesc(e.target.value)
                        }}/>
                        </div>
                        <div className='todo-input-item'>
                        <button type='submit'   id='primarybtn' >Add</button>
                        </div>
                        
                        </form>
                    </div>
                    
                    <div className='btn-area'>
                        <button className={`secondarybtn ${isCompleteScreen===false && 'active'}`} onClick={(e)=>{setIsCompleteScreen(false)}}>Todo</button>
                        <button className={`secondarybtn ${isCompleteScreen===true && 'active'}`} onClick={(e)=>{setIsCompleteScreen(true)}}>Completed</button>
                    </div>
                    <div className='todo-list' >
                   {
                   
                   isCompleteScreen===false && allTodo.map((value,index)=>(
                        
                    <div className='todo-list-item' key={index}>
                            <div>
                            <h3>{value.title}</h3>
                            <p>{value.desc}</p>
                             </div>
                             <div>
                        <AiOutlineDelete onClick={(e)=>{tododelete( e,index)}} className='icon'/>
                        <BsCheckLg onClick={(e)=>{movedata(e,index)}}  className='check-icon'/>
                    </div>
                    </div>  
                    ))
                   }
                   
                    {
                   
                   isCompleteScreen===true && completedTodo.map((value,index)=>(
                        
                    <div className='todo-list-item' key={index}>
                            <div>
                            <h3>{value.title}</h3>
                            <p>{value.desc}</p>
                            <p><span>{value.completedTodo?'compaleted':'incpm'}</span></p>
                             </div>
                             <div>
                        <AiOutlineDelete onClick={(e)=>{completedTodelete( e,index)}} className='icon'/>
                        
                    </div>
                    </div>  
                    ))
                   }
                     </div>
                </div> 
                
         </div>
        </>
     );
}

export default Todolist;