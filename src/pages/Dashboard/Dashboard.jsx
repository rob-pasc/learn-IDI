import NextSession from "./components/NextSession";
import TimeTable from "./components/TimeTable";

export default function Dashboard() {
  return (
    <div className="u-container u-stack">
        <div id="next-session" class="u-mb-3">  
          <NextSession />
        </div>
        <div id="timetable">  {/*id for navigation purposes*/}
          <TimeTable />
      </div>
    </div>
  );
}
