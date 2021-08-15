import './App.css';
import Typography from '@material-ui/core/Typography'
import { Container } from '@material-ui/core';
function App() {
  return (
    <div>
      <Container fixed>
        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '50vh' }} />
      </Container>
    </div>
  );
}

export default App;
