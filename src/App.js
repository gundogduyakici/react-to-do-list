import React from 'react';
import MetaDecorator from './util/meta-decorator';
import { Typography, AppBar, Button, CssBaseline, Grid, Toolbar, Container } from '@material-ui/core';
import { NoteAddOutlined } from '@material-ui/icons';
import ToDoList from './components/to-do-list';

import useStyles from './styles';

function App() {
    const classes = useStyles();
    /** Modal Value */
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
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

                <ToDoList open={open} close={handleClose} />
                                
            </main>

            <footer className={classes.footer}>
                <Typography variant="h6" align="center" style={{ color: 'white' }}>© 2021 Gündoğdu Yakıcı</Typography>
            </footer>
        </>
    );
}

export default App;