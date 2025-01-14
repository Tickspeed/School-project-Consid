
import {useState, useEffect, useRef} from "react";
import PropTypes from "prop-types"
import ExerciseModal from "../components/ExerciseModal";
import ExerciseCard from "../components/ExerciseCard";


import styles from "../assets/ExerciseGrid_style.module.css"






export default function ItemGrid({loadData, emptyItem, CardComponent, ModalComponent, generateNewId}){
    const [items, setItems]= useState([]);
    const [editingItem, setEditingItem] = useState({})

    

      
    
    useEffect(()=>{
        loadItems()
        window.addEventListener('storage', loadItems);
        return () => {window.removeEventListener('storage', loadItems)}
    }, [])

    const loadItems = () => {
        
        const items = loadData();
        
        setItems(items)
    }

    const handleAdd = () => {
        console.log("hello")
        const modal = document.querySelector('#modal')
        const saveBtn = document.querySelector('#save-btn')
        
        setEditingItem(emptyItem);
        modal.showModal();
    }

    const handleEdit = (id) => {
        const modal = document.querySelector('#modal')
        const item = items.find(element => element.id == id)
        setEditingItem(item)
        modal.showModal();
    }

    const handleSave = (id, data) =>{
        const exerciseId = id || generateNewId()
        localStorage.setItem(exerciseId, JSON.stringify(data))
        loadItems()
        setEditingItem({})
    }

    const handleClose = () => {
        const modal = document.querySelector('#modal')
        modal.close();
        
    }

    return(
    <div className="container">
        <button className = {`${styles.addBtn} ${styles.cardBtn}`} onClick={handleAdd}>Add new</button>
        <div className={styles.grid}>
            {items.map(item => (
            <CardComponent
                item={item}
                onEdit={handleEdit}
            />
            ))}
        </div>
        <dialog className={styles.modal} id = "modal">
            <ModalComponent 
            setEditingItem = {setEditingItem} 
            editingItem={editingItem} 
            data={items} 
            onClose={handleClose} 
            onSave={handleSave} />
        </dialog>
      
    </div>
    )

}

ItemGrid.propTypes = {
    loadData: PropTypes.func,
    emptyItem: PropTypes.object,
    CardComponent: PropTypes.elementType,
    ModalComponent: PropTypes.elementType,
    generateNewId: PropTypes.func,
}

