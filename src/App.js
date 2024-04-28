import './styles.css';
import Signin from './pages/signin';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Signup from './pages/signup';
import Forgotpassword from './components/forgotpassword';
import Resetpassword from './components/resetpassword';
import Forgotpassword2 from './components/forgotpassword2';
import Home from './pages/home';
import Profile from './pages/profile';
import Notifications from './pages/notifications'; 
import Navbar from './components/navbar';
import Friendlist from './pages/friends';
import Friendrequest from './pages/friendrequest';
import Editprofile from './pages/editprofile';
import Profileheader from './components/profileheader';
import Personalinfo from './pages/Personal info';
import Photos from './pages/photos';
import Videos from './pages/videos';
import Modal from 'react-modal';
import Photodisplay from './pages/photodisplay';
import Videodisplay from './pages/videodisplay';
import Photographer from './pages/photographer';

Modal.setAppElement('#root');

function App() {
  return(
    <>
    <Router>
      <Routes>
      <Route path='/' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forgotpassword' element={<Forgotpassword />} />
        <Route path='/resetpassword' element={<Resetpassword />} />
        <Route path='/forgotpassword2' element={<Forgotpassword2 />} />
        <Route path='/newsfeed' element={<DefaultWithNavbar><Home /></DefaultWithNavbar>} />
        <Route path='/notifications' element={<DefaultWithNavbar><DefaultWithHeader><Notifications /></DefaultWithHeader></DefaultWithNavbar>} />
        <Route path='/profile' element={<DefaultWithNavbar><DefaultWithHeader><Profile /></DefaultWithHeader></DefaultWithNavbar>} />
        <Route path='/friends' element={<DefaultWithNavbar><DefaultWithHeader><Friendlist /></DefaultWithHeader></DefaultWithNavbar>} />
        <Route path='/photos'  exact element={<DefaultWithNavbar><DefaultWithHeader><Photos /></DefaultWithHeader></DefaultWithNavbar>} />
        <Route path='/videos' element={<DefaultWithNavbar><DefaultWithHeader><Videos /></DefaultWithHeader></DefaultWithNavbar>} />
        <Route path='/editpersonal' element={<DefaultWithNavbar><Personalinfo /></DefaultWithNavbar>} />
        <Route path='/friendrequest' element={<DefaultWithNavbar><DefaultWithHeader><Friendrequest /></DefaultWithHeader></DefaultWithNavbar>} />
        <Route path='/editprofile' element={<DefaultWithNavbar><Editprofile /></DefaultWithNavbar>} />
        <Route path='/photos/:id' element={<DefaultWithNavbar><Photodisplay /></DefaultWithNavbar>}/>
        <Route path='/videos/:id' element={<Videodisplay />} />
        <Route path='/profession' element={<Photographer />} />

      </Routes>
    </Router>
    </>
  )
}

const DefaultWithNavbar = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

  const DefaultWithHeader = ({ children }) => {
  return (
    <>
      <Profileheader />
      {children}
    </>
  );
};

export default App;
