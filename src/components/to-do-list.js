import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Grid, Container, Typography, Button, TextField, Card, CardActions, CardContent } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import useStyles from '../styles';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        style={{ display: 'contents' }}
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          children
        )}
      </div>
    );
}

function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const ToDoList = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        checkAll: updateAllTask
    }))

    const classes = useStyles();    

    /** Tab Content */
    const [value, setValue] = useState(0);
    /** Todo Array State */
    const [todos, setTodos] = useState([]);    
    /** Modal Input Values */
    const [counter, setCounter] = useState(0);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    /** Errors State */
    const [error, setError] = useState(false);
    const [errorTitle, setErrorTitle] = useState(false); 

    const prepareData = () => {
        if(!title.length || !description.length) {
            setError(true);
            setErrorTitle("This field is required.");
        }else {
            let todos = { id: counter, title: title, description: description, completed: false, paused: false, date: new Date().toLocaleString() }
            setCounter(counter+1);

            setError(false);
            setErrorTitle("");

            setTodos(previousData => [...previousData, todos])

            setTitle("");
            setDescription("");
        }
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    const updateAllTask = (check) => {        
        setTodos(todos.map(todo => todo.completed === !check ? {...todo, completed: check} : todo));
    }

    const updateCompletedTask = (id) => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo));
    }

    const updatePausedTask = (id) => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, paused: !todo.paused} : todo));
    }

    return(
        <>
            <Container className={classes.tabPanel} maxWidth="md">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" indicatorColor="primary" textColor="primary">
                    <Tab label="All Tasks" {...a11yProps(0)} />
                    <Tab label="Completed" {...a11yProps(1)} />
                    <Tab label="Paused" {...a11yProps(2)} />
                </Tabs>
            </Container>

            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={2} justify="center">
                    <TabPanel value={value} index={0}>                            
                        {
                            !todos.length ? <Typography style={{ marginTop: 20 }} gutterBottom variant="h5">Mmm .. Don't have any plans?</Typography> :
                            todos.map((data, i) => {
                                return (
                                    data.completed === false && data.paused === false ? 
                                        <Grid key={i} item xs={12} sm={6} md={4} lg={4} style={{ padding: 10 }}>
                                            <Card className={classes.card}>
                                                <CardContent className={classes.cardContent}>
                                                    <Typography style={{ fontSize: 12, float: 'right' }}  gutterBottom>
                                                        {data.date}
                                                    </Typography>

                                                    <Typography style={data.completed === true ? { textDecoration: 'line-through', color: 'green' } : null} gutterBottom variant="h5">
                                                        {data.title}
                                                    </Typography>

                                                    <Typography>
                                                        {data.description}
                                                    </Typography>
                                                </CardContent>

                                                <CardActions>
                                                    <Button onClick={() => updateCompletedTask(data.id)} size="small" color="primary">{data.completed === false ? "Mark Completed" : "Unmark Completed"}</Button>
                                                    <Button onClick={() => updatePausedTask(data.id)} size="small" color="primary">{data.paused === false ? "Mark Paused" : "Unmark Paused"}</Button>
                                                </CardActions>
                                            </Card>
                                        </Grid> : null
                                )
                            }) 
                        }
                    </TabPanel>

                    <TabPanel value={value} index={1}>
                        {
                            !todos.length ? <Typography style={{ marginTop: 20 }} gutterBottom variant="h5">Mmm .. Don't have any completed?</Typography> :
                                todos.map((data, i) => {
                                    return (
                                        data.completed === true ? 
                                        <Grid key={i} item xs={12} sm={6} md={4} lg={4} style={{ padding: 10 }}>
                                            <Card className={classes.card}>
                                                <CardContent className={classes.cardContent}>
                                                    <Typography style={{ fontSize: 12, float: 'right' }}  gutterBottom>
                                                        {data.date}
                                                    </Typography>

                                                    <Typography style={data.completed === true ? { textDecoration: 'line-through', color: 'green' } : null} gutterBottom variant="h5">
                                                        {data.title}
                                                    </Typography>

                                                    <Typography>
                                                        {data.description}
                                                    </Typography>
                                                </CardContent>

                                                <CardActions>
                                                    <Button onClick={() => updateCompletedTask(data.id)} size="small" color="primary">{data.completed === false ? "Mark Completed" : "Unmark Completed"}</Button>
                                                    <Button onClick={() => updatePausedTask(data.id)} size="small" color="primary">{data.paused === false ? "Mark Paused" : "Unmark Paused"}</Button>
                                                </CardActions>
                                            </Card>
                                        </Grid> : null
                                    )
                                }) 
                        }
                    </TabPanel>
                    
                    <TabPanel value={value} index={2}>
                        {
                            !todos.length ? <Typography style={{ marginTop: 20 }} gutterBottom variant="h5">Mmm .. Don't have any paused?</Typography> :
                                todos.map((data, i) => {
                                    return (
                                        data.paused === true ? 
                                        <Grid key={i} item xs={12} sm={6} md={4} lg={4} style={{ padding: 10 }}>
                                            <Card className={classes.card}>
                                                <CardContent className={classes.cardContent}>
                                                    <Typography style={{ fontSize: 12, float: 'right' }}  gutterBottom>
                                                        {data.date}
                                                    </Typography>

                                                    <Typography style={data.paused === true ? { color: '#fcb103'} : null } gutterBottom variant="h5">
                                                        {data.title}
                                                    </Typography>

                                                    <Typography>
                                                        {data.description}
                                                    </Typography>
                                                </CardContent>

                                                <CardActions>
                                                    <Button onClick={() => updateCompletedTask(data.id)} size="small" color="primary">{data.completed === false ? "Mark Completed" : "Unmark Completed"}</Button>
                                                    <Button onClick={() => updatePausedTask(data.id)} size="small" color="primary">{data.paused === false ? "Mark Paused" : "Unmark Paused"}</Button>
                                                </CardActions>
                                            </Card>
                                        </Grid> : null
                                    )
                                }) 
                            }
                    </TabPanel>
                </Grid>
            </Container>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={props.open}
                onClose={props.close}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.open}>
                    <div className={classes.paper}>                
                        <form autoComplete="off">
                            <Container maxWidth="sm">
                                <Typography gutterBottom align="center" variant="h5" style={{ marginBottom: 20, marginTop: 10 }}> Job Information </Typography>

                                <Grid container justify="center" spacing={2}>
                                    <Grid item>
                                        <TextField error={error} helperText={errorTitle} id="title" label="Enter Title" value={title} onChange={(event) => setTitle(event.target.value)} variant="outlined" />
                                    </Grid>

                                    <Grid item>
                                        <TextField error={error} helperText={errorTitle} id="description" label="Enter Description" value={description} onChange={(event) => setDescription(event.target.value)} variant="outlined" />
                                    </Grid>

                                    <Grid item style={{ marginTop: 10 }}>
                                        <Button onClick={prepareData} variant="contained" color="secondary">
                                            Create
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Container>
                        </form>
                    </div>
                </Fade>
            </Modal>
        </>
    )
});

export default ToDoList;
