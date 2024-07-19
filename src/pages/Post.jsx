import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import service from '../appwrite/config'
import { Button, Container } from '../components'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'

function Post() {
    
    const [post,setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    
    const [Boolean,setBoolean] = useState(false)

    const userData = useSelector((state) => state.auth.userData);
    
    const isAuth = post && userData ? post.userid === userData.$id : false;
    
    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) {
                    console.log(post);
                    setPost(post);
                } else {
                    navigate('/');
                }
            });
        } else {
            navigate('/');
        }
    },[slug, navigate]);

    const deletePost = () => {
        service.deletePost(post.$id).then((status) => {
            if (status) {
                service.deleteFile(post.Image);
                navigate('/')
                setBoolean(false)
            }
        })
    }
 
  return post ? (
    <>
    <div className={`py-8 ${Boolean ? 'blur' : ''}`}>
        <Container>
            <div className='w-200 h-96 flex justify-center mb-4 relative border box-border rounded-xl p-2'>
                 <img src={service.getFilePreview(post.Image)} alt={post.title}
                 className='rounded-xl' />

                 {isAuth && (
                    <div className='absolute right-12 top-6'>
                        <Link to={`edit-post/${post.$id}`}>
                            <Button bgColor='bg-primary' className='mr-3'>Edit</Button>
                        </Link>
                            <Button bgColor='bg-red-500' onClick={() => setBoolean(true)}>Delete</Button>
                    </div>
                 )}
            </div>
            <div className='w-full mb-6'>
                <h1 className='text-2xl text-text font-bold'>{post.title}</h1>
            </div>
            <div className='bg-accent p-8 rounded-2xl'>
                {parse(post.content)}
            </div>
        </Container>
    </div>
        <div className={`${Boolean ? 'visible':'invisible'}`}>
        <div className='flex absolute top-12 py-20 right-5 my-20 duration-200 items-center justify-center w-full'>
        <div className={`mx-auto w-full max-w-lg bg-background rounded-xl 
                    p-10 border border-black/10`}>
            
            <h2 className='text-center pb-10 text-text  text-2xl font-bold leading-tight'>
                Are you sure to delete this Post?
            </h2>
                <div className=' flex pt-6 flex-col justify-between space-y-5'>
                    <Button onClick={deletePost} className='w-full bg-red-600' > Yes</Button>
                    <Button onClick={() => setBoolean(false)} className='w-full bg-green-600' > No</Button> 
                </div>
        </div>
    </div>
        </div>
    </>
  ) : (<>
    <div className="flex mt-40 justify-center items-center">
        <div className="loader"></div>
    </div>
</>);
}

export default Post