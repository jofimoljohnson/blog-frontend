import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router";


const Auth = () => {
    const navigate=useNavigate()
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [isSignUp, setIsSignUp] = useState(false);

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const sendRequest = async (type = "login") => {
        const res = await axios
            .post(`http://localhost:5000/api/user/${type}`, {
                name: inputs.name,
                email: inputs.email,
                password: inputs.password,
            })
            .catch((err) => console.log(err));

        const data = await res.data;
        console.log(data)
        return data;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        if (isSignUp) {
            sendRequest("signUp").
            then((data)=>localStorage.setItem("userId",data.user._id)).
            
            then(()=>dispatch(authActions.login())).
            then(()=>navigate("/blogs")).
            then((data) => console.log(data));
        } else {
            sendRequest().
            then((data)=>localStorage.setItem("userId",data.user._id)).
            then(()=>dispatch(authActions.login())).
            then(()=>navigate("/blogs")).
            then((data) => console.log(data));
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    boxShadow={"10px 10px 20px #ccc"}
                    padding={3}
                    margin={"auto"}
                    marginTop={5}
                    borderRadius={5}
                    maxWidth={400}
                >
                    <Typography variant="h2" padding={3} textAlign={"center"}>
                        {isSignUp ? "SignUp" : "Login"}
                    </Typography>

                    {isSignUp && (
                        <TextField
                            placeholder="Name"
                            margin="normal"
                            value={inputs.name}
                            name="name"
                            onChange={handleChange}
                        />
                    )}

                    <TextField
                        type="email"
                        placeholder="Email"
                        margin="normal"
                        value={inputs.email}
                        name="email"
                        onChange={handleChange}
                    />

                    <TextField
                        type="password"
                        placeholder="Password"
                        margin="normal"
                        name="password"
                        value={inputs.password}
                        onChange={handleChange}
                    />

                    <Button type="submit" variant="contained" sx={{ borderRadius: 3, marginTop: 3 }} color="warning">
                        Submit
                    </Button>

                    <Button onClick={() => setIsSignUp(!isSignUp)} sx={{ borderRadius: 3, marginTop: "3" }}>
                        Change to {isSignUp ? "Login" : "SignUp"}
                    </Button>
                </Box>
            </form>
        </div>
    );
};

export default Auth;
