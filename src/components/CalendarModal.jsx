import { useEffect, useRef, useState } from "react"
import style from "../assets/CalendarModal_style.module.css"


export default function({editingEvent, setEditingEvent, onClose, onSave, onDelete}){

    const [workoutArray, setWorkoutArray] = useState([])

    const [listVisible, setListVisible] = useState(false)

    const handleShowList = ()=>{
        setListVisible(true)
    }

    const handleChange = (id)=>{
        const selectedWorkout = workoutArray.find(workout => workout.id === id);
        if (selectedWorkout) {
            setEditingEvent(prev => ({
                ...prev,
                title: selectedWorkout.title,
                workout: selectedWorkout
            }));
            setListVisible(false);
        }
        console.log("editingEvent workout changes to", selectedWorkout)
    }
    
   


    useEffect(()=>{
        for(let i = 0; i < localStorage.length; i++){
            const key = localStorage.key(i);
            if(key?.startsWith("data-workout")){
                const data = JSON.parse(localStorage.getItem(key))
                console.log(key)
                workoutArray.push(
                    {
                        ...data,
                        id: key
                    }
                )
            }
        }
        console.log("CalendarModal workoutArray loaded: ", workoutArray)
        
    }, [])

    return(
        <div className={style.modal}>
            <div className={style.mainBox}>
                <div>
                    {editingEvent.workout ?
                    <div className={style.exerciseDetails}>
                        <bold>Workout: {editingEvent.workout.title}</bold>
                        Exercises:
                        <ul>
                            {editingEvent.workout.exercises.map((exercise)=>(
                                <li  key={exercise.id}>
                                    <ul>
                                        <li>{exercise.title}</li>
                                        <li>{exercise.description}</li>
                                        <li>Sets: {exercise.sets}</li>
                                        <li>Reps: {exercise.minReps} - {exercise.maxReps}</li>
                                        <li>Weight: {exercise.weight}</li>
                                    </ul>
                                </li>
                            ))}
                        </ul>
                        <button onClick={handleShowList}>Change workout</button>
                    </div>
                        :
                    <div>
                        <button onClick={handleShowList} >Add workout</button>
                    </div>
                    }
                </div>
                
                <button onClick={(event)=>{
                    onSave()
                }}>Save</button>
                <button onClick={onClose}>Cancel</button>
                <button onClick={(event)=>{
                    onDelete()
                }}>Delete</button>
                
            </div>
            <div className={style.listBox}>
                {listVisible && 
                <ul className={style.workoutList}>
                    {workoutArray.map((workout)=>(
                        <li key={workout.id}><span>{workout.title}</span><button onClick={(event)=>{
                            handleChange(workout.id)
                        }}>Add</button></li>
                    ))}
                </ul>}
            </div>
        </div>
    )
}