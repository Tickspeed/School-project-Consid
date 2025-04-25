
import {useState, useEffect, useRef} from "react";
import PropTypes from "prop-types"
import ExerciseModal from "../components/ExerciseModal";
import ExerciseCard from "../components/ExerciseCard";









export default function ItemGrid({sortData, emptyItem, CardComponent, ModalComponent, generateNewId, styles}){
    //need rawData for WorkoutModal to load exercises list
    const [rawData, setRawData] = useState([])
    const [items, setItems]= useState([]);
    const [editingItem, setEditingItem] = useState({})
    
    
      
    
    useEffect(()=>{
        loadItems()
        
        window.addEventListener('storage', loadItems);
        return () => {window.removeEventListener('storage', loadItems)}
    }, [])

    const loadItems = () => {
        const dataArray = []
        for(let i = 0; i < localStorage.length; i++){
            const key = localStorage.key(i);
            if(key?.startsWith("data")){
                const data = JSON.parse(localStorage.getItem(key))
                
                dataArray.push(
                    {
                        ...data,
                        id: key
                        
                    }
                )
            }
        }
        console.log("ItemGrid loaded all data with 'data' tag from localstorage",dataArray)
        setRawData(dataArray)
      
        const sortedData = sortData(dataArray)
        console.log("ItemGrid sorted data ", sortedData)
        
        setItems(sortedData)
    }

    const handleAdd = () => {
        
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
        {items.length > 0 ? (
        items.map((item) => (
            <CardComponent item={item} onEdit={handleEdit} />
        ))
    ) : (
        <p>No workouts available. Click "Add new" to create one!</p>
    )}
        </div>
        <dialog className={styles.modal} id = "modal">
            <ModalComponent 
            setEditingItem = {setEditingItem} 
            editingItem={editingItem} 
            data={rawData} 
            onClose={handleClose} 
            onSave={handleSave} />
        </dialog>
      
    </div>
    )

}

ItemGrid.propTypes = {
    sortData: PropTypes.func,
    emptyItem: PropTypes.object,
    CardComponent: PropTypes.elementType,
    ModalComponent: PropTypes.elementType,
    generateNewId: PropTypes.func,
}

