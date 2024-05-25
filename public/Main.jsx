import React, { useState, useEffect } from "react";

export default function Main() {
    const [blogArray, setBlogArray] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showCommentsIndex, setShowCommentsIndex] = useState(null);

    useEffect(() => {
        // Load blogs from localStorage on component mount
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
        setSelectedImage(null); // Reset the selected image
    }

    function addLike(index) {
        const updatedBlogs = [...blogArray];
        updatedBlogs[index].likes += 1;
        setBlogArray(updatedBlogs);
        localStorage.setItem("blogArray", JSON.stringify(updatedBlogs));
    }

    function handleImageUpload(e) {
        setSelectedImage(e.target.files[0]);
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
                url: window.location.href // Share the current page URL
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

    function updateBlog() {
        return blogArray.map((blog, index) => (
            <div key={index} className="blog-item">
                <h4>{blog.title}</h4>
                <p>{blog.content}</p>
                {blog.image && <img id="imageSection" src={blog.image} alt="Blog"/>}
                <br />
                <br />
                <div className="interaction-buttons">
                    <div className="left-buttons">
                        <img
                            onClick={() => addLike(index)}
                            src="img/like button.png"
                            width={30}
                            alt="Like icon"
                            className="like-icon"
                        />
                        <p id="likes" className="likes-count">{blog.likes}</p>
                        <img
                            onClick={() => toggleComments(index)}
                            src="img/comment button.png"
                            width={30}
                            alt="Comment icon"
                            className="comment-icon"
                        />
                        <img
                            onClick={() => shareBlog(blog.content)}
                            src="img/share button.png"
                            width={30}
                            alt="Share icon"
                            className="share-icon"
                        />
                    </div>
                    <img
                        onClick={() => deleteBlog(index)}
                        src="img/delete button.png"
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
                    <label htmlFor="write">Create blog!</label>
                    <input
                        type="text"
                        name="write"
                        id="write"
                        placeholder="What's on your mind?"
                    />
                    <button type="button" onClick={triggerImageUpload} className="addImages">Add images</button>
                    <div className="image-upload" style={{ display: 'none' }}>
                        <input
                            type="file"
                            name="imageUpload"
                            id="imageUpload"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                    </div>
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
                <h3 id="blog-header">Blogs</h3>
                {/* You can display the blogs here as well, if needed */}
            </div>
            <div>
                <img className="chatbot" src="img/chatbot.png" alt="chatbot" />
            </div>
        </main>
    );
}
