import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: theme.spacing(2),
    width: '100%',
  },
  avatar: {
    marginRight: theme.spacing(1),
    width: '100%',
    height: 'auto',
    maxWidth: '80px',
    maxHeight: '80px',
  },
  content: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    maxWidth: '60%',
    wordWrap: 'break-word',
  },
}));


function DiceMessage({ name, avatar, time, results }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar className={classes.avatar + ''} src={avatar} alt={name} />
      <Box flexGrow={1}>
        <Typography variant="subtitle2" component="span">
          {name} &bull; {time}
        </Typography>
        <Grid container alignItems="center" className={classes.content}>
          <Grid item xs={12}>
            <Typography variant="body1" component="p">
              Resultado da rolagem: <br/> {results.map((value, index) => <> {index+1}°Dado: {value} <br/></>)}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default DiceMessage;
