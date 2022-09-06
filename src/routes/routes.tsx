import { useContext } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { AuthContext } from "../context/auth-context"
import SignInPage from "../pages/AuthPages/SignInPage"
import SignUpPage from "../pages/AuthPages/SignUpPage"
import HomePage from "../pages/HomePage/HomePage"

const AppRoutes = () => {
    const context = useContext(AuthContext)
    
    return (
        <Routes>
            <Route path='/'>
                <Route index element={<HomePage/>}/>            
                {!context?.value.isSignedIn && <>
                    <Route path='/signin' element={
                        <SignInPage/>
                    }/>
                    <Route path='/signup' element={
                        <SignUpPage/>
                    }/> 
                </>}   
                <Route path='*' element={<Navigate to ='/'/>}/>
            </Route>
        </Routes>
    )
}

export default AppRoutes