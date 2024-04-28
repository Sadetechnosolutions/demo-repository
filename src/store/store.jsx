import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from '../slices/notificationslice'
import friendrequestReducer from '../slices/friendrequestslice';
import messageReducer from '../slices/messageslice'
import friendReducer from '../slices/friendlistslice'
import photoReducer from '../slices/photoslice'
import videoReducer from '../slices/videoslice'
import likeReducer from '../slices/likeslice'
import commentReducer from '../slices/commentslice'

const Store = configureStore({
    reducer:{
        notification:notificationReducer,
        friendrequest:friendrequestReducer,
        message:messageReducer,
        friend:friendReducer,
        photo:photoReducer,
        video:videoReducer,
        like:likeReducer,
        comment:commentReducer
    }
})

export default Store;
