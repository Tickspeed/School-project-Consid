import ItemGrid from "./ItemGrid";
import ExerciseCard from "./ExerciseCard";
import ExerciseModal from "./ExerciseModal";
import styles from "../assets/ExerciseGrid_style.module.css"

const emptyItem = {
    title: "",
    description: "",
    sets: 0,
    minReps: 0,
    maxReps: 0,
    weight: ""
}

function generateNewExerciseId() {
    const currentTime = Date.now();
    const randomNumber = Math.floor(Math.random() * 1e6)
    
    return `data-exercise-${currentTime}-${randomNumber}`;
}


const sortData = (allData)=>{
    const returnData = []
    for (let i = 0; i < allData.length; i++ ){
        if (allData[i].id.startsWith("data-exercise")){
            returnData.push(allData[i])
        }
    }
    return returnData
}


export default function ExerciseComponent(){

    return (
        <ItemGrid 
            ModalComponent={ExerciseModal} 
            CardComponent={ExerciseCard} 
            emptyItem={emptyItem} 
            sortData={sortData}
            generateNewId={generateNewExerciseId}
            styles = {styles}
        />
    )
}