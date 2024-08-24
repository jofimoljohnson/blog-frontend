import { Routes, Route } from "react-router";
import Header from "./components/Header";
import Auth from "./components/Auth";
import Blogs from "./components/Blogs";
import UserBlog from "./components/UserBlog";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authActions } from "./store";

const App = () => {
    const dispatch=useDispatch()
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    console.log(isLoggedIn);
    
    useEffect(() => {
        if(localStorage.getItem("userId")){
dispatch(authActions.login())
        }
   
    }, [dispatch])
    



    return (
        <>
            <header>
                <Header />
            </header>
            <main>
                <Routes>
                    {!isLoggedIn ? (
                        <Route path="/auth" element={<Auth />} />
                    ) : (
                        <>
                            <Route path="/blogs" element={<Blogs />} />
                            <Route path="/myblogs" element={<UserBlog />} />
                            <Route path="/myblogs/:id" element={<BlogDetail />} />
                            <Route path="/blogs/add" element={<AddBlog />} />
                        </>
                    )}
                </Routes>
            </main>
        </>
    );
};

export default App;
