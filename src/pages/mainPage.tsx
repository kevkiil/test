import classes from "*.module.css"
import { Grid, makeStyles, Paper } from "@material-ui/core"
import clsx from "clsx"
import React, { useState } from "react"
import { useEffect } from "react"
import DateComponent from "../components/dateComponent"
import { initialTasks } from "../components/initialTasks"
import { QuarterTable } from "../components/quarterTable"
import { TaskTable } from "../components/taskTable"
import Chart from "../template/chart"
import { Task } from "../types/taskType"

export const MainPage = () => {
    
    const [allTasks, setAllTasks] = useState<Task[]>(initialTasks);
    const [allTasksChange, setAllTasksChange] = useState(false);
    
    const changeData = (e: any) => {
      setAllTasks(e);
      if (allTasksChange)
      {
        setAllTasksChange(false);
      }
      else
      {
        setAllTasksChange(true);
      }
    }
    const [startDate, setStartDate] = useState(new Date());
    const changeStartDate = (e: any) => {
        setStartDate(e);
    }
    const useStyles = makeStyles((theme) => ({
        paper: {
          padding: theme.spacing(2),
          display: 'flex',
          overflow: 'auto',
          flexDirection: 'column',
        },
        fixedHeight: {
          height: 240,
        },
      }));
      const classes = useStyles();
      const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
        <Grid container spacing={3}>

            {/* Tänane kuupäev */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
              <DateComponent date={startDate} onDateChange={changeStartDate} label="Tänane kuupäev" />
              </Paper>
            </Grid>

            {/* KVARTAL */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <QuarterTable data={allTasks} />
              </Paper>
            </Grid>
            
            {/* Ülesannete tabel */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <TaskTable data={allTasks} onDataChange={changeData}/>
              </Paper>
            </Grid>
          </Grid>
    )
}

export default MainPage