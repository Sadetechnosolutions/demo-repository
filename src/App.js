import './styles.css';
import { useEffect } from 'react';
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
import SetEditprofile from './pages/editprofilesetting';
import Profileheader from './components/profileheader';
import Personalinfo from './pages/Personal info';
import Photos from './pages/photos';
import Videos from './pages/videos';
import Modal from 'react-modal';
import Photodisplay from './pages/photodisplay';
import Videodisplay from './pages/videodisplay';
import Photographer from './pages/photographer';
import Saved from './components/saved';
import Generalsettings from './pages/generalsettings';
import PrivacyandDataSetting from './pages/privacyndatasettings';
import Notificationsettings from './pages/notificationsetting';
import MessageSettings from './pages/messagesettings';
import ErrorPage from './pages/errorpage';
import Messages from './pages/messages';
import MessageDetails from './components/messagedetails';
import data from './message.json'
import StoryPage from './pages/storydisplay';
import PhotosUser from './userview/Photos';
import ProfileheaderUser from './userview/Profileheader';
import VideosUser from './userview/videos';
import ProfileView from './userview/profile';
import Friendview from './userview/friendlist';
import FollowersView from './userview/followers';
import FollowingView from './userview/following';
import Followers from './pages/follower';
import Following from './pages/following';
import Timeline from './pages/timeline';
import Formbar from './userview/formbar';
import PersonalInfo from './userview/perinfo';
import Addfriends from './userview/addfriends';
import Dashboard from './admindashboard/dashboard';
import PrivateRoute from './pages/privateroute';
import UserForm from './userview/defaultform';
import { useDispatch } from 'react-redux';
import { logout } from './slices/authslice';

Modal.setAppElement('#root');

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
      // On app initialization, check if token exists
      const token = localStorage.getItem('token');
      
      if (!token) {
          // If no token, clear the Redux state
          dispatch(logout());
      }
  }, [dispatch]);
  return(
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forgotpassword' element={<Forgotpassword />} />
        <Route path='/resetpassword' element={<Resetpassword />} />
        <Route path='/gw' element={<Formbar />} />
        <Route path='/userform' element={<UserForm />} />
        <Route path='/pw' element={<PersonalInfo />} />
        <Route path='/forgotpassword2' element={<Forgotpassword2 />} />
        <Route path="/newsfeed" element={<DefaultWithNavbar><Home /></DefaultWithNavbar>} />
        <Route path='/messages' element={<Messages />} />
        <Route path='messages/:messagesId' element={<MessageDetails data={data} />} />
        <Route path='/notifications' element={<DefaultWithNavbar><DefaultWithHeader><Notifications /></DefaultWithHeader></DefaultWithNavbar>} />
        <Route path='/profile' element={<DefaultWithNavbar><DefaultWithHeader><Profile /></DefaultWithHeader></DefaultWithNavbar>} />
        <Route path='/friends' element={<DefaultWithNavbar><DefaultWithHeader><Friendlist /></DefaultWithHeader></DefaultWithNavbar>} />
        <Route path='/photos'  exact element={<DefaultWithNavbar><DefaultWithHeader><Photos /></DefaultWithHeader></DefaultWithNavbar>} />
        <Route path='/videos' element={<DefaultWithNavbar><DefaultWithHeader><Videos /></DefaultWithHeader></DefaultWithNavbar>} />
        <Route path='/followers' element={<DefaultWithNavbar><DefaultWithHeader><Followers /></DefaultWithHeader></DefaultWithNavbar>} />
        <Route path='/following' element={<DefaultWithNavbar><DefaultWithHeader><Following /></DefaultWithHeader></DefaultWithNavbar>} />
        <Route path='/timeline' element={<Timeline />} />
        <Route path='/editpersonal' element={<DefaultWithNavbar><Personalinfo /></DefaultWithNavbar>} />
        <Route path='/friendrequest' element={<DefaultWithNavbar><DefaultWithHeader><Friendrequest /></DefaultWithHeader></DefaultWithNavbar>} />
        <Route path='/editprofile' element={<DefaultWithNavbar><DefaultWithHeader><SetEditprofile /></DefaultWithHeader></DefaultWithNavbar>} />
        <Route path='/photos/:id' element={<DefaultWithNavbar><Photodisplay /></DefaultWithNavbar>}/>
        <Route path='/videos/:id' element={<Videodisplay />} />
        <Route path='/profession' element={<Photographer />} />
        <Route path='/saved' element={<DefaultWithNavbar><DefaultWithHeader><Saved /></DefaultWithHeader></DefaultWithNavbar>} />
        <Route path='/settings' element={<DefaultWithNavbar><DefaultWithHeader><Generalsettings /></DefaultWithHeader></DefaultWithNavbar>} />
        <Route path='/Privacydata' element={<DefaultWithNavbar><DefaultWithHeader><PrivacyandDataSetting /></DefaultWithHeader></DefaultWithNavbar>} />
        <Route path='/notificationsettings' element={<DefaultWithNavbar><DefaultWithHeader><Notificationsettings /></DefaultWithHeader></DefaultWithNavbar>} />
        <Route path='/messagesettings' element={<DefaultWithNavbar><DefaultWithHeader><MessageSettings /></DefaultWithHeader></DefaultWithNavbar>} />
        <Route path='/storypage' element={<StoryPage />}/>
        <Route path='/photosview' element={<DefaultWithNavbar><DefaultWithHeaderUser><PhotosUser /></DefaultWithHeaderUser></DefaultWithNavbar>}/>
        <Route path='/profilehead' element={<ProfileheaderUser />}/>
        <Route path='/addfriends' element={<Addfriends />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/videosview' element={<DefaultWithNavbar><DefaultWithHeaderUser><VideosUser /></DefaultWithHeaderUser></DefaultWithNavbar>} />
        <Route path='/profileview' element={<DefaultWithNavbar><DefaultWithHeaderUser><ProfileView /></DefaultWithHeaderUser></DefaultWithNavbar>}/>
        <Route path='/friendsview' element={<DefaultWithNavbar><DefaultWithHeaderUser><Friendview /></DefaultWithHeaderUser></DefaultWithNavbar>} />
        <Route path='followersview' element={<DefaultWithNavbar><DefaultWithHeaderUser><FollowersView /></DefaultWithHeaderUser></DefaultWithNavbar>} />
        <Route path='followingview' element={<DefaultWithNavbar><DefaultWithHeaderUser><FollowingView /></DefaultWithHeaderUser></DefaultWithNavbar>} />
        <Route path='*' element={<ErrorPage />} />
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

const DefaultWithHeaderUser = ({ children }) => {
  return (
    <>
      <ProfileheaderUser />
      {children}
    </>
  );
};

  const DefaultWithHeader = ({ children }) => {
  return (
    <>
      <Profileheader />
      {children}
    </>
  );
};

export default App;
