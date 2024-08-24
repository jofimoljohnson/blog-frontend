import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";


const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

const AddBlog = () => {
    const [inputs, setInputs] = useState({
        title: "",
        description: "",
        image: "",
    });
    const navigate=useNavigate()

    const handleChange=(e)=>{
      setInputs((prevState)=>({
        ...prevState,
        [e.target.name]:e.target.value
      }))

    }


    const sendRequest = async()=>{
        const response = await axios.post("http://localhost:5000/api/blog/add",{
            title:inputs.title,
            description:inputs.description,
            image:inputs.image,
            user:localStorage.getItem("userId")
        })
        .catch((err)=>console.log(err))
        const data = await response.data 
        return data
    }
   





    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log(inputs)
        sendRequest().then((data)=>console.log(data))
        .then(()=>navigate("/blogs"))
    }



    return (
        <div>
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
                    <Typography 
                    fontWeight={"bold"}
                     padding={3} 
                     color={"grey"} 
                     variant="h2" 
                     textAlign={"center"}
                     >
                        Post Your Blog
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

                    <InputLabel sx={labelStyles}>ImageURL</InputLabel>

                    <TextField 
                    margin="normal" 
                    name="image"
                     onChange={handleChange}
                    value={inputs.image}
                     variant="outlined" 
                     />

                     <Button type="submit"
                      sx={{mt:2,borderRadius:4}}
                      color="warning" 
                     variant="contained">
                        Submit
                        </Button>

                </Box>
            </form>
        </div>
    );
};

export default AddBlog;
