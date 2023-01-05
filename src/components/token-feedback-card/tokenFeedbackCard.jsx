import React, {useState} from 'react'
import {Box, Typography, Grid, Card, Accordion, AccordionDetails, AccordionSummary, withStyles} from "@material-ui/core";
import styles from './styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import clsx from "clsx";


const TokenFeedbackCard = ({classes, data}) => {

  let feedbacks = data

    ? data.map(item =>{
      let feedbackDate =  new Date(parseInt(item.value.time) * 1000);
      let time = `${feedbackDate.getHours()}:${feedbackDate.getMinutes()}`;
      let feedbackMonth = feedbackDate.getMonth() + 1 < 10
                        ? "0" + (feedbackDate.getMonth() + 1)
                        : (feedbackDate.getMonth() + 1);
      let date = `${feedbackDate.getDate()}.${feedbackMonth}.${feedbackDate.getFullYear()}`;

      return {
        sender: item.value.sender,
        value: item.value.text,
        time,
        date,
        rating: item.value.rating
      }
    })
    : [];

  return (
    <Grid item className={classes.root}>
      <Typography variant="h5">Feedbacks</Typography>
      { feedbacks && feedbacks.map((feedback, id) => (
        <Card className={classes.card}>
          <Grid container direction="column">
            <Grid item container>
              <Grid xs={11} item>
                <Typography className={classes.sender}>
                  {id+1}. {feedback.sender}
                </Typography>
              </Grid>
              <Grid
                container
                item
                xs={1}
                className={clsx(classes.rating, feedback.rating > 0 && classes.rating_positive)}
                direction="column"
                alignItems="center"
              >
                <FavoriteIcon />
                <Typography>
                  {feedback.rating}
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid container item xs={9} alignItems="center" className={classes.feedback}>
                {feedback.value}
              </Grid>
              <Grid container item justifyContent="center" alignItems="flex-end" className={classes.timeAndDate} xs={3}>
                {feedback.time} - {feedback.date}
              </Grid>
            </Grid>
          </Grid>
        </Card>
        ))
      }
    </Grid>
  )
}

export default withStyles(styles, { withTheme: true })(TokenFeedbackCard);

