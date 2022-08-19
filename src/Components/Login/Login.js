import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase-config';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import { Button, Snackbar } from '@material-ui/core';
import AnimationRevealPage from "../../helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "../../Components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import illustration from "../../images/signup-illustration.svg";
import logo from "../../images/logo.png";
import googleIconImageSrc from "../../images/google-icon.png";
import twitterIconImageSrc from "../../images/twitter-icon.png";
import { ReactComponent as SignUpIcon } from "feather-icons/dist/icons/user-plus.svg";
import Alert from '@mui/material/Alert';


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}

const Container = tw(ContainerBase)`min-h-screen bg-primary-800 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-24 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;

const SocialButtonsContainer = tw.div`flex flex-col items-center`;
const SocialButton = styled.a`
  ${tw`cursor-pointer w-full max-w-xs font-semibold rounded-lg py-3 border text-gray-900 bg-gray-100 hocus:bg-gray-200 hocus:border-gray-400 flex items-center justify-center transition-all duration-300 focus:outline-none focus:shadow-outline text-sm mt-5 first:mt-0`}
  .iconContainer {
    ${tw`bg-white p-2 rounded-full`}
  }
  .icon {
    ${tw`w-4`}
  }
  .text {
    ${tw`ml-4`}
  }
`;

const DividerTextContainer = tw.div`my-12 border-b text-center relative`;
const DividerText = tw.div`leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform -translate-y-1/2 absolute inset-x-0 top-1/2 bg-transparent`;

const Form = tw.form`mx-auto max-w-xs mt-12`;
const Input = tw.input`w-4/5 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${props => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-lg bg-contain bg-center bg-no-repeat`}
`;

const Login = ({
    logoLinkUrl = "#",
    illustrationImageSrc = illustration,
    headingText = "Sign Up For PhonoMania",
    socialButtons = [
        {
            iconImageSrc: googleIconImageSrc,
            text: "Sign Up With Google",
            url: "https://google.com"
        },
        {
            iconImageSrc: twitterIconImageSrc,
            text: "Sign Up With Twitter",
            url: "https://twitter.com"
        }
    ],
    submitButtonText = "Sign Up",
    SubmitButtonIcon = SignUpIcon,
    tosUrl = "#",
    privacyPolicyUrl = "#",
    signInUrl = "#"
}) => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    const [newUser, setNewUser] = useState(false);
    const [loginData, setLoginData] = useState({
        userName: '',
        email: '',
        password: ''
    });

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app(); // if already initialized, use that one
    }



    const handleGoogleSignIn = () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleProvider).then(function (result) {
            const { displayName, email } = result.user;
            const signedInUser = { name: displayName, email }
            setLoggedInUser(signedInUser);
            // history.replace(from);
            //console.log(loggedInUser);
            alert('Logged In ', loggedInUser.email);
            storeAuthToken();
        }).catch(function (error) {
            const errorMessage = error.message;
            console.log(errorMessage);
            alert(errorMessage);
        });
    }

    // const handleEmailPasswordSignIn = () => {
    //     firebase.auth().signInWithEmailAndPassword(email, password)
    //         .then((result) => {
    //             const { displayName, email } = result.user;
    //             const signedInUser = { name: displayName, email }
    //             setLoggedInUser(signedInUser);
    //             storeAuthToken();
    //         })
    //         .catch((error) => {
    //             var errorCode = error.code;
    //             var errorMessage = error.message;
    //             console.log(errorCode, ' ', errorMessage);
    //         });
    // }


    const handleChange = (e) => {
        const newLoginData = { ...loginData };
        newLoginData[e.target.name] = e.target.value;
        setLoginData(newLoginData);
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const name = loginData.userName;
        const email = loginData.email;
        const password = loginData.password;

        // firebase.auth.createUserWithEmailAndPassword(email, password)
        // .then((userCredential) => {
        //   // Signed in 
        //   const user = userCredential.user;
        //   // ...
        //   console.log(user);
        // })
        // .catch((error) => {
        //   const errorCode = error.code;
        //   const errorMessage = error.message;
        //   // ..
        // });

        if (newUser) {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    // console.log(user);
                    const loginName = loginData.userName;
                    updateUserName(loginName);

                    const { displayName, email } = user;


                    const signedInUser = { name: loginName, email }

                    setLoggedInUser(signedInUser);
                    storeAuthToken();
                    setUserToSession(signedInUser);

                    // console.log(loggedInUser);

                    alert(`Welcome ${loginName}`);
                    // ...
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    //alert(errorMessage, 'Error Code ', errorCode);
                    // console.log(error);
                    // ..
                    return <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                            {error.message}
                        </Alert>
                    </Snackbar>
                });
        }

        if (!newUser) {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(res => {
                    const user = res.user;
                    // console.log(user);

                    const { displayName, email } = user;

                    // console.log(user);
                    const signedInUser = { name: displayName, email, admin: false }
                    setLoggedInUser(signedInUser);
                    updateUserName(name);
                    storeAuthToken();
                    setUserToSession(signedInUser);

                    // console.log(loggedInUser);

                    alert('Logged In ', loggedInUser.email);
                })
                .catch((error) => {
                    const newUserInfo = {};
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setLoggedInUser(newUserInfo);
                    return <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                            {error.message}
                        </Alert>
                    </Snackbar>
                    //alert(error.message);
                });
        }
    }


    const updateUserName = name => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name,
        }).then(function () {
            // console.log(user,name);
        }).catch(function (error) {
            console.log(error);
        });
    }

    const setUserToSession = user => {
        sessionStorage.setItem('user', JSON.stringify(user));
    }

    const storeAuthToken = () => {
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
            .then(function (idToken) {
                sessionStorage.setItem('token', idToken);
                history.replace(from);
            }).catch(function (error) {
                // Handle error
            });
    }

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    return (
        <AnimationRevealPage >
            <Container >
                <Content style={{ marginTop: '11rem' }}>
                    <MainContainer>
                        <LogoLink href={logoLinkUrl}>
                            <LogoImage src={logo} />
                        </LogoLink>
                        <MainContent>
                            <Heading>{headingText}</Heading>
                            <FormContainer>
                                <SocialButtonsContainer>
                                    <SocialButton onClick={handleGoogleSignIn}>
                                        <span className="iconContainer">
                                            <img src={googleIconImageSrc} className="icon" alt="" />
                                        </span>
                                        <span className="text">Sign Up With Google</span>
                                    </SocialButton>
                                </SocialButtonsContainer>
                                <DividerTextContainer>
                                    <DividerText>Or Sign up with your e-mail</DividerText>
                                </DividerTextContainer>
                                <Form style={{ marginTop: '5rem' }} onSubmit={handleFormSubmit}>
                                    {
                                        newUser &&
                                        <Input
                                            onChange={handleChange} type="text" name='userName' placeholder="User Name" required />
                                    }
                                    <Input
                                        onChange={handleChange}
                                        type="email" placeholder="Email" name='email' required />
                                    <Input
                                        onChange={handleChange}
                                        type="password" placeholder="Password" name='password' required />
                                    {
                                        newUser ?
                                            <SubmitButton type="submit">
                                                <SubmitButtonIcon className="icon" />
                                                <span className="text"> Sign Up </span>
                                            </SubmitButton>
                                            :

                                            <SubmitButton
                                                type="submit">
                                                <SubmitButtonIcon className="icon" />
                                                <span className="text">Sign In </span>
                                            </SubmitButton>

                                    }
                                </Form>

                                <p tw="mt-8 text-sm text-gray-600 text-center">
                                    {
                                        newUser ? 'Go back to ' :
                                            'Dont have an account? '
                                    }
                                    <p tw="border-b text-primary-600 border-gray-500 cursor-pointer"
                                        onClick={() => setNewUser(!newUser)}
                                    >
                                        {
                                            newUser ? 'Sign In' : 'Sign Up'
                                        }
                                    </p>
                                </p>
                            </FormContainer>
                        </MainContent>
                    </MainContainer>
                    <IllustrationContainer>
                        <IllustrationImage imageSrc={illustrationImageSrc} />
                    </IllustrationContainer>
                </Content>
            </Container>
            {/* <Button variant="contained" color="secondary" onClick={handleGoogleSignIn}>Google Sign In</Button> */}
        </AnimationRevealPage>
    );
};

export default Login;