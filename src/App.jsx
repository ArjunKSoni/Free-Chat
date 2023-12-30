import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Store from './redux/store';
import { Provider } from 'react-redux';
import Chatroom from './components/chatroom';
import Chatscreen from './components/chatscreen';
function App() {
  return (
    <Provider store={Store}>
      <Router>
        <Routes>
          <Route exact path='/' element={<Signup />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/chatroom' element={<Chatroom />} />
          <Route exact path='/chatscreen/:id' element={<Chatscreen />} />
        </Routes>
      </Router>
    </Provider>
  );
}
export default App;