import React, { useEffect, useState } from 'react'
import service from '../appwrite/config'
import { PostCard, Container } from '../components'



const AllPost = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      service.getPosts([])
        .then((response) => {
          if (response) {
            setPosts(response.documents);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error('Error fetching posts:', error);
          setLoading(false);
        });
    }, []);
  
    return (
      <div className='py-8 animate-slideIn w-full'>
  <Container>
    <h2 className="text-3xl underline font-bold text-text mb-4">All Posts</h2>
    {loading ? (
      <div className="flex mt-40 justify-center items-center">
        <div className="loader"></div>
      </div>
    ) : (
      <>
        {posts.length > 0 ? (
          <div className='grid grid-cols-1 px-8 md:p-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {posts.map((post) => (
              <div key={post.$id} className='p-2'>
                <PostCard {...post} />
              </div>
            ))}
          </div>
        ) : (
          <h1 className=" text-4xl md:text-4xl md:mx-40 mb-11 font-bold p-8 text-gray-700 >No Posts Found"></h1>
        )}
      </>
    )}
  </Container>
</div>

    );
  };

export default AllPost