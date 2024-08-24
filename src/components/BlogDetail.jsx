import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";

const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

const BlogDetail = () => {
    const [blog, setBlog] = useState();
    const id = useParams().id;
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({});

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const fetchDetails = async () => {
        const response = await axios.get(`http://localhost:5000/api/blog/${id}`).catch((err) => console.log(err));
        const data = await response.data;

        return data;
    };

    useEffect(() => {
        fetchDetails().then((data) => {
            setBlog(data.blog);

            setInputs({ title: data.blog.title, description: data.blog.description, image: data.blog.image });
        });
    }, [id]);

    console.log(blog);

    const sendRequest = async () => {
        const response = await axios
            .put(`http://localhost:5000/api/blog/update/${id}`, {
                title: inputs.title,
                description: inputs.description,
            })
            .catch((err) => console.log(err));
        const data = await response.data;
        return data;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest()
            .then((data) => console.log(data))
            .then(() => navigate("/myblogs/"));
    };

    return (
        <div>
            {inputs && (
                <form onSubmit={handleSubmit}>
                    <Box
                        border={3}
                        borderColor="linear-gradient(90deg, rgba(0,29,36,1) 0%, rgba(101,9,121,1) 35%, rgba(0,255,98,1) 100%)"
                        borderRadius={10}
                        boxShadow={"10px 10px 20px #ccc"}
                        padding={3}
                        marginTop={3}
                        margin={"auto"}
                        display={"flex"}
                        flexDirection={"column"}
                        width={"80%"}
                    >
                        <Typography fontWeight={"bold"} padding={3} color={"grey"} variant="h2" textAlign={"center"}>
                            Edit Your Blog
                        </Typography>

                        <InputLabel sx={labelStyles}>Title</InputLabel>

                        <TextField
                            margin="normal"
                            name="title"
                            onChange={handleChange}
                            value={inputs.title}
                            variant="outlined"
                        />

                        <InputLabel sx={labelStyles}>Description</InputLabel>

                        <TextField
                            margin="normal"
                            name="description"
                            onChange={handleChange}
                            value={inputs.description}
                            variant="outlined"
                        />

                        <Button type="submit" sx={{ mt: 2, borderRadius: 4 }} color="warning" variant="contained">
                            Submit
                        </Button>
                    </Box>
                </form>
            )}
        </div>
    );
};

export default BlogDetail;
