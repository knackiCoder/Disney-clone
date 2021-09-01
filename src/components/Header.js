import { useEffect } from 'react';
import styled from 'styled-components/macro';
import { auth, provider } from '../firebase';
//Dispatch will allow us to dispatch info to our store
//selector will allow us to retrieve info from our stuff
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectUserName, selectUserPhoto, setSignOutState, setUserLoginDetails } from '../features/user/userSlice';


export const Header = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const userName = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if(user) {
                setUser(user)
                history.push('/home')
            }
        })
    }, [userName, history])
    const handleAuth = () => {
        if (!userName) {
            auth.signInWithPopup(provider).then(result => {
                setUser(result.user)
            }).catch(err => {
                console.log(err)
            });
        } else if (userName) {
            auth.signOut().then(() => {
                dispatch(setSignOutState())
                history.push('/')
            }).catch((err) => alert(err.message))
        }
    }
    
    const setUser = (user) => {
        dispatch(setUserLoginDetails({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
        })
        );
    };
    return (
        <Nav>
            <Logo>
                <img src="/images/logo.svg" alt="disney+" />
            </Logo>

            {
                !userName ? <Login onClick={handleAuth}>Login</Login>
                    :
                    <>
                        <NavMenu>
                            <a href="/home">
                                <img src="/images/home-icon.svg" alt="home-icon" />
                                <span>HOME</span>
                            </a>
                            <a href="/home">
                                <img src="/images/search-icon.svg" alt="search-icon" />
                                <span>SEARCH</span>
                            </a>
                            <a href="/home">
                                <img src="/images/watchlist-icon.svg" alt="watchlist-icon" />
                                <span>WATCHLIST</span>
                            </a>
                            <a href="/home">
                                <img src="/images/original-icon.svg" alt="original-icon" />
                                <span>ORIGINALS</span>
                            </a>
                            <a href="/home">
                                <img src="/images/movie-icon.svg" alt="movie-icon" />
                                <span>MOVIES</span>
                            </a>
                            <a href="/home">
                                <img src="/images/series-icon.svg" alt="series-icon" />
                                <span>SERIES</span>
                            </a>
                        </NavMenu>
                        <SignOut>
                            <UserImg src={userPhoto} alt={userName} />
                            <DropDown>
                                <span onClick={handleAuth}>Sign Out</span>
                            </DropDown>
                        </SignOut>
                    </>
            }
        </Nav>
    )
}

const Nav = styled.nav`
position: fixed;
top: 0;
right: 0;
left: 0;
height: 70px;
background-color: #090b13;
display: flex;
justify-content: space-between;
align-items: center;
padding: 0 036px;
letter-spacing: 16px;
z-index: 3;
`

const Logo = styled.a`
padding: 0;
width: 80px;
margin-top: 4px;
max-height: 70px;
font-size: 0;
display: inline-block;

img {
    display: block;
    width: 100%;
}
`
const NavMenu = styled.div`
align-items: center;
display: flex;
flex-flow: row nowrap;
height: 100%;
justify-content: flex-end;
margin: 0px;
padding: 0px;
position: relative;
margin-right: auto;
margin-left: 25px;

a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    font-weight: bold;

    img {
        height: 20px;
        min-width: 20px;
        width: 20px;
        z-index: auto;
    }
    
    span {
        color: rgb(249, 249, 249);
        font-size: 13px;
        letter-spacing: 1.42px;
        line-height: 1.08;
        padding: 2px 0px;
        white-space: nowrap;
        position: relative;
        
        &:before {
            background-color: rgb(249, 249, 249);
            border-radius: 0px 0px 4px 4px;
            bottom: -6px;
            content: "";
            height: 2px;
            left: 0px;
            opacity: 0;
            position: absolute;
            right: 0px;
            transform-origin: left center;
            transform: scaleX(0);
            transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
            visibility: hidden;
            width: auto;
            }
    }
    
    &:hover {
        span:before {
            transform: scaleX(1);
            visibility: visible;
            opacity: 1 !important;
            }
        }
}
`;

const Login = styled.a`
background-color: rgb(0, 0, 0, 0.6);
padding: 8px 16px;
text-transform: uppercase;
letter-spacing: 1.5px;
border: 1px solid #f9f9f9;
border-radius: 4px;
transition: all 0.2s ease 0s;
font-weight: bold;
cursor: context-menu;

&:hover {
    background-color: #f9f9f9;
    color:#000;
    border-color: transparent;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
};
`

const UserImg = styled.img`
height: 100%;
`
const DropDown = styled.div`
position: absolute;
top: 48px;
right: 0px;
background-color: rgb(19, 19, 19);
border: 1px solid rgba(151, 151, 151, 0.34);
border-radius: 4px;
box-shadow: rgb(0, 0, 0 / 50%) 0px 0px 18px 0px;
font-size: 14px;
letter-spacing: 3px;
width: 100px;
opacity: 0;
margin-top: 5px;
padding: 4px;
`

const SignOut = styled.div`
position: relative;
height: 48px;
width: 48px;
display: flex;
cursor: pointer;
align-items: center;
justify-content: center;


${UserImg} {
    border-radius: 50%;  
}

&:hover {
    ${DropDown} {
        opacity: 1;
        transition-duration: 2s;
    }
}
`
