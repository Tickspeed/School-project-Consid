import WorkoutCard from "./WorkoutCard";
import WorkoutModal from "./WorkoutModal";
import ItemGrid from "./ItemGrid";
import styles from "../assets/WorkoutGrid_styles.module.css"

const emptyItem = {
    id: "",
    title: "",
    exercises: []
}

function generateNewWorkoutId() {
    const currentTime = Date.now();
    const randomNumber = Math.floor(Math.random() * 1e6)
    
    return `data-workout-${currentTime}-${randomNumber}`;
}

const loadData = ()=>{
    const dataArray = []
    for(let i = 0; i < localStorage.length; i++){
        const key = localStorage.key(i);
        if(key?.startsWith("data-workout")){
            const data = JSON.parse(localStorage.getItem(key))
            console.log(key)
            dataArray.push(
                {
                    ...data,
                    id: key
                }
            )
        }
    }
    console.log(dataArray)
    return dataArray
}



export default function WorkoutComponent(){
    
    return(
        <ItemGrid
        emptyItem = {emptyItem}
        CardComponent={WorkoutCard}
        ModalComponent={WorkoutModal}
        sortData={loadData}
        generateNewId={generateNewWorkoutId}
        styles={styles}
        />
    )
}