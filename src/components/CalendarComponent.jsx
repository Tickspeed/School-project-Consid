
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"
import styles from "../assets/CalenderComponent_style.module.css"
import { useEffect, useState } from 'react'
import CalendarModal from "./CalendarModal"

const LOCAL_STORAGE_KEY = 'myCalendarEvents'; 

const localizer = momentLocalizer(moment) 

function MyCalendar(props) {
    const [events, setEvents] = useState([])
    const [isInitialLoad, setIsInitialLoad] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingEvent, setEditingEvent] = useState({})

    const minTime = new Date();
    minTime.setHours(6, 0, 0); // Set start time to 8:00:00 AM

    const maxTime = new Date();
    maxTime.setHours(23, 0, 0); // 
    

    useEffect(() => {
        loadFromLocalstorage();
        const handleStorageChange = (event) => {
          if (event.key === LOCAL_STORAGE_KEY) {
            loadFromLocalstorage();
          }
        };
      
        window.addEventListener('storage', handleStorageChange);
      
        return () => {
          window.removeEventListener('storage', handleStorageChange);
        };
      }, []);

    


    const loadFromLocalstorage = () => {
      try {
        const storedEvents = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedEvents) {
          // IMPORTANT: Parse Dates! JSON stringify/parse doesn't preserve Date objects
          const parsedEvents = JSON.parse(storedEvents).map(event => ({
            ...event,
            start: new Date(event.start), 
            end: new Date(event.end),     
          }));
          setEvents(parsedEvents);
        }
      } catch (error) {
        console.error("Error loading events from localStorage:", error);
        
      }
    }

    const handleSelectSlot = (slotInfo) =>{
      const dialog = document.querySelector("#calendarDialog")
      setEditingEvent({
        start: slotInfo.start,
        end: slotInfo.end

      })
      
      dialog.showModal()
      
      
    }

    const handleSelectEvent = (eventInfo) =>{
      console.log("onSelectEvent eventInfo:",eventInfo)
      const dialog = document.querySelector("#calendarDialog")
      setEditingEvent(eventInfo)

      dialog.showModal()
    }

    const handleSave = () =>{
     
      const newEvent = {
        ...editingEvent,
        id: Date.now() 
      };
    
      const updatedEvents = [...events, newEvent];
      setEvents(updatedEvents);
      

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedEvents));
      

      setEditingEvent({});
      handleClose();
    }

    const handleDelete = ()=>{
          // Filter out the event that matches the editingEvent's id
      const updatedEvents = events.filter(event => event.id !== editingEvent.id);
      
      // Update the state
      setEvents(updatedEvents);
      
      // Update localStorage
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedEvents));
      
      // Close the dialog
      handleClose();
    }

    const handleClose = () =>{
      const dialog = document.querySelector("#calendarDialog")
      dialog.close()
    }

  
    return (
      <div className={styles.calendar}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          views={["week"]}
          defaultView="week"
          selectable = {true}
          onSelectSlot = {handleSelectSlot}
          onSelectEvent = {handleSelectEvent}
          min={minTime}
          
          
        />
        <dialog className={styles.dialog} id="calendarDialog">
          <CalendarModal 
            editingEvent={editingEvent}
            setEditingEvent={setEditingEvent}
            onClose={handleClose}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        </dialog>
        
      </div>
    )
}

export default MyCalendar