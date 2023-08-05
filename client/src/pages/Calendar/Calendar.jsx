import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import './Calendar.css';
import useCalendar from '../../store/Calendar';
import { createEventId } from '../../data';

const Calendar = () => {
    const { currentEvents, setCurrentEvents } = useCalendar();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [eventToDelete, setEventToDelete] = useState(null);

    const handleEvents = async (events) => {
        await Promise.resolve(setCurrentEvents(events));
    };

    const handleDateSelect = (selectInfo) => {
        let title = prompt('Please enter a title for the event');
        let calendarApi = selectInfo.view.calendar;

        calendarApi.unselect();

        if (title) {
            calendarApi.addEvent({
                id: createEventId(),
                title,
                start: selectInfo.start,
                end: selectInfo.end,
                allDay: selectInfo.allDay,
            });
        }
    };

    const handleEventClick = (clickInfo) => {
        setEventToDelete(clickInfo.event);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        eventToDelete.remove();
        setShowDeleteModal(false);
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
    };

    return (
        <div className="calendar-container">
            <div>
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay',
                    }}
                    allDaySlot={false}
                    initialView="timeGridWeek"
                    slotDuration="01:00:00"
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    weekends={true}
                    nowIndicator={true}
                    initialEvents={currentEvents}
                    eventsSet={handleEvents}
                    select={handleDateSelect}
                    eventClick={handleEventClick}
                />
            </div>

            {showDeleteModal && (
                <div className="delete-modal">
                    <div className="modal-content">
                        <h3>Are you sure you want to delete this event?</h3>
                        <button onClick={handleConfirmDelete}>Yes</button>
                        <button onClick={handleCancelDelete}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Calendar;
