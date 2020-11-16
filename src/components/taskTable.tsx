import { Table, TableHead, TableRow, TableCell, TableBody, Box, Typography, Tooltip, Button, TextField } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { da } from "date-fns/locale";
import React, { useState } from "react";
import { useEffect } from "react";
import { format } from "util";
import { Task } from "../types/taskType";
import DateComponent from "./dateComponent";

type TableProps = {
    data: Task[];
    onDataChange(e: any): any,
  };


export const TaskTable: React.FC<TableProps> = ({ data, onDataChange }) => {
    const handleDataChange = (data: any) => {
       onDataChange(data);
    };
    const [taskDescription, setTaskDescription] = useState('');
    const [taskEditDescription, setTaskEditDescription] = useState('');
    const [editTaskId, setEditTaskId] = useState(0);
    const [modifier, setModifier] = useState(false);
    const handleEditDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTaskEditDescription(e.target.value);
    };
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTaskDescription(e.target.value);
    };
    const [startDate, setStartDate] = useState(new Date());
    const changeStartDate = (e: any) => {
        setStartDate(e);
    }
    const [endDate, setEndDate] = useState(new Date());
    const changeEndDate = (e: any) => {
        setEndDate(e);
    }
    const [taskStartDate, setTaskStartDate] = useState(new Date());
    const changeTaskStartDate = (e: any) => {
        setTaskStartDate(e);
    }
    const [taskEndDate, setTaskEndDate] = useState(new Date());
    const changeTaskEndDate = (e: any) => {
        setTaskEndDate(e);
    }
    const handleAdd = async () => {
      var newTask : Task = {
        id: data.length + 1,
        description: taskDescription,
        startDate: startDate,
        endDate: endDate
      }
      if (data.length <= 50)
      {
        data.push(newTask);
        handleDataChange(data);
      }
      setTaskDescription('');
      setStartDate(new Date());
      setEndDate(new Date());
    }
    const handleEdit = (taskId: number) => {
      data[taskId - 1] = {
        id: taskId,
        description: taskEditDescription,
        startDate: taskStartDate,
        endDate: taskEndDate
      }
      handleDataChange(data);
      setModifier(false);
    }
    var dateTimeFormat = new Intl.DateTimeFormat("et", {
      year: "numeric",
      month: "long",
      day: "2-digit"
    });
    return(
    <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ülesanne</TableCell>
                <TableCell>Algus</TableCell>
                <TableCell>Lõpp</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
              .map(task => (
                <TableRow
                  hover
                  key={task.id}
                >
                  <TableCell>{modifier && editTaskId === task.id ? 
                    <TextField 
                    value={taskEditDescription} 
                    onChange={handleEditDescriptionChange} 
                    required 
                    variant="outlined" 
                    label="Ülesande kirjeldus"/> : 
                    task.description}
                  </TableCell>

                  <TableCell>
                    {modifier && editTaskId === task.id ? 
                    <DateComponent date={taskStartDate} onDateChange={changeTaskStartDate} label="Ülesande algus kuupäev" /> :
                    dateTimeFormat.format(task.startDate)}
                  </TableCell>

                  <TableCell>{modifier && editTaskId === task.id ? 
                    <DateComponent date={taskEndDate} onDateChange={changeTaskEndDate} label="Ülesande tähtaeg" /> :
                    dateTimeFormat.format(task.endDate)}
                  </TableCell>
                  
                  <TableCell>
                    {modifier && editTaskId === task.id ? 
                    <Button 
                      onClick={(e) => {
                        handleEdit(task.id);
                        setEditTaskId(0);
                        }} 
                      variant="contained" 
                      color="primary"> Kinnita
                    </Button> :
                    <Button 
                      onClick={(e) => {
                        setModifier(true);
                        setEditTaskId(task.id);
                        setTaskEditDescription(task.description);
                        setTaskStartDate(task.startDate);
                        setTaskEndDate(task.endDate);
                        }} 
                      variant="contained" 
                      color="primary"> Muuda
                    </Button>}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>
                  <TextField 
                  value={taskDescription} 
                  onChange={handleDescriptionChange} 
                  required 
                  variant="outlined" 
                  label="Ülesande kirjeldus"/>
                </TableCell>
                <TableCell><DateComponent date={startDate} onDateChange={changeStartDate} label="Ülesande algus kuupäev" /></TableCell>
                <TableCell><DateComponent date={endDate} onDateChange={changeEndDate} label="Ülesande tähtaeg" /></TableCell>
                <TableCell><Button onClick={handleAdd} variant="contained" color="primary">Lisa</Button></TableCell>
              </TableRow>
            </TableBody>
          </Table>
    );
}
export default TaskTable