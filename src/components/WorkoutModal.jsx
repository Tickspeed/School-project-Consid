import { useEffect, useRef, useState } from "react";
import styles from "../assets/WorkoutModal_style.module.css"

export default function WorkoutModal({setEditingItem, editingItem, data, onSave, onClose, onDelete}){

    const titleInput = useRef("");
   
    const sortData = (allData)=>{
        const returnData = []
        for (let i = 0; i < allData.length; i++ ){
            if (allData[i].id.startsWith("data-exercise")){
                returnData.push(allData[i])
            }
        }
        return returnData
    }

    useEffect(()=>{
        titleInput.current.value = editingItem.title
        setAvailableExercises(() => {
        return sortData(data).filter(exercise => 
            !(editingItem.exercises || []).some(existingExercise => 
                existingExercise.id === exercise.id
            )
    );
})
    }, [editingItem.title])

    

    
   
    const [availableExercises, setAvailableExercises] = useState([]);
    
 
    const removeExercise = (exerciseToRemove)=>{

        const updatedExercises = editingItem.exercises.filter(
            exercise => exercise !== exerciseToRemove
          );

        const updateItem = {
            ...editingItem,
            exercises: updatedExercises
        };

        setEditingItem(updateItem);
        setAvailableExercises([...availableExercises, exerciseToRemove])
    }

    const addExercise = (exerciseToAdd)=>{
        
        const updatedExercises = [...editingItem.exercises, exerciseToAdd]
        const updatedAvailableExercises = availableExercises.filter(
            exercise => exercise.id !== exerciseToAdd.id
        );
    

        const updateItem =  {
            ...editingItem,
            exercises: updatedExercises
        };
        
        setEditingItem(updateItem);
        setAvailableExercises(updatedAvailableExercises);
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
                            {exercise.title}<button className={styles.remvoeListBtn} onClick={()=>{removeExercise(exercise)}}>Remove</button>
                        </li>
                    ))}
                </ul>
                <button onClick={(e)=>{
                    e.preventDefault();
                    onDelete(editingItem.id)
                }} className={styles.modalDeleteBtn}>
                    Delete
                </button>
                <button 
                onClick={(e) => {
                    e.preventDefault();
    
                    const dataToSave = {
                        exercises: editingItem?.exercises || [],
                        title: titleInput.current.value,
                        id: editingItem?.id
                    };
                    
                    onSave(editingItem.id, dataToSave);
                    titleInput.current.value = "";
                    onClose();
                    }}>Save</button>
                <button 
                onClick={onClose}>Cancel</button>
            </div>
            
            <div className = {styles.addList}>
                <ul>
                    {availableExercises.map((exercise)=>(
                        <li key={exercise.id}>
                            {exercise.title}<button className={styles.listAddBtn} onClick={()=>addExercise(exercise)}>Add</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}