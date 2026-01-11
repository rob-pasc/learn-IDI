import NextSession from "./components/NextSession";
import TimeTable from "./components/TimeTable";
// import styles from "./Dashboard.module.css";

export default function Dashboard() {
  return (
    <div className="u-container u-stack">
      {/* <div className={styles.layout}> */}
        <div id="next-session" class="u-mb-3">  
          <NextSession />
        </div>
        <div id="timetable">  {/*id zwecks Navigation*/}
          <TimeTable />
        {/* </div> */}
      </div>
    </div>
  );
}
