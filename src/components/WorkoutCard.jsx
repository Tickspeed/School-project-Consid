import styles from "../assets/WorkoutCard_style.module.css"

export default function WorkoutCard({item, onEdit}){
    
    return(
        <div className = {styles.card}>
            <h2>{item.title}</h2>
            <button className={styles.cardBtn} onClick={(e)=>{
                onEdit(item.id)
            }}>Edit</button>
            <ul>
                {item.exercises.map((exercise)=>(
                    <li>{exercise.title}</li>
                ))}
            </ul>
        </div>
    )
}