import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {Button,Input,Select,RTE} from '../index'
import service from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm({post}) {

    const {register,handleSubmit,watch,setValue,control,getValues} = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        },
    });

    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData);

    // const submit = async (data) => {
    //     if (post) {
    //         const file = data.image[0] ? await service.uploadFile(data.image[0]) : null
    //         if (file) {
    //            await service.deleteFile(post.Image)
    //         }
    //         const dbPost = await service.updatePost(post.$id, {
    //             ...data,
    //             Image: file ? file.$id : post.Image
    //         })
    //         if (dbPost) {
    //             navigate(`/post/${dbPost.$id}`)
    //         }
    //     } else {
    //         const file = await service.uploadFile(data.image[0]);
    //         if (file) {
    //             const fileId = file.$id;
    //             data.Image = fileId
    //             const dbPost = await service.createPost({
    //                 ...data,
    //                 userid: userData.$id,
    //             });
    //             if (dbPost) {
    //                 navigate(`/post/${dbPost.$id}`)
    //             }
    //         }
    //     }
    // }
    const submit = async (data) => {
        if (!userData || !userData.$id) {
            console.error("User data is not available.");
            return;
        }
    
        // Log the content length
        console.log("Content length:", data.content.length);
    
        if (data.content.length > 2000) {
            console.error("Content length exceeds the maximum allowed length.");
            return;
        }
    
        try {
            let dbPost;
    
            if (post) {
                // Handle image upload if a new image is provided
                const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;
                if (file) {
                    await service.deleteFile(post.Image);
                }
    
                // Update the article
                dbPost = await service.updatePost(post.$id, {
                    ...data,
                    Image: file ? file.$id : post.Image,
                });
            } else {
                // Handle new article creation
                const file = await service.uploadFile(data.image[0]);
                if (file) {
                    const fileId = file.$id;
                    data.Image = fileId;
    
                    dbPost = await service.createPost({
                        ...data,
                        userid: userData.$id,
                    });
                }
            }
    
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } catch (error) {
            console.error("Error while submitting the post:", error);
        }
    };
    

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') 
            return value
                .trim()
                .toLowerCase()
                .replace(/^[a-zA-Z\d\s]+/g, '-')
                .replace(/\s/g,'-')

            return '';
    },[]);

    useEffect(() => {
        const subscription = watch((value,{name}) => {
            if (name ==='title') {
                setValue('slug', slugTransform(value.title, {shouldValidate: true}));
            }
        });

        return () => {
            subscription.unsubscribe()
        }
    },[watch,slugTransform,setValue])

  return (
    <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
            <div className='w-2/3 px-2'>
                <Input label = "Title: " placeholder="Title" className='mb-4'
                 {...register("title",{ required: true})} />
                 
                <Input label = "Slug: " placeholder="Slug" className='mb-4'
                 {...register("slug",{ required: true})}
                 onInput={(e) => {
                    setValue("slug",slugTransform(e.currentTarget.value),{shouldValidate: true})
                 }} />

                 <RTE label="Content: " name="content" control={control} defaultValue={getValues("content")} />

            </div>
            <div className='w-1/3 px-2'>
                <Input label = "Image: " className='mb-4' type="file" accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image",{required: !post})}
                />
                {post && (
                    <div className='w-full mb-4'>
                        <img src={service.getFilePreview(post.Image)} 
                        alt={post.title} className='rounded-lg' />
                    </div>
                )}
                <Select options={["active","inactive"]}
                label ="Status" className='mb-4' {...register("status",{required: true})} />
                <Button type='submit' bgColor={post ? "bg-green-500" : "bg-purple-600"}
                className='w-full'>
                    {post ? "Update" : "Submit"} 
                </Button>
            </div>

            </form>
  )
}

export default PostForm