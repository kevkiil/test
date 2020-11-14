import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './title';

function preventDefault(event) {
  event.preventDefault();
}



export default function Orders() {
  
  const useStyles = makeStyles({
    depositContext: {
      flex: 1,
    },
  });
  const classes = useStyles();
 
 
  return (
    <React.Fragment>
      <Title>Tänane kuupäev</Title>
      <Typography component="p" variant="h5">
        {new Intl.DateTimeFormat("et", {
          year: "numeric",
          month: "long",
          day: "2-digit"
        }).format(Date.now())}
      </Typography>
    </React.Fragment>
  );
}