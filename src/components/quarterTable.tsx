import { Table, TableHead, TableRow, TableCell, TableBody, Box, Typography, Tooltip, Button, TextField } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import React, { useState } from "react";
import { useEffect } from "react";
import { format } from "util";
import { Task } from "../types/taskType";
import DateComponent from "./dateComponent";

type TableProps = {
    data: Task[]
    dateValue: Date
    quarterNumber: number
  };

export const QuarterTable: React.FC<TableProps> = ({ data, dateValue, quarterNumber }) => {

    
    return(
    <Table>
      <TableHead>
        <TableRow >
          <TableCell >{quarterNumber === 1 ? 'Jaanuar' : quarterNumber === 2 ? 'Aprill' : quarterNumber === 3 ? 'Juuli' : quarterNumber === 4 ? 'Oktoober' : ''}</TableCell>
          <TableCell >{quarterNumber === 1 ? 'Veebruar' : quarterNumber === 2 ? 'Mai' : quarterNumber === 3 ? 'August' : quarterNumber === 4 ? 'November' : ''}</TableCell>
          <TableCell>{quarterNumber === 1 ? 'Märts' : quarterNumber === 2 ? 'Juuni' : quarterNumber === 3 ? 'September' : quarterNumber === 4 ? 'Detsember' : ''}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableCell>
        <Table>
        <TableBody>
        {quarterNumber === 1 ? <TableRow>
          <TableCell>1</TableCell><TableCell>2</TableCell><TableCell>3</TableCell><TableCell>4</TableCell>
          </TableRow> : quarterNumber === 2 ? <TableRow>
          <TableCell>13</TableCell><TableCell>14</TableCell><TableCell>15</TableCell><TableCell>16</TableCell>
          </TableRow> : quarterNumber === 3 ? <TableRow>
          <TableCell>25</TableCell><TableCell>26</TableCell><TableCell>27</TableCell><TableCell>28</TableCell>
          </TableRow> : quarterNumber === 4 ? <TableRow>
          <TableCell>37</TableCell><TableCell>38</TableCell><TableCell>39</TableCell><TableCell>40</TableCell>
          </TableRow> : ''}
          </TableBody>
          </Table>
          </TableCell>
          <TableCell>
        <Table>
        <TableHead>
        {quarterNumber === 1 ? <TableRow>
          <TableCell>5</TableCell><TableCell>6</TableCell><TableCell>7</TableCell><TableCell>8</TableCell>
          </TableRow> : quarterNumber === 2 ? <TableRow>
          <TableCell>17</TableCell><TableCell>18</TableCell><TableCell>19</TableCell><TableCell>20</TableCell>
          </TableRow> : quarterNumber === 3 ? <TableRow>
          <TableCell>29</TableCell><TableCell>30</TableCell><TableCell>31</TableCell><TableCell>32</TableCell>
          </TableRow> : quarterNumber === 4 ? <TableRow>
          <TableCell>41</TableCell><TableCell>42</TableCell><TableCell>43</TableCell><TableCell>44</TableCell>
          </TableRow> : ''}
          </TableHead>
          </Table>
          </TableCell>
          <TableCell>
        <Table>
        <TableHead>
        {quarterNumber === 1 ? <TableRow>
          <TableCell>9</TableCell><TableCell>10</TableCell><TableCell>11</TableCell><TableCell>12</TableCell>
          </TableRow> : quarterNumber === 2 ? <TableRow>
          <TableCell>21</TableCell><TableCell>22</TableCell><TableCell>23</TableCell><TableCell>24</TableCell>
          </TableRow> : quarterNumber === 3 ? <TableRow>
          <TableCell>33</TableCell><TableCell>34</TableCell><TableCell>35</TableCell><TableCell>36</TableCell>
          </TableRow> : quarterNumber === 4 ? <TableRow>
          <TableCell>45</TableCell><TableCell>46</TableCell><TableCell>47</TableCell><TableCell>48</TableCell>
          </TableRow> : ''}
          </TableHead>
          </Table>
          </TableCell>
        {data
        .map(task => (
          <TableRow
            
            key={task.id}
          ><TableCell>
            <Table>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </Table>
            </TableCell>
            <TableCell>
              <Table>
                <TableCell></TableCell>
                <TableCell></TableCell>
                {quarterNumber === 4  && dateValue.getFullYear() === 2020 ? <TableCell style={task.id === 1 || task.id === 2 ? {backgroundColor:'red', color: 'white',} : {}}></TableCell> : ''}
                {quarterNumber === 4 && dateValue.getFullYear() === 2020 ? <TableCell style={task.id === 1 || task.id === 2 ? {backgroundColor:'red', color: 'white',} : {}}></TableCell> : ''}
              </Table>
            </TableCell>
            <TableCell>
              <Table>
                {quarterNumber === 4 && dateValue.getFullYear() === 2020 ? <TableCell style={task.id === 1 || task.id === 2 ? {backgroundColor:'red', color: 'white',} : {}}></TableCell> : ''}
                {quarterNumber === 4 && dateValue.getFullYear() === 2020 ? <TableCell style={task.id === 1 ? {backgroundColor:'red', color: 'white',} : {}}></TableCell> : ''}
                {quarterNumber === 4 && dateValue.getFullYear() === 2020 ? <TableCell style={task.id === 1 ? {backgroundColor:'red', color: 'white',} : {}}></TableCell> : ''}
                {quarterNumber === 4 && dateValue.getFullYear() === 2020 ? <TableCell style={task.id === 1 ? {backgroundColor:'red', color: 'white',} : {}}></TableCell> : ''}
              </Table>
            </TableCell>
          </TableRow>
        ))}
        
      </TableBody>
    </Table>
  );
}