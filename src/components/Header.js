import {Routes,Route, useNavigate,NavLink} from 'react-router-dom';
import Home from './Home'
import SignUp from './SignUp'
import Login from './Login'
import ContactUs from './ContactUs'
import UserDashboard from './UserDashboard';
import UserProfile from './userProfile'
import { Navigate } from 'react-router-dom';
import Count from './Count'
import Add from './Add'
import Todos from './Todos'
import Change from './Change'
import {clearLoginStatus} from '../slices/userSlice'
import { NavDropdown,Container,Nav,Navbar } from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
function Header()
{
  let {userObj,isError,isSuccess,isLoading,errMsg}=useSelector(state=>state.user)
  let navigate=useNavigate()
  let dispatch=useDispatch()
  const userLogout=()=>{
    localStorage.clear()
    dispatch(clearLoginStatus())
    navigate('/login')
  }
  const userChange=()=>{
    navigate('/change')
  }
    return (
<div>
<Navbar expand="sm" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">To-Do</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          {isSuccess!==true?(
          <>
            <Nav.Link eventKey='1' as={NavLink} to='/'>Home</Nav.Link>
            <Nav.Link eventKey='2' as={NavLink} to='/login'>Login</Nav.Link>
            <Nav.Link eventKey='3' as={NavLink} to='/signup'>SignUp</Nav.Link>
            <Nav.Link eventKey='4' as={NavLink} to='/contactus'>ContactUs</Nav.Link>
          </>
          ):(<>
          <NavDropdown title={userObj.username} id="collapsible-nav-dropdown" >
                <NavDropdown.Item onClick={userChange}>
                  Change Password
                </NavDropdown.Item>
                <NavDropdown.Divider/>
                <NavDropdown.Item onClick={userLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
          </>
)}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      <Routes>
        <Route path='' element={<Home />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='login' element={<Login />} />
        <Route path='contactus' element={<ContactUs />} />
        <Route path='change' element={<Change/>}/>
        <Route path='userdashboard' element={<UserDashboard />} >
          <Route path='profile' element={<UserProfile/>}/>
          <Route path='todos' element={<Todos/>}/>
          <Route path='count' element={<Count/>}/>
          <Route path='add' element={<Add/>}/>
          <Route path='' element={<Navigate to='profile' replace={true}/>}/>
        </Route>
      </Routes>
      </div>
    )
}

export default Header;