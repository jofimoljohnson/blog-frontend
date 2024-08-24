// import axios from "axios";
// import { useState, useEffect } from "react";
// import Blog from "./Blog";

// const Blogs = () => {
//     const [blogs, setBlogs] = useState();

//     const sendRequest = async () => {
//         const response = await axios
//             .get("http://localhost:5000/api/blog")

//             .catch((err) => console.log(err));
//         const data = await response.data;
//         return data;
//     };

//     useEffect(() => {
//         sendRequest().then((data) => setBlogs(data.blogs));
//     }, []);
//     console.log(blogs);

//     return (
//         <div>
//             {blogs &&
//                 blogs.map((blog, index) => (
//                     <Blog
//                         key={index}
//                         id={blog._id}
//                         isUser={localStorage.getItem("userId")===blog.user._id}

//                         title={blog.title}
//                         description={blog.description}
//                         image={blog.image}
//                         userName={blog.user.name}



//                     />
//                 ))}
//         </div>
//     );
// };

// export default Blogs;


import axios from "axios";
import { useState, useEffect } from "react";
import Blog from "./Blog";

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);

    const sendRequest = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/blog");
            return response.data;
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        sendRequest().then((data) => {
            if (data && data.blogs) {
                setBlogs(data.blogs);
            }
        });
    }, []);

    return (
        <div>
            {blogs.length > 0 && blogs.map((blog, index) => (
                <Blog
                    key={index}
                    id={blog._id}
                    isUser={blog.user && localStorage.getItem("userId") === blog.user._id}
                    title={blog.title}
                    description={blog.description}
                    image={blog.image}
                    userName={blog.user ? blog.user.name : "Unknown"}
                />
            ))}
        </div>
    );
};

export default Blogs;


