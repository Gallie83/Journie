import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './App.css'

// Configure Moment.js as the localizer
const localizer = momentLocalizer(moment);

interface MyEvent {
  title: string;
  startDate: Date;
  endDate: Date;
  startTime: moment.Moment;
  endTime: moment.Moment;
}

interface MyCalendarProps {
  events: MyEvent[];
}

const MyCalendar: React.FC<MyCalendarProps> = ({ events }) => (
  <div className='calendar-div'>
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="startDate"
      endAccessor="endDate"
      // style={{ height: 1000, width: 1000 }}
    />
  </div>
);

export default MyCalendar;
