import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import Header from './components/Header'
import { Toaster } from 'react-hot-toast';
import PrivateRoute from './pages/PrivateRoute'
import CreateList from './pages/CreateList'
import ViewList from './pages/ViewList'
import UpdateList from './pages/UpdateList'
import Listing from './pages/Listing'
import Search from './pages/Search'
import SignUp from './pages/SignUp'
import Footer from './components/Footer'



export default function App() {
  
  return (
    <BrowserRouter>
    <Toaster/>
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/listings/:id" element={<Listing/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route element={<PrivateRoute/>}> 
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/create-list" element={<CreateList/>}/>
        <Route path="/view-list/:id" element={<ViewList/>}/>
        <Route path="/update-list/:id" element={<UpdateList/>}/>
        </Route>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}