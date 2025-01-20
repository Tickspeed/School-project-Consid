import { useEffect, useRef } from "react";
import styles from "../assets/WorkoutModal_style.module.css"

export default function WorkoutModal({setEditingItem, editingItem, data, onSave, onClose}){

    const titleInput = useRef("");

    useEffect(()=>{
        titleInput.current.value = editingItem.title
    }, [editingItem])

    const sortData = (allData)=>{
        const returnData = []
        for (let i = 0; i < allData.length; i++ ){
            if (allData[i].id.startsWith("data-exercise")){
                returnData.push(allData[i])
            }
        }
        return returnData
    }

    const allExercises = sortData(data)
   

    
    const removeExercise = (exerciseToRemove)=>{

        const updatedExercises = editingItem.exercises.filter(
            exercise => exercise !== exerciseToRemove
          );

        const updateItem = {
            ...editingItem,
            exercises: updatedExercises
        };

        setEditingItem(updateItem);
    }

    const addExercise = (exerciseToAdd)=>{
        const updatedExercises = [...editingItem.exercises, exerciseToAdd]

        const updateItem =  {
            ...editingItem,
            exercises: updatedExercises
        };

        setEditingItem(updateItem);
    }
    

    return(
        <div className ={styles.modal}>
            <div className={styles.panel}>
                <input 
                ref={titleInput}
                name="title"
                type="text" 
                placeholder="Title"
                />
                
                <ul>
                    {editingItem.exercises && editingItem.exercises.map((exercise)=>(
                        <li key={exercise.id}>
                            {exercise.title}<button onClick={()=>{removeExercise(exercise)}}>Remove</button>
                        </li>
                    ))}
                </ul>
                <button 
                onClick={(e) => {
                    e.preventDefault();
                    
                    onSave(editingItem.id, {
                        ...editingItem,
                        title: titleInput.current.value
                    })
                    titleInput.current.value = ""
                    onClose()
                    }}>Save</button>
                <button 
                onClick={onClose}>Cancel</button>
            </div>
            
            <div className = {styles.addList}>
                <ul>
                    {allExercises.map((exercise)=>(
                        <li key={exercise.id}>
                            {exercise.title}<button onClick={()=>addExercise(exercise)}>Add</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}