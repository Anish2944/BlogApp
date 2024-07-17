import React, { useState,useEffect } from 'react'
import service from '../appwrite/config'
import { Container } from '../components'
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTurnUp} from '@fortawesome/free-solid-svg-icons'

function Home() {

    // const [posts,setPosts] = useState([]);

    // useEffect(() => {
      
    //     service.getPosts().then((posts) => {
    //         if (posts) {
    //             setPosts(posts.documents)
    //         }
    //     })
    // }, [])
    const isAuth = useSelector(state => state.auth.status)

    // if (posts.length === 0) {
        return (
            <div className='w-full py-8 mt-4'>
                <Container>
                    <div className='flex flex-wrap'>
                        <div className='md:p-8 p-4 relative mx-10 md:mr-10 w-full'>
                            <h1 className=' shadow-2xl shadow-text  text-4xl md:text-6xl md:mx-40 mb-11 font-bold p-8 text-text'>
                            Express your views, ideas, story and Knowledge.
                            </h1>
                            <p className=' shadow-text shadow-2xl bg-accent p-4 md:p-8 md:mx-40 text-lg md:text-2xl'>BlogApp is a home for human stories and ideas. Here, anyone can share insightful perspectives, useful knowledge, and life wisdom with the world—without building a mailing list or a following first. The internet is noisy and chaotic; BlogApp is quiet yet full of insight. It’s simple, beautiful, collaborative, and helps you find the right audience for whatever you have to say.


We believe that what you read and write matters. Words can divide or empower us, inspire or discourage us. In a world where the most sensational and surface-level stories often win, we’re building a system that rewards depth, nuance, and time well spent. A space for thoughtful conversation more than drive-by takes, and substance over packaging.</p>
                        </div>
                        { !isAuth && ( <><div className='-rotate-12 xl:visible invisible absolute top-14 text-3xl right-12 mr-40'>
                            <FontAwesomeIcon icon={faArrowTurnUp} style={{color: '#4a148c'}} size='2xl' flip='horizontal' />
                        </div>
                        <div className='absolute xl:visible invisible bg-accent p-2 hover:shadow-2xl hover:shadow-background rounded-full top-24 right-4 mr-8 font-bold'>
                            Log in to read Blogs
                        </div></>) }
                    </div>
                </Container>
            </div>
        )
    // }
    

//   return (
//     <div className='py-8 w-full'>
//         <Container>
//             <div className='flex flex-wrap'>
//                 {posts.map((post) => (
//                     <div key={post.$id} className='p-2 w-1/4'>
//                         <PostCard {...post} />
//                     </div>
//                 ))}
//             </div>
//         </Container>
//     </div>
//   )
}

export default Home