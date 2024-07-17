import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import service from "../appwrite/config";
import { Container, PostCard } from "../components";


function MyPost() {
  const [mypost, setMyPost] = useState([]);
  const [loading, setLoading] = useState(true);
//   const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    const fetchPosts = async () => {
        try {
            const response = await service.fetchUserPosts([]);
            if (response && response.documents) {
                setMyPost(response.documents);
            } else {
                setMyPost([]); // Ensure posts are set to an empty array if no data is returned
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
            setPosts([]); // Ensure posts are set to an empty array on error
        } finally {
            setLoading(false); // Set loading to false regardless of success or failure
        }
    };

    fetchPosts();
}, []);

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
              <div className="flex flex-wrap">
                {mypost.map((post) => (
                  <div key={post.$id} className="p-2 w-1/4">
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
