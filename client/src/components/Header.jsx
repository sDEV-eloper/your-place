

import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { Link, useNavigate } from 'react-router-dom';
import { signOutSuccess } from '../assets/redux/userSlice/userSlice';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.20),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.20),
  },
  marginLeft: 10,
  marginRight:'10%',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const pages = ['Home', 'About'];
const userSettings = ['Username', 'Profile', 'Your Lists', 'Create List', 'Signout'];
const noUserSettings = ['Profile',  'Signin/Signup'];


function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [searchTerm, setSearchTerm]=React.useState()

  const handleSubmit=(e)=>{
  e.preventDefault();
const urlParams=new URLSearchParams(window.location.search)
urlParams.set('searchTerm', searchTerm)
const searchQuery=urlParams.toString()
navigate(`/search?${searchQuery}`)
}
  React.useEffect(()=>{
    const urlParams=new URLSearchParams(location.search)
const searchTermFromUrl=urlParams.get('searchTerm')
if(searchTermFromUrl){
  setSearchTerm(searchTermFromUrl)
}
  },[location.search])

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
   
  };

  const {currentUser}=useSelector((state)=>state.user)
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const handleSignOut=()=>{
    dispatch(signOutSuccess(""))
    navigate("/")
  }
  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              border:1,
              paddingLeft:1,
              paddingRight:1,
              color: 'inherit',
              textDecoration: 'none',
              borderRadius:'5px',
              backgroundColor:'#232D3F',
            }}
          >
         <MapsHomeWorkIcon   sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, justifyItems:'center', alignItems:'center' }} />

            YourPlace
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link to={page==='Home'? '/':`/${page}`.toLowerCase()}>
                  <Typography  textAlign="center">{page}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
          
          <Typography href='/ \b'>
          <MapsHomeWorkIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}  />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' },  justifyContent: 'center' }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                href={page==='Home'? '/':`/${page}`.toLowerCase()} 
              >
                {page}
              </Button>
            ))}
          </Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <form onSubmit={handleSubmit}>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchTerm} 
              onChange={(e)=>setSearchTerm(e.target.value)}
            />
            </form>
          </Search>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={currentUser?.username} src={currentUser?.avatar} sx={{ border: '2px solid white' }} />
              </IconButton>
            </Tooltip>
           
            <Menu
              sx={{ mt: '40px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {currentUser ?
              userSettings?.map((setting) => (
                <MenuItem key={setting} onClick={setting==="Signout"?handleSignOut:null}>
                  <Link to={setting==='Profile'? '/profile':(setting==='Your Lists'? `/view-list/${currentUser._id}`:(setting==='Create List'? `/create-list`:null))}>
                  <Typography  textAlign="center"  sx={setting === "Username" ? { color: 'gray', } :(setting === "Signout" ?{ color: 'white', p:1, borderRadius:'5px', backgroundColor:'red' } : '')} >
                    {
                    setting==='Username'?currentUser?.username: setting
                    }
                    </Typography>
                  </Link>
                </MenuItem>
              ))
              :
              noUserSettings.map((setting) => (
                <MenuItem key={setting} >
                  <Link to='/sign-in'>
                  <Typography  textAlign="center"  sx={(setting === "Signin/Signup" ?{ color: 'white', p:1, borderRadius:'5px', backgroundColor:'#0174BE' } : '')} >
                    {
                    setting
                    }
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;