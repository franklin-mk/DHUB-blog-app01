import React, { useState, useEffect } from "react";
import chatbot from "../img/chatbot.png"
import commentBtn from "../img/comment button.png"
import deleteBtn from "../img/delete button.png"
import likeBtn from "../img/like button.png"
import shareBtn from "../img/share button.png"


export default function Main({ searchQuery }) {
    const [blogArray, setBlogArray] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [showCommentsIndex, setShowCommentsIndex] = useState(null);

    useEffect(() => {
        const storedBlogs = JSON.parse(localStorage.getItem("blogArray")) || [];
        setBlogArray(storedBlogs);
    }, []);

    function createBlog(e) {
        e.preventDefault();
        const writeInput = document.getElementById("write");
        const blogTitle = document.getElementById("blogTitle").value.trim();
        const blogContent = writeInput.value.trim();
        if (blogContent === "") {
            alert("Blog content cannot be empty!");
            return;
        }

        const newBlog = { 
            title: blogTitle, 
            content: blogContent, 
            likes: 0, 
            image: selectedImage ? URL.createObjectURL(selectedImage) : null,
            comments: []
        };

        const newBlogArray = [newBlog, ...blogArray];
        setBlogArray(newBlogArray);
        localStorage.setItem("blogArray", JSON.stringify(newBlogArray));
        writeInput.value = "";
        document.getElementById("blogTitle").value = "";
        setSelectedImage(null);
        setImagePreview(null); 
    }

    function addLike(index) {
        const updatedBlogs = [...blogArray];
        updatedBlogs[index].likes += 1;
        setBlogArray(updatedBlogs);
        localStorage.setItem("blogArray", JSON.stringify(updatedBlogs));
    }

    function handleImageUpload(e) {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    }

    function triggerImageUpload() {
        document.getElementById("imageUpload").click();
    }

    function addComment(index, comment) {
        const updatedBlogs = [...blogArray];
        updatedBlogs[index].comments.unshift(comment);
        setBlogArray(updatedBlogs);
        localStorage.setItem("blogArray", JSON.stringify(updatedBlogs));
    }

    function deleteBlog(index) {
        const updatedBlogs = blogArray.filter((_, i) => i !== index);
        setBlogArray(updatedBlogs);
        localStorage.setItem("blogArray", JSON.stringify(updatedBlogs));
    }

    function shareBlog(blogContent) {
        if (navigator.share) {
            navigator.share({
                title: 'Check out this blog post!',
                text: blogContent,
                url: window.location.href
            })
            .then(() => console.log('Blog post shared successfully'))
            .catch((error) => console.error('Error sharing blog post:', error));
        } else {
            alert('Web Share API is not supported in your browser.');
        }
    }

    function toggleComments(index) {
        setShowCommentsIndex(index === showCommentsIndex ? null : index);
    }

    function handleCommentSubmit(e, index) {
        e.preventDefault();
        const commentInput = e.target.elements.comment;
        const comment = commentInput.value.trim();
        if (comment !== "") {
            addComment(index, comment);
            commentInput.value = "";
        }
    }

    const filteredBlogs = blogArray.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; 

    let blogAuthor = "username"
    let blogDate = `${currentMonth}, ${currentYear}`

    function updateBlog() {
        return filteredBlogs.map((blog, index) => (
            <div key={index} className="blog-item">
                <h2>{blog.title}</h2>
                <p>{blog.content}</p>
                {blog.image && <img id="imageSection" src={blog.image} alt="Blog"/>}
                <br />
                <br />
                <h5>@{blogAuthor}</h5>
                <h5>Posted:{blogDate}</h5>
                <div className="interaction-buttons">
                    <div className="left-buttons">
                        <img
                            onClick={() => addLike(index)}
                            src={likeBtn}
                            width={30}
                            alt="Like icon"
                            className="like-icon"
                        />
                        <p id="likes" className="likes-count">{blog.likes}</p>
                        <img
                            onClick={() => toggleComments(index)}
                            src={commentBtn}
                            width={30}
                            alt="Comment icon"
                            className="comment-icon"
                        />
                        <img
                            onClick={() => shareBlog(blog.content)}
                            src={shareBtn}
                            width={30}
                            alt="Share icon"
                            className="share-icon"
                        />
                    </div>
                    <img
                        onClick={() => deleteBlog(index)}
                        src={deleteBtn}
                        width={20}
                        height={20}
                        alt="Delete icon"
                        className="delete-icon"
                    />
                </div>
                {showCommentsIndex === index && (
                    <div className="comments-section">
                        <h5>Comments</h5>
                        {blog.comments.length > 0 ? (
                            blog.comments.map((comment, i) => (
                                <p key={i}>{comment}</p>
                            ))
                        ) : (
                            <p>No comments yet.</p>
                        )}
                        <form onSubmit={(e) => handleCommentSubmit(e, index)}>
                            <input
                                type="text"
                                name="comment"
                                placeholder="Add a comment"
                            />
                            <button type="submit">Post Comment</button>
                        </form>
                    </div>
                )}
            </div>
        ));
    }

    return (
        <main>
            <div className="home-content">
                <h3 id="home-header">Home</h3>
                <form className="create-blog" action="Post">
                    <label htmlFor="blogTitle">Title</label>
                    <input
                        type="text"
                        name="blogTitle"
                        id="blogTitle"
                        placeholder="Title"
                    />
                    <label htmlFor="write">Create your blog</label>
                    <input
                        type="text"
                        name="write"
                        id="write"
                        placeholder="What's on your mind?"
                    />
                    <button 
                        type="button" 
                        onClick={triggerImageUpload}
                        className="addImages">
                            Add image
                    </button>
                    <div className="image-upload" style={{ display: 'none' }}>
                        <input
                            type="file"
                            name="imageUpload"
                            id="imageUpload"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                    </div>
                    {imagePreview && (
                        <div className="image-preview">
                            <img id="imagePreview" src={imagePreview} alt="Selected image preview" />
                        </div>
                    )}
                    <button onClick={createBlog} id="post-btn" type="submit">Post</button>
                </form>
                <section id="showItems">
                    <h2 id="home-header">My Blogs</h2>
                    <div className="blog-container">
                        {updateBlog()}
                    </div>
                </section>
            </div>
            <div className="blog-content">
                <h3 id="blog-header">New Blog Posts</h3>
                {/* Other users blog should be displayed here 
                    <section id="showItems">
                        <div className="blog-container">
                            {updateBlog()}
                        </div>
                    </section>
                */}
                
            </div>
            <div>
                <img 
                    className="chatbot" 
                    src={chatbot}
                    alt="chatbot" />
            </div>
        </main>
    );
}
