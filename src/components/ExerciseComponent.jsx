import ItemGrid from "./ItemGrid";
import ExerciseCard from "./ExerciseCard";
import ExerciseModal from "./ExerciseModal";

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
    
    return `exercise-${currentTime}-${randomNumber}`;
}


const loadData = ()=>{
    const dataArray = []
    for(let i = 0; i < localStorage.length; i++){
        const key = localStorage.key(i);
        if(key?.startsWith("exercise")){
            const data = JSON.parse(localStorage.getItem(key))
            dataArray.push(
                {
                    id: key,
                    ...data
                }
            )
        }
    }
    return dataArray
}


export default function ExerciseComponent(){

    return (
        <ItemGrid 
            ModalComponent={ExerciseModal} 
            CardComponent={ExerciseCard} 
            emptyItem={emptyItem} 
            loadData={loadData}
            generateNewId={generateNewExerciseId}
        />
    )
}