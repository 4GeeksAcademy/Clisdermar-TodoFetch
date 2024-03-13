import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const TodoLista = () => {
  const [user,setUser] = useState('');
  const [task, setTask] = useState({
    label:"",
    done: false
  });
  const [tasksList, setTasksList] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);


  const handleAdd = (event) => {
    if(event.key === 'Enter'){
       setTask(event.target.value)
      };
  };
   
  const getTasksLista = async ()=>{
    try{
      const response = await fetch ('https://playground.4geeks.com/apis/fake/todos/user/clisdermar')
      const data = await response.json()
      setTasksList(data);
    }catch(error){
      console.error('Error fetching tasks:', error);
    }
  }


  const AddTask = (e) => {
    e.preventDefault();
    if (task.label.trim() !== '') {
      setTasksList((prevList) => {
        return [task, ...prevList];
      });
      setTask({ label: '', done: false }); // Limpia el input después de agregar la tarea
    }
  };
   const handleChange = (event)=>{
    setTask({ ...task, "label": event.target.value})
    console.log(task)
   }

const putList= async()=>{
      try{
        const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/clisdermar',{
          method: "PUT",
          body: JSON.stringify(tasksList),
          headers: {
            "Content-Type": "application/json"
          }
        })
        const data = await response.json()
        console.log(data)
        if(!response.ok){
          throw new Error(data.msg)
        }


      } catch (error){ console.error(error)}

}

const handleDelete = (index) => {
  const updatedTasks = [...tasksList];
  updatedTasks.splice(index, 1);
  setTasksList(updatedTasks);
};

const handleDeleteAllTasks = async () => {
  try {
    
    const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/clisdermar', {
      method: 'DELETE',
    });

    if (response.ok) {
      
      setTasksList([]);

      console.log('Todas las tareas han sido eliminadas correctamente');
    } else {
      console.error('Error al eliminar todas las tareas:', response.statusText);
    }
  } catch (error) {
    console.error('Error al eliminar todas las tareas:', error);
  }
};

useEffect(()=>{
      putList()
},[tasksList])

useEffect (()=> {
 getTasksLista();
},[])

  const remainingTasks = tasksList.length;

  return (
    <div className="container">
      <div>
        <h1>Todos</h1>
      </div>
      <div className="card">
        <div className="card-body">
          <form onSubmit={AddTask}>
            <input
              type="text"
              placeholder="What needs to be done?"
              value={task.label}
              onChange={handleChange}
              style={{ border: 'none', outline: 'none', marginBottom: '10px' }}
            />
          </form>

          <ul className="list-group">
            {tasksList.map((taskItem, index) => (
              <li
                className="list-group-item"
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {taskItem.label}

                {hoveredIndex === index && (
                  <button className="delete-button" onClick={() => handleDelete(taskItem.id, index)}>
                    <FontAwesomeIcon icon={faTimes} style={{ color: '#f03405' }} />
                  </button>
                  
                )}
                

              </li>
              
            ))}
              <button onClick={handleDeleteAllTasks}>Eliminar todas las tareas</button>

            {remainingTasks > 0 && (
              <li className="list-group-item">
                <strong>{remainingTasks} item left</strong>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoLista