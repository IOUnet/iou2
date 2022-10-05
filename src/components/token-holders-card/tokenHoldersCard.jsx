import React, {useEffect, useState} from 'react';
import {Box, Grid, Card, withStyles, Typography} from "@material-ui/core";
import styles from "./styles";
import FavoriteIcon from "@material-ui/icons/Favorite";

const TokenHoldersCard =({classes, data}) => {

  useEffect(() => {
    console.log(123)
  })


  const holders = data
    ? data.map(holder => {

      let feedbackDate =  new Date(parseInt(holder.value.time) * 1000);
      let time = `${feedbackDate.getHours()}:${feedbackDate.getMinutes()}`;
      let feedbackMonth = feedbackDate.getMonth() + 1 < 10
        ? "0" + (feedbackDate.getMonth() + 1)
        : (feedbackDate.getMonth() + 1);
      let date = `${feedbackDate.getDate()}.${feedbackMonth}.${feedbackDate.getFullYear()}`;

      return {
        receiver: holder.value.receiver,
        description: holder.value.IOUDescr,
        date,
        time
      }
    })
    : []
  return (
    <Grid item className={classes.root}>
      <Typography variant="h5">Holders</Typography>
      { holders && holders.map((holder, id) => (
        <Card className={classes.card}>
          <Grid container direction="column">
            <Grid  item container direction="column">
              <Grid item>
                <Typography className={classes.receiver}>
                  {id+1}. {holder.receiver}
                </Typography>
              </Grid>
              <Grid container item>
                <Grid xs={9} item>
                  <Grid item className={classes.description}>
                    {holder.description}
                  </Grid>
                </Grid>
                <Grid xs={3} item container justifyContent="center" className={classes.timeAndDate}>
                  {holder.time} - {holder.date}
                </Grid>
              </Grid>
            </Grid>

          </Grid>
        </Card>
        ))
      }
    </Grid>
  )
};


export default withStyles(styles, { withTheme: true })(TokenHoldersCard);