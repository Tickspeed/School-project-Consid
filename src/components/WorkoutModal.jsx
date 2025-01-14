import { useEffect } from "react";

export default function WorkoutModal({setEditingItem, editingItem, data, onSave, onClose}){

   
    const allExercises = data.map(workout => workout.exercises).flat();

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
        <div>
            <div>
                <h3>{editingItem.title}</h3>
                
                <ul>
                    {editingItem.exercises.map((exercise)=>{
                        <li>{exercise}<button 
                        onClick={()=>{removeExercise(exercise)}}>Remove</button></li>
                    })}
                </ul>
                <button 
                onClick={(e) => {
                    e.preventDefault();
                    onSave(editingItem.id, editingItem)
                    }}>Save</button>
                <button 
                onClick={onClose}>Cancel</button>
            </div>
            
            <div>
                <ul>
                    {allExercises.map((exercise)=>{
                        <li>
                            {exercise.title}<button onClick={addExercise(exercise)}>Add</button>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    )
}