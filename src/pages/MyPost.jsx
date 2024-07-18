import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import service from "../appwrite/config";
import { Container, PostCard } from "../components";


function MyPost() {
  const [mypost, setMyPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.auth.userData?.$id);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!userId) {
        console.log('User ID not available');
        setLoading(false);
        return;
      }

      try {
        console.log('Fetching user posts...');
        const posts = await service.fetchUserPosts(userId);
        console.log('Response received:', posts);
        if (posts.length > 0) {
          console.log('Documents found:', posts);
          setMyPost(posts);
        } else {
          console.log('No documents found');
          setMyPost([]); // Ensure posts are set to an empty array if no data is returned
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setMyPost([]); // Ensure posts are set to an empty array on error
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchPosts();
  }, [userId]);

  return (
    <div className="py-8 w-full">
      <Container>
        <h2 className="text-3xl underline font-bold text-text mb-4">
          My Posts
        </h2>
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="loader"></div>
          </div>
        ) : (
          <>
            {mypost.length > 0 ? (
              <div className="grid grid-cols-1 px-8 md:p-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {mypost.map((post) => (
                  <div key={post.$id} className="p-2">
                    <PostCard {...post} />
                  </div>
                ))}
              </div>
            ) : (
              <h1 className=" text-4xl md:text-4xl md:mx-40 mb-11 font-bold p-8 text-gray-700"> 
                You have not posted yet.
              </h1>
            )}
          </>
        )}
      </Container>
    </div>
  );
}

export default MyPost;
