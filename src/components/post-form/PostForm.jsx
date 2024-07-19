import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Select, RTE } from '../index';
import service from '../../appwrite/config';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors } } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        },
    });

    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData);
    const theme = useSelector(state => state.theme.theme)
    const [loader,setLoader] = useState(false);

    const [error, setError] = useState('');

    // const generateSlug = (title) => {
    //     return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    // };

    const submit = async (data) => {
        setLoader(true)
        if (!userData || !userData.$id) {
            console.error("User data is not available.");
            return;
        }

        // Log the content length
        console.log("Content length:", data.content.length);

        // if (data.content.length > 400) {
        //     console.error("Content length exceeds the maximum allowed length.");
        //     setError('Content length exceeds the maximum allowed length (400 characters for the first time). You can update your content later; after post creation, you can add up to 2000 characters.');
        //     return;
        // }

        try {
            let dbPost;

            if (post) {
                // Handle image upload if a new image is provided
                const file = data.image?.length ? await service.uploadFile(data.image[0]) : null;
                if (file) {
                    await service.deleteFile(post.Image);
                }

                // Update the article
                dbPost = await service.updatePost(post.$id, {
                    ...data,
                    Image: file ? file.$id : post.Image,
                });
                setLoader(false)
            } else {
                if (!data.image || !data.image.length) {
                    setError("Image is required for the first post.");
                    return;
                }
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
            setLoader(false)
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } catch (error) {
            console.error("Error while submitting the post:", error);
            setError(error.message);
            setLoader(false);
        }
    };

    const slugTransform = useCallback((value) => {
        return value
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    }, []);

    useEffect(() => {
        const updateSlug = () => {
            const currentTitle = getValues('title');
            setValue('slug', slugTransform(currentTitle), { shouldValidate: true });
        };
        updateSlug()    
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                updateSlug();
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className='flex relative flex-col md:flex-row flex-wrap'>
            <div className='md:w-2/3 text-text px-2'>
                <Input label="Title: " placeholder="Title" className='mb-4'
                    {...register("title", { required: true })} />

                <Input label="Slug: " placeholder="Slug" className='mb-4 '
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }} />

                <RTE label="Content: " name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className='md:w-1/3 text-text px-2'>
                <Input label="Image: " className='mb-4' type="file" accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })} />
                {post && (
                    <div className='w-full mb-4'>
                        <img src={service.getFilePreview(post.Image)} alt={post.title} className='rounded-lg' />
                    </div>
                )}
                <Select options={["active", "inactive"]} label="Status" className='mb-4' {...register("status", { required: true })} />
                <Button type='submit' bgColor={theme === 'purple' ? 'bg-purple-600' : 'bg-text2'} className='w-full'>
                    {post ? "Update" : "Submit"}
                </Button>
                {error && <p className='text-red-600 font-bold mt-8 text-center'>{error}</p>}
                {errors.image && <p className='text-red-600 font-bold mt-8 text-center'>Image is required for the first post.</p>}
                {errors.title && <p className='text-red-600 font-bold mt-8 text-center'>Title is required.</p>}
                {errors.content && <p className='text-red-600 font-bold mt-8 text-center'>Content is required.</p>}
            </div>
            {loader &&  <div className="flex mt-40 absolute ml-96  z-30 justify-center items-center">
                            <div className="loader "></div>
                        </div>}
        </form>
        
    );
}

export default PostForm;
