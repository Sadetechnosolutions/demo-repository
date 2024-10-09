import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { Player,BigPlayButton,LoadingSpinner } from "video-react";
import moment from "moment";
import { Icon } from "@iconify/react/dist/iconify.js";
import { removeSaved } from "../slices/photoslice";

const Saved = ()=>{
   const {saved} = useSelector((state)=>state.photo);
   const dispatch = useDispatch()
 return(
                <div className="w-full flex flex-col items-center justify-center">
                    <div className=" flex gap-2 items-center w-5/6 items-start text-lg p-2 font-semibold"><Icon className="w-6 h-6" icon="foundation:book-bookmark" /><span>Saved</span></div>
                <div className="w-5/6 flex items-center">
                {saved.map((post)=>{
                                  const renderMedia = () => {
                                    if (!post.media || !post.media.type) return null;
                                    if (post.media.type === 'image') {
                                        return <img className='w-full h-52' src={post.media.path} alt='' />;
                                    } else if (post.media.type === 'video') {
                                        return <Player className='w-full' playsInline>
                                        <source src={post.media.path} type='video/mp4' />
                                        <BigPlayButton position="center" /><LoadingSpinner />
                                    </Player>;
                                    }
                                    return null;
                                };
            return(
                    <div className="rounded-md flex flex-col bg-white mb-8 gap-4 shadow-lg w-1/4 py-2 px-4">
                    <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                    <img className="rounded-full w-11 h-11" src={post.dp} alt="" />
                    <div className="flex flex-col">
                        <span className="font-semibold">{post.name}</span>
                        <span className="text-sm text-gray-600">Posted {moment(post.timestamp).fromNow()}</span>
                    </div>
                    </div>
                    <Icon onClick={() => dispatch(removeSaved(post.id))} className="cursor-pointer h-6 w-6 text-cta" icon="material-symbols-light:bookmark-sharp" />                </div>
                <span className="text-sm h-9 block truncate">{post.caption}</span>
                <div>
                   {renderMedia()} 
                </div>

</div> 
        )})}
</div>
</div>

 )   
}

export default Saved;