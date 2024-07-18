import conf from "../conf/conf";
import { Client, ID, Databases, Storage,Query, Permission, Role } from "appwrite";


export class Service{
    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client)
    }

// isValidDocumentId(documentId) {
    //     const validFormat = /^[a-zA-Z0-9\.\-_]{1,36}$/;
    //     return validFormat.test(documentId) && !/^[\.\-_]/.test(documentId);
    // }

    sanitizeSlug(slug) {
        // Remove any leading special characters
        slug = slug.replace(/^[\.\-_]+/, '');
        
        // Ensure it fits the length requirement
        if (slug.length > 36) {
            slug = slug.substring(0, 36);
        }

        // Replace any invalid characters (optional, based on your requirements)
        // Example: replace spaces with hyphens
        slug = slug.replace(/[^a-zA-Z0-9\.\-_]/g, '-');

        return slug;
    }
    

    async createPost({title, slug, content, Image = [], status, userid}){
        try {

            slug = this.sanitizeSlug(slug);

            // if (!this.isValidDocumentId(slug)) {
            //     throw new Error('Invalid `slug` format: must be 1-36 chars long and contain only a-z, A-Z, 0-9, period, hyphen, and underscore. Cannot start with a special character.');
            // }
            if (typeof content !== 'string' || content.length > 400) {
                throw new Error('Content must be a valid string and no longer than 400 chars');
            }

            return await this.databases.createDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,{
                    title,
                    content,
                    Image,
                    status,
                    userid,
                }
            );
        } catch (error) {
            console.log("Apppwrite servivce :: createPost :: error",error);
        }
    }

    async updatePost(slug,{title, content, Image, status}){
        try {
           return await this.databases.updateDocument(
            conf.appWriteDatabaseId,
            conf.appWriteCollectionId,
            slug,
            {
                title,
                content,
                Image,
                status,
            }
           )
        } catch (error) {
            console.log("Apppwrite servivce :: updatePost :: error",error);
        }
    }
    async deletePost(postId) {
        try {
            const response = await this.databases.deleteDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                postId
            );
            console.log("Delete Post Response:", response); // Debug log
            return response;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
        }
    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Apppwrite servivce :: getPost :: error",error);
            return false;
        }
    }
    async getPosts(){
        try {
            return await this.databases.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                [Query.equal("status", "active")],
            );
        } catch (error) {
            console.log("Apppwrite service :: getPosts :: error",error);
            return false;
        }
    }

    async fetchUserPosts(userId) {
        try {
            const response = await this.databases.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                [Query.equal('userid', userId)]
            );
            return response.documents;
        } catch (error) {
            console.error("Error fetching user posts:", error);
            return [];
        }
    }

    // File upload service

    async uploadFile(file,userid){
        try {
            return await this.bucket.createFile(
                conf.appWriteBucketId,
                ID.unique(),
                file
                // [
                //     Permission.read(Role.any()), // Public read access
                //     Permission.delete(Role.user(userid)) // Allow the uploader to delete the file
                // ]
            );
            
        } catch (error) {
            console.log("Apppwrite servivce :: uploadFile :: error",error);
            return false;
        }
    }
    async deleteFile(fileId) {
        try {
            const response = await this.bucket.deleteFile(conf.appWriteBucketId, fileId);
            console.log("File Deleted Response:", response);
            return response;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
        }
    }
    // getFilePreview(fileId){
    //     this.bucket.getFile(conf.appWriteBucketId,fileId);
    // }
    getFilePreview(fileId) {
        return `${this.client.config.endpoint}/storage/buckets/${conf.appWriteBucketId}/files/${fileId}/view?project=${conf.appWriteProjectId}`;
    }
}

const service = new Service();

export default service;