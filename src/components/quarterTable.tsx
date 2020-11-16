import { Table, TableHead, TableRow, TableCell, TableBody, Box, Typography, Tooltip, Button, TextField } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { getWeek } from "date-fns";
import React, { useState } from "react";
import { useEffect } from "react";
import { format } from "util";
import { Task } from "../types/taskType";
import DateComponent from "./dateComponent";
import { getWeekNumberNonISO } from "./getWeek";
import TaskTable from "./taskTable";

type TableProps = {
    data: Task[]
    dateValue: Date
    quarterNumber: number
  };

export const QuarterTable: React.FC<TableProps> = ({ data, dateValue, quarterNumber }) => {
    var dateTest = new Date('2021-01-01')
    var dateTest1 = new Date('2021-02-01')
    const quarterList = (quarterNr?: number) =>
    {
      switch (quarterNr) {
        case 1: return ['Jaanuar', 'Veebruar', 'Märts']
        case 2: return ['Aprill', 'Mai', 'Juuni']
        case 3: return ['Juuli', 'August', 'September']
        case 4: return ['Oktoober', 'November', 'Detsember']
      }
    }
    
    const monthFinder = (quarterNumber?: number, monthNumber?: number) =>
    {
      switch (quarterNumber) {
        case 1:
          {
            switch (monthNumber) {
              case 1: return 1;
              case 2: return 2;
              case 3: return 3;
            }
            break;
          }
        case 2:
          {
            switch (monthNumber) {
              case 1: return 4;
              case 2: return 5;
              case 3: return 6;
            }
            break;
          }
        case 3:
          {
            switch (monthNumber) {
              case 1: return 7;
              case 2: return 8;
              case 3: return 9;
            }
            break;
          }
        case 4:
          {
            switch (monthNumber) {
              case 1: return 10;
              case 2: return 11;
              case 3: return 12;
          }
          break;
      } 
    }}
      

    const weekListHelper = (quarterNumber?: number, monthNumberTemp?: number, yearNumber?: number) =>
    {
      let monthNumber = monthFinder(quarterNumber, monthNumberTemp)
      let monthNumberAdded = monthNumber ? monthNumber + 1 : 0
      if (monthNumberAdded === 13)
      {
        yearNumber = yearNumber ? yearNumber + 1 : 0
        monthNumberAdded = 1;
      }
      
      var firstday = yearNumber + '-' + monthNumber + '-01'
      var lastday = yearNumber + '-' + monthNumberAdded + '-01'
      
      var weeks = [];
      var lastDayOfTheMonth = new Date(lastday);
      var firstDayOfTheMonth = new Date(firstday)
      var firstWeek = getWeekNumberNonISO(new Date(firstday));
      
      lastDayOfTheMonth.setDate(lastDayOfTheMonth.getDate() - 1);
      
      var lastWeek = getWeekNumberNonISO(lastDayOfTheMonth);
      
      if (getWeekNumberNonISO(firstDayOfTheMonth) > getWeekNumberNonISO(lastDayOfTheMonth))
      {
        weeks.push(getWeekNumberNonISO(firstDayOfTheMonth));
        firstWeek = 1;
      }

      for (let index = firstWeek; index <= lastWeek; index++) {
        weeks.push(index)
      }
      
      return weeks;
    }
    
    const coloring = (task: any, weekNr?: any, year?: any ) =>
    {
      console.log(weekNr + ' ' + year)
      if (year === task.startDate.getFullYear())
      {
        if (year === task.endDate.getFullYear())
        {
          if (weekNr >= getWeekNumberNonISO(task.startDate) && weekNr <= getWeekNumberNonISO(task.endDate))
          {
            return true
          }
          else
          {
            return false;
          }
        }
        else
        {
          if (weekNr >= getWeekNumberNonISO(task.startDate))
          {
            return true
          }
          else
          {
            return false;
          }
        }
      }
      else if (year === task.endDate.getFullYear())
      {
        if (weekNr <= getWeekNumberNonISO(task.endDate))
          {
            return true
          }
          else
          {
            return false;
          }
      }
    }

    return(
    <Table>
      <TableHead>
        <TableRow >
          {quarterList(quarterNumber)?.map((e) => 
          <TableCell>{e}</TableCell>
          )}
          
        </TableRow>
      </TableHead>
      <TableBody>
        <TableCell>
        <Table>
        <TableBody>
        <TableRow>
          
          {weekListHelper(quarterNumber, 1, dateValue.getFullYear()).map((e) => 
          <TableCell>{e}</TableCell>
          )}
        </TableRow>
        </TableBody>
        </Table>
        </TableCell>
          <TableCell>
        <Table>
        <TableHead>
        <TableRow>
        {weekListHelper(quarterNumber, 2, dateValue.getFullYear()).map((e) => 
          <TableCell>{e}</TableCell>
          )}
        </TableRow>
        </TableHead>
        </Table>
        </TableCell>
        <TableCell>
        <Table>
        <TableHead>
        <TableRow>
        {weekListHelper(quarterNumber, 3, dateValue.getFullYear()).map((e) => 
          <TableCell>{e}</TableCell>
          )}
          </TableRow>
          </TableHead>
          </Table>
          </TableCell>
        {data
        .map(task => (
          
          <TableRow
            
            key={task.id}
          ><TableCell>
            <Table>
            {weekListHelper(quarterNumber, 1, dateValue.getFullYear()).map((e) => 
              <Tooltip title={coloring(task, e, dateValue.getFullYear()) === true ? 'Week: ' + e + ' - ' + task.description : 'Week: ' + e}>
               <TableCell style={coloring(task, e, dateValue.getFullYear()) === true ? {backgroundColor:'red', color: 'white',} : {}}>
                 
               </TableCell>
               </Tooltip>
                )}
            </Table>
            </TableCell>
            <TableCell>
              <Table>
              {weekListHelper(quarterNumber, 2, dateValue.getFullYear()).map((e) => 
              <Tooltip title={coloring(task, e, dateValue.getFullYear()) === true ? 'Week: ' + e + ' - ' + task.description : 'Week: ' + e}>
               <TableCell style={coloring(task, e, dateValue.getFullYear()) === true ? {backgroundColor:'red', color: 'white',} : {}}>
                 
               </TableCell>
               </Tooltip>
                )}
              </Table>
            </TableCell>
            <TableCell>
              <Table>
              {weekListHelper(quarterNumber, 3, dateValue.getFullYear()).map((e) => 
              <Tooltip title={coloring(task, e, dateValue.getFullYear()) === true ? 'Week: ' + e + ' - ' + task.description : 'Week: ' + e}>
               <TableCell style={coloring(task, e, dateValue.getFullYear()) === true ? {backgroundColor:'red', color: 'white',} : {}}>
                 
               </TableCell>
               </Tooltip>
                )}
              </Table>
            </TableCell>
          </TableRow>
        ))}
        
      </TableBody>
    </Table>
  );
}