
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"
import { useEffect, useState } from 'react'

const LOCAL_STORAGE_KEY = 'myCalendarEvents'; 

const localizer = momentLocalizer(moment) 

function MyCalendar(props) {
    const [events, setEvents] = useState([])
    const [isInitialLoad, setIsInitialLoad] = useState(true)

    useEffect(() => {
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
        setIsInitialLoad(false); 
      }, []);

      useEffect(() => {
       
        if (!isInitialLoad) {
           try {
               localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(events));
               
           } catch (error) {
               console.error("Error saving events to localStorage:", error);
              
           }
        }
      }, [events, isInitialLoad]);

      const handleSelectSlot = () => {

      }
  
    return (
      <div style={{ height: 500 }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          views={["week"]}
          defaultView="week"
          
        />
      </div>
    )
  }
export default MyCalendar