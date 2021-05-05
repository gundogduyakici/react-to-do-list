import React from 'react';
import MetaDecorator from './util/meta-decorator';
import { Typography, AppBar, Button, TextField, CssBaseline, Grid, Toolbar, Container } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { NoteAddOutlined } from '@material-ui/icons';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ToDoList from './components/to-do-list';

import useStyles from './styles';

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

function App() {
    const classes = useStyles();

    /** Tab Content */
    const [value, setValue] = React.useState(0);
    /** Modal Value */
    const [open, setOpen] = React.useState(false);
    /** Modal Input Values */
    const [counter, setCounter] = React.useState(0);
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    /** Errors State */
    const [error, setError] = React.useState(false);
    const [errorTitle, setErrorTitle] = React.useState(false);
    /** Todo Array State */
    const [todos, setTodos] = React.useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const prepareData = () => {
        if(!title.length || !description.length) {
            setError(true);
            setErrorTitle("This field is required.");            
        }else {
            let todos = { id: counter, title: title, description: description, completed: false, date: new Date().toLocaleString() }
            setCounter(counter+1);

            setError(false);
            setErrorTitle("");

            setTodos(previousData => [...previousData, todos])

            setTitle("");
            setDescription("");
        }
    }

    const updateTask = (id) => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo));
    }

    return (
        <>            
            <MetaDecorator title="React To Do List" description="To do list application made with React" author="Gündoğdu Yakıcı" />      

            <CssBaseline />
            
            <AppBar position="relative">
                <Toolbar>
                    <NoteAddOutlined className={classes.icon} />
                    <Typography variant="h6">
                        To Do List v1.0
                    </Typography>
                </Toolbar>
            </AppBar>      

            <main>
                <div className={classes.container}>
                    <Container maxWidth="sm">
                        <Typography variant="h2" align="center" color="textPrimary" gutterBottom={true}>
                            To Do List
                        </Typography>

                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            Create the perfect notes now to keep track of all your work!              
                        </Typography>

                        <div className={classes.button}>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                    <Button onClick={handleOpen} variant="contained" color="primary">
                                        Add New
                                    </Button>
                                </Grid>

                                <Grid item>
                                    <Button variant="outlined" color="primary">
                                        Check All
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
                
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
                            <ToDoList todos={todos} updateTask={updateTask} />
                        </TabPanel>

                        <TabPanel value={value} index={1}>
                            <Typography style={{ marginTop: 20 }} gutterBottom variant="h5">Mmm .. Don't have any completed?</Typography>
                        </TabPanel>
                        
                        <TabPanel value={value} index={2}>
                            <Typography style={{ marginTop: 20 }} gutterBottom variant="h5">Mmm .. Don't have any paused?</Typography>
                        </TabPanel>
                    </Grid>
                </Container>
            </main>

            <footer className={classes.footer}>
                <Typography variant="h6" align="center" style={{ color: 'white' }}>© 2021 Gündoğdu Yakıcı</Typography>
            </footer>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
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
    );
}

export default App;
