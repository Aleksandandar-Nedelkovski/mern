import mobiscroll from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Eventcalendar, getJson, toast } from "@mobiscroll/react";

function MyMonthlyCalendar() {
  const [myEvents, setEvents] = React.useState([]);

  React.useEffect(() => {
    getJson(
      "https://trial.mobiscroll.com/events/?vers=5",
      (events) => {
        setEvents(events);
      },
      "jsonp"
    );
  }, []);

  const onEventClick = React.useCallback((event) => {
    toast({
      message: event.event.title,
    });
  }, []);

  const view = React.useMemo(() => {
    return {
      calendar: { type: "month" },
      agenda: { type: "month" },
    };
  }, []);

  return (
    <Eventcalendar
      theme="ios"
      themeVariant="light"
      clickToCreate={false}
      dragToCreate={false}
      dragToMove={false}
      dragToResize={false}
      data={myEvents}
      view={view}
      onEventClick={onEventClick}
    />
  );
}

export default MyMonthlyCalendar;
