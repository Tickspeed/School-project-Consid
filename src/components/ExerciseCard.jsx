import styles from "../assets/ExerciseCard_style.module.css"

export default function ExerciseCard({item, onEdit}){
    
    return (
    <div className={styles.card}>
        <h2 className = "item-name">
            {item.title}
        </h2>
        <button className={styles.cardBtn} onClick={(e)=>{onEdit(item.id)}} >Edit</button>
        <ul className = {styles.cardInfo}>
            <li><strong >Sets: </strong>{item.sets}</li>
            <li><strong>Reps: </strong> {item.minReps} - {item.maxReps}</li>
            <li><strong>Weight: </strong>{item.weight}</li>
        </ul>
    </div>
    );
}