import classes from "*.module.css"
import { Button, Grid, IconButton, makeStyles, Paper } from "@material-ui/core"
import clsx from "clsx"
import React, { useState } from "react"
import { useEffect } from "react"
import DateComponent from "../components/dateComponent"
import { initialTasks } from "../components/initialTasks"
import { QuarterTable } from "../components/quarterTable"
import { TaskTable } from "../components/taskTable"
import Chart from "../template/chart"
import Title from "../template/title"
import { Task } from "../types/taskType"
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

export const MainPage = () => {
    
    const [allTasks, setAllTasks] = useState<Task[]>(initialTasks);
    const [quarterNumber, setQuarterNumber] = useState(1);
    const [allTasksLoading, setallTasksLoading] = useState(false);
    const [allTasksTemp, setAllTasksTemp] = useState<Task[]>(initialTasks);
    
    const changeData =  (e: any) => {
       setAllTasks(e);
       if (allTasksLoading){
        setallTasksLoading(false);
       }
       else
       {
         setallTasksLoading(true)
       }
       setAllTasksTemp(allTasks);
    }
    const changeQuarter = (right?: String, left?: String) => {
      if (right === 'right')
      {
        if (quarterNumber === 4)
        {
          setQuarterNumber(1);
          setStartDate(new Date(startDate.getFullYear() + 1 + '-01-01'))
        }
        else
          setQuarterNumber(quarterNumber + 1);
      }
      else if(left === 'left')
      {
        if (quarterNumber === 1)
        {
          setQuarterNumber(4);
          setStartDate(new Date(startDate.getFullYear() - 1 + '-12-31'))
        }
        else
          setQuarterNumber(quarterNumber - 1);
      }
      else
      {
        if (startDate.getMonth() >= 3 && startDate.getMonth() <= 5)
          setQuarterNumber(2)
        else if (startDate.getMonth() >= 6 && startDate.getMonth() <= 8)
          setQuarterNumber(3)
        else if (startDate.getMonth() >= 9 && startDate.getMonth() <= 11)
          setQuarterNumber(4)
        else if (startDate.getMonth() >= 0 && startDate.getMonth() <= 2)
          setQuarterNumber(1)
      }
        
    }
    const [startDate, setStartDate] = useState(new Date());

    const changeStartDate = (e: any) => {
        setStartDate(e);
    }

    useEffect(() => {
      changeQuarter()
    }, [startDate])

    const useStyles = makeStyles((theme) => ({
        paper: {
          padding: theme.spacing(2),
          display: 'flex',
          overflow: 'auto',
          flexDirection: 'column',
        },
        fixedHeight: {
          height: 340,
        },
        fixedHeightDate: {
          height: 140,
        },
      }));
      const classes = useStyles();
      const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
        <Grid container spacing={3}>

            {/* Tänane kuupäev */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={clsx(classes.paper, classes.fixedHeightDate)}>
              <DateComponent date={startDate} onDateChange={changeStartDate} label="Tänane kuupäev" />
              </Paper>
            </Grid>

            {/* KVARTAL */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
              <TaskTable data={allTasks} onDataChange={changeData}/>
              </Paper>
            </Grid>
            
            {/* Ülesannete tabel */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                
                <Title><IconButton aria-label="Eelmine kvartal"><ArrowLeftIcon 
                      onClick={(e) => {changeQuarter('', 'left')}}/></IconButton>{quarterNumber + '. kvartal ' + startDate.getFullYear()}<IconButton aria-label="Järgmine kvartal"><ArrowRightIcon 
                      onClick={(e) => {changeQuarter('right', '')}}/></IconButton></Title>
                <QuarterTable data={allTasksLoading ? allTasks : allTasksTemp} dateValue={startDate} quarterNumber={quarterNumber}/>
              </Paper>
            </Grid>
          </Grid>
    )
}

export default MainPage