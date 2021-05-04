import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({    
  container: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 8)
  },
  icon: {
    marginRight: '20px'
  },
  button: {
    marginTop: '40px'
  },
  cardGrid: {
    padding: '50px 20px',
    display: 'flex',
    flexDirection: 'row'
  },
  card: {
    height: '100%',
    display: 'flex',
    padding: '20px',
    flexDirection: 'column'
  },
  cardDate: {
    fontSize: 13,
    float: 'right'
  },
  cardContent: {
    flexGrow: 1
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'    
  },
  paper: {
    backgroundColor: theme.palette.background.paper,    
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  tabPanel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30    
  },
  footer: {
    backgroundColor: '#3F51B5',
    padding: '20px 20px'
  }
}));

export default useStyles;