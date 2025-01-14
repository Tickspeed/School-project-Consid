import WorkoutCard from "./WorkoutCard";
import WorkoutModal from "./WorkoutModal";
import ItemGrid from "./ItemGrid";

const emptyItem = {
    id: "",
    title: "",
    exercises: []
}

function generateNewWorkoutId() {
    const currentTime = Date.now();
    const randomNumber = Math.floor(Math.random() * 1e6)
    
    return `workout-${currentTime}-${randomNumber}`;
}

const loadData = ()=>{
    const dataArray = []
    for(let i = 0; i < localStorage.length; i++){
        const key = localStorage.key(i);
        if(key?.startsWith("workout")){
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



export default function WorkoutComponent(){
    
    return(
        <ItemGrid
        emptyItem = {emptyItem}
        CardComponent={WorkoutCard}
        ModalComponent={WorkoutModal}
        loadData={loadData}
        generateNewId={generateNewWorkoutId}
        />
    )
}