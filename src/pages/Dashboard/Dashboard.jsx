import NextSession from "./components/NextSession";
import TimeTable from "./components/TimeTable";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  return (
    <div className="container">
      <div className={styles.layout}>
        <NextSession />
        <div id="timetable">  {/*id zwecks Navigation*/}
          <TimeTable />
        </div>
      </div>
    </div>
  );
}
