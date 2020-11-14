import 'date-fns';
import React, { FC } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

type DateType = {
    date: Date,
    label: string,
    onDateChange(e: any): any,
}

export const DateComponent:FC<DateType> = ( {date, onDateChange, label}) => {

  const handleDateChange = (date: Date | null) => {
    onDateChange(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          disablePast
          variant="inline"
          format="dd.MM.yyyy"
          margin="normal"
          id={ "select-date-" + label}
          label={label}
          value={date}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'muuda',
          }}
          autoOk={true}
        />
    </MuiPickersUtilsProvider>
  );
}

export default DateComponent