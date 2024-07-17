import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import service from "../appwrite/config";
import { Container, PostCard } from "../components";
import { Query } from "appwrite";

function MyPost() {
  const [mypost, setMyPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    const fetchPosts = async () => {
      if (userData) {
        const userPosts = await service.fetchUserPosts(userData.$id);
        // const userPosts = await service.getPosts([Query.equal('userid',userData.$id)]);
        setLoading(false);
        setMyPost(userPosts);
      }
    };
    fetchPosts();
  }, [userData]);

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
