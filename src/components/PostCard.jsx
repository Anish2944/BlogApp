import React from 'react'
import service from '../appwrite/config'
import { Link } from 'react-router-dom'

const PostCard = ({ $id, title, Image }) => {
  const imageUrl = Image ? service.getFilePreview(Image) : null;

  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-background rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
          {imageUrl ? (
            <img src={imageUrl} alt={title} className='rounded-xl' />
          ) : (
            <div className='h-32 bg-gray-200 rounded-xl mb-4 flex items-center justify-center'>
              <span className='text-gray-500'>Image not available</span>
            </div>
          )}
        </div>
        <h2 className='text-xl text-text2 font-bold'>{title}</h2>
      </div>
    </Link>
  );
};

export default PostCard