import { useEffect } from "react";
import styles from "../assets/ExerciseModal_style.module.css"

export default function ExerciseModal({editingItem, onSave, onClose}){
    useEffect(()=>{
        if (editingItem) {
            const form = document.querySelector('form');
            form.title.value = editingItem.title;
            form.sets.value = editingItem.sets;
            form.minReps.value = editingItem.minReps;
            form.maxReps.value = editingItem.maxReps;
            form.weight.value = editingItem.weight;
            form.description.value = editingItem.description;
            
          }
    }, [editingItem])

    
    return (
        <form className = {styles.form}>
            
            <input name="title" className={styles.title} type="text" placeholder="Title"/>
            <textarea name="description" id="description-text" placeholder="Description"></textarea>
            
                <strong>Sets: </strong><input name = "sets" className = {styles.numberInput} type="number"/>
                <strong>Reps: </strong><div><input name = "minReps" className = {styles.numberInput} type="number"/> - <input name = "maxReps" className = {styles.numberInput} type="number"/></div>
                <strong>Weight: </strong><input name = "weight" type="text"/>
            
            <button onClick={(e)=>{
                e.preventDefault();

                const formData = new FormData(e.target.form);
                const data = Object.fromEntries(formData);
                onSave(editingItem.id, data)
                onClose()
            }} className={styles.modalBtn} type="submit" >Save</button>
            <button onClick={onClose} className={styles.modalBtn} type="button">Cancel</button>
        </form>

    );
}
