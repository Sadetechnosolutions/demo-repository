import './styles.css';
import { useEffect,useRef  } from 'react';
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
import Followers from './pages/follower';
import Following from './pages/following';
import Formbar from './userview/formbar';
import PersonalInfo from './userview/perinfo';
import Addfriends from './userview/addfriends';
import Dashboard from './admindashboard/dashboard';
import UserDetails from './pages/userdetails';
import UserForm from './userview/defaultform';
import Chat from './pages/chat';
import Post from './userview/timeline';
import StoryUpload from './pages/uploadstory';
import Sliper from './pages/uploadreels.';
import DisplayReels from './pages/displayreels';
import OneSignal from 'react-onesignal';
import Shortcut from './components/shortcut';

Modal.setAppElement('#root');

function App() {

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Use token (e.g., set it in state)
    }
  }, []);
  
  const isInitialized = useRef(false); // Create a ref to track initialization

  useEffect(() => {
    // Ensure this code runs only on the client side
    if (typeof window !== 'undefined' && !isInitialized.current) {
      OneSignal.init({
        appId: '4278726c-031a-4bb7-8a8b-b85b021e762e',
        notifyButton: {
          enable: true,
        },
      });
      isInitialized.current = true; // Set the flag to true after initialization
    }
  }, []);

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
        <Route path="/user/:userID" element={<DefaultWithNavbar><DefaultWithHeaderUser><DefaultShortcut><UserDetails /></DefaultShortcut></DefaultWithHeaderUser></DefaultWithNavbar>} />
        <Route path='/forgotpassword2' element={<Forgotpassword2 />} />
        <Route path="/newsfeed" element={<DefaultWithNavbar><Home /></DefaultWithNavbar>} />
        <Route path='/messages' element={<Messages />} />
        <Route path='messages/:messagesId' element={<MessageDetails data={data} />} />
        <Route path='/notifications/:userID' element={<DefaultWithNavbar><DefaultWithHeaderUser><Notifications /></DefaultWithHeaderUser></DefaultWithNavbar>} />
        <Route path='/profile' element={<DefaultWithNavbar><DefaultWithHeader><Profile /></DefaultWithHeader></DefaultWithNavbar>} />
        <Route path='/friends' element={<DefaultWithNavbar><DefaultWithHeader><Friendlist /></DefaultWithHeader></DefaultWithNavbar>} />
        <Route path='/photos'  exact element={<DefaultWithNavbar><DefaultWithHeaderUser><DefaultShortcut><Photos /></DefaultShortcut></DefaultWithHeaderUser></DefaultWithNavbar>} />
        <Route path='/videos' element={<DefaultWithNavbar><DefaultWithHeader><Videos /></DefaultWithHeader></DefaultWithNavbar>} />
        <Route path='/followers/:userID' element={<DefaultWithNavbar><DefaultWithHeaderUser><Followers /></DefaultWithHeaderUser></DefaultWithNavbar>} />
        <Route path='/following/:userID' element={<DefaultWithNavbar><DefaultWithHeaderUser><Following /></DefaultWithHeaderUser></DefaultWithNavbar>} />
        <Route path='/editpersonal' element={<DefaultWithNavbar><Personalinfo /></DefaultWithNavbar>} />
        <Route path='/friendrequest/:userID' element={<DefaultWithNavbar><DefaultWithHeaderUser><Friendrequest /></DefaultWithHeaderUser></DefaultWithNavbar>} />
        <Route path='/editprofile' element={<DefaultWithNavbar><DefaultWithHeader><SetEditprofile /></DefaultWithHeader></DefaultWithNavbar>} />
        <Route path='/photos/:id' element={<DefaultWithNavbar><Photodisplay /></DefaultWithNavbar>}/>
        <Route path='/videos/:id' element={<Videodisplay />} />
        <Route path='/profession' element={<Photographer />} />
        <Route path='/saved' element={<DefaultWithNavbar><DefaultWithHeaderUser><Saved /></DefaultWithHeaderUser></DefaultWithNavbar>} />
        <Route path='/settings' element={<DefaultWithNavbar><DefaultWithHeaderUser><Generalsettings /></DefaultWithHeaderUser></DefaultWithNavbar>} />
        <Route path='/Privacydata' element={<DefaultWithNavbar><DefaultWithHeaderUser><PrivacyandDataSetting /></DefaultWithHeaderUser></DefaultWithNavbar>} />
        <Route path='/notificationsettings' element={<DefaultWithNavbar><DefaultWithHeaderUser><Notificationsettings /></DefaultWithHeaderUser></DefaultWithNavbar>} />
        <Route path='/messagesettings' element={<DefaultWithNavbar><DefaultWithHeaderUser><MessageSettings /></DefaultWithHeaderUser></DefaultWithNavbar>} />
        <Route path='/storypage' element={<StoryPage />}/>
        <Route path='/timelineview/:userID' element={<DefaultWithNavbar><DefaultWithHeaderUser><DefaultShortcut><Post /></DefaultShortcut></DefaultWithHeaderUser></DefaultWithNavbar>}/>
        <Route path='/photosview/:userID' element={<DefaultWithNavbar><DefaultWithHeaderUser><DefaultShortcut><PhotosUser /></DefaultShortcut></DefaultWithHeaderUser></DefaultWithNavbar>}/>
        <Route path='/profilehead' element={<ProfileheaderUser />}/>
        <Route path='/uploadstory' element={<StoryUpload />}/>
        <Route path='/addfriends' element={<Addfriends />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/videosview/:userID' element={<DefaultWithNavbar><DefaultWithHeaderUser><DefaultShortcut><VideosUser /></DefaultShortcut></DefaultWithHeaderUser></DefaultWithNavbar>} />
        <Route path='/profileview' element={<DefaultWithNavbar><DefaultWithHeaderUser><ProfileView /></DefaultWithHeaderUser></DefaultWithNavbar>}/>
        <Route path='/friendsview/:userID' element={<DefaultWithNavbar><DefaultWithHeaderUser><DefaultShortcut><Friendview /></DefaultShortcut></DefaultWithHeaderUser></DefaultWithNavbar>} />
       
        <Route path='*' element={<ErrorPage />} />
        <Route path='test' element={ <Sliper />} />
        <Route path='/Reels/:userID' element={<DefaultWithNavbar><DisplayReels /></DefaultWithNavbar>} />
        <Route path='/chat' element={<Chat />} />
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

const DefaultShortcut = ({children}) =>{
  return(
    <>
            <Shortcut />
            {children}
    </>
  )
  
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
