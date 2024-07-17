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
      <div className='py-8 w-full'>
        <Container>
          <h2 className="text-3xl underline font-bold text-text mb-4">All Posts</h2>
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="loader"></div>
            </div>
          ) : (
            <>
              {posts.length > 0 ? (
                <div className='flex flex-wrap'>
                  {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                      <PostCard {...post} />
                    </div>
                  ))}
                </div>
              ) : (
                <h1>No Posts Found</h1>
              )}
            </>
          )}
        </Container>
      </div>
    );
  };

export default AllPost