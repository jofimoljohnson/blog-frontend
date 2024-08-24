import { AppBar, Box, Button, Toolbar, Typography, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authActions } from "../store";

const Header = () => {
    const dispatch=useDispatch()
    const [value, setValue] = useState();
    const isLoggedIn=useSelector(state=>state.isLoggedIn)
    return (
        <AppBar
            position="sticky"
            sx={{ background: "linear-gradient(90deg, rgba(0,29,36,1) 0%, rgba(101,9,121,1) 35%, rgba(0,255,98,1) 100%)" }}
        >
            <Toolbar>
                <Typography variant="h4">BlogsApp</Typography>


              { isLoggedIn &&  <Box display="flex" marginLeft="auto" marginRight="auto">
                    <Tabs textColor="inherit" value={value} onChange={(e, val) => setValue(val)}>
                        <Tab LinkComponent={Link} to="/blogs" label="All blogs" />
                        <Tab LinkComponent={Link} to="/myblogs" label="My blogs" />
                        <Tab LinkComponent={Link} to="/blogs/add" label="Add Blog" />


                        <Tab />
                    </Tabs>
                </Box>}



                <Box display="flex" marginLeft="auto">
                   { !isLoggedIn && <>
                    <Button 
                    LinkComponent={Link}
                    to="/auth"
                    variant="contained" sx={{ margin: 1, borderRadius: 10 }} 
                    color="warning">
                        Login
                    </Button>

                    <Button 
                    LinkComponent={Link}
                    to="/auth"
                    variant="contained" 
                    sx={{ margin: 1, borderRadius: 10 }} color="warning">
                        SignUp
                    </Button>
                   
                   </> }
                   


                  {
                  isLoggedIn &&   
                  <Button 
                  onClick={()=>dispatch(authActions.logout())}
                    LinkComponent={Link}
                    to="/auth"
                    variant="contained" 
                    sx={{ margin: 1, borderRadius: 10 }} color="warning">
                        Logout
                    </Button>
                    }
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
