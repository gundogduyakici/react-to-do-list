import { Grid, Typography, Button, Card, CardActions, CardContent } from '@material-ui/core';
import useStyles from '../styles';

const ToDoList = (props) => {
    const classes = useStyles();

    if(props.todos === undefined)
        return  <Typography style={{ marginTop: 20 }} gutterBottom variant="h5">Opps .. I guess things didn't work out</Typography>

    if(!props.todos.length)
        return <Typography style={{ marginTop: 20 }} gutterBottom variant="h5">Mmm .. Don't have any plans?</Typography>

    return(
        <>
            { props.todos.map((data, i) => {
                return <Grid key={i} item xs={12} sm={6} md={4} lg={4} style={{ padding: 10 }}>
                            <Card className={classes.card}>
                                <CardContent className={classes.cardContent}>
                                    <Typography style={{ fontSize: 12, float: 'right' }}  gutterBottom>
                                        {data.date}
                                    </Typography>

                                    <Typography style={data.completed === true ? {textDecoration: 'line-through', color: 'green'} : null} gutterBottom variant="h5">
                                        {data.title}
                                    </Typography>

                                    <Typography>
                                        {data.description}
                                    </Typography>
                                </CardContent>

                                <CardActions>
                                    <Button onClick={() => props.updateTask(data.id)} size="small" color="primary">Mark Completed</Button>
                                    <Button size="small" color="primary">Mark Pause</Button>
                                </CardActions>
                            </Card>
                        </Grid>
            }) }            
        </>
    )
}

export default ToDoList;
