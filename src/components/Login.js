import React, { useRef, useState } from "react";
import { PHOTO_URL } from "../utils/constants";
import Header from "./Header";
import { checkValidate } from "../utils/validator";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
// import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  //getting data from input form
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleHandler = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleClick = () => {
    //validate data
    const message = checkValidate(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) return;
    //Sign-In / Sign-Up Logic
    if (!isSignInForm) {
      //Sign-Up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;

          //update user-profile
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: PHOTO_URL,
          })
            .then(() => {
              // Profile updated!
              const { uid, displayName, email, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: PHOTO_URL,
                })
              );
              // navigate("/browse");
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode, +" -" + errorMessage);
        });
    } else {
      //Sign-In logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode, +" -" + errorMessage);
        });
    }
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/00103100-5b45-4d4f-af32-342649f1bda5/3bd48e1e-8f08-497c-b50b-44d0aebc2a65/US-en-20230821-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="logo"
        />
      </div>
      <form
        className="absolute w-3/12 p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-75"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            ref={name}
            placeholder="Enter Name"
            className="p-2 my-4 w-full bg-gray-800"
          />
        )}
        <input
          type="email"
          ref={email}
          placeholder="Email or phone Number"
          className="p-2 my-4 w-full bg-gray-800"
        />
        <input
          type="password"
          ref={password}
          placeholder="Password"
          className="p-2 my-4 w-full  bg-gray-800"
        />
        <p className="font-bold text-red-500">{errorMessage}</p>
        <button
          className="p-4 my-6 bg-red-700 w-full rounded-lg"
          onClick={handleClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleHandler}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already Registered Sign In now."}
        </p>
      </form>
    </div>
  );
};

export default Login;
