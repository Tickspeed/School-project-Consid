
export default function WorkoutCard({workout, onEdit}){
    
    return(
        <div>
            <h2>{workout.title}</h2>
            <button onClick={(e)=>{
                onEdit(workout.id)
            }}>Edit</button>
            <ul>
                {workout.exercises.map((exercise)=>{
                    <li>{exercise.name}</li>
                })}
            </ul>
        </div>
    )
}