import { useState } from 'react'
import './Signup.css'

function Signup() {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [confirm, setConfirm] = useState(""); 

  const [errors, setErrors] = useState({
    fullname: "", 
    email: "",
    password: "",
    confirm: "",
}); 

function handleFullName(e) { 
  setFullName(e.target.value); 
  setErrors(prev => ({ ...prev, fullname: "" }));
}

function handleEmail(e) { 
  setEmail(e.target.value);
  setErrors(prev => ({ ...prev, email: "" }));
}

function handlePassword(e) { 
  setPassword(e.target.value);
  setErrors(prev => ({
        ...prev,
        password: "",
        confirm: ""}));
} 

function handleConfirm(e) { 
  setConfirm(e.target.value); 
  setErrors(prev => ({ ...prev, confirm: "" }));
}
 

async function handleSignIn(e) {
  e.preventDefault();

  let hasError = false; 

  const emailReg = /^(.+)@([^\.].*)\.([a-z]{2,})$/;
  const lengthReg = /^.{9,17}$/;
  const digitReg = /[0-9]/;
  const specialCharReg = /[!@#$%^&*(),.?":{}|<>_\-\\[\]\/+=;]/;
  const uppercaseReg = /[A-Z]/;

  const newErrors = {
            fullname: "",
            email: "",
            password: "",
            confirm: "",
            image: ""
        };

  if(!lengthReg.test(password) || !digitReg.test(password) || !specialCharReg.test(password) || !uppercaseReg.test(password)) { 
    newErrors.password = "Password must have one upper case, one digit, and one special character";
    hasError = true; 
  }

  if(!emailReg.test(email)) { 
    newErrors.email = "Email is not valid. Ex: user@example.com";
    hasError = true; 
  }

  if(fullname === "") { 
    newErrors.fullname = "Enter your name"
    hasError = true; 
  }

  if(password === "") { 
    newErrors.password = "Enter a password";
    hasError = true; 
  }

  if(email === "") { 
    newErrors.email = "Enter an email";
    hasError = true; 
  }

  if(confirm !== password) { 
    newErrors.confirm = "Passwords do not match"
    hasError = true; 
  }

  setErrors(newErrors);

  if (hasError) {
    console.log(errors); 
    return;
  }

  try { 
    const response = await fetch("/api/accounts", { 
      method: "POST",
      body: { 
        fullname: fullname,
        email: email,
        password: password,
        confirm: confirm
      }
    });

    const data = await response.json(); 

    if(!response.ok) { 
      console.log("error", data); 
      return; 
    }

    alert("Form submitted sucessfully");

  } catch (error) {
        console.error("Fetch error:", error);
        setMessage("Error submitting form");
      }
  };

  return (
    <>

  <div className = "background" style = {{backgroundColor: "#CADABF"}}>

  <div className = "signupContainer">
    <div style = {{backgroundColor: "#E7E8D8", width: "40%"}}>
      <div><p>Photograph bike pictures</p></div>
    </div>
  <div style = {{backgroundColor: "white", width: "60%"}}>
  <h4 style = {{margin: "20px"}}>CREATE YOUR FREE ACCOUNT</h4>
  
  
  <form className = "formSignup" onSubmit = {handleSignIn}>
    <div className = {errors.fullname ? "control error" : "control"}>
      <label htmlFor = "fullname" className = "labelSignup">Full Name</label>
       <input 
          className = "inputSignup"
          name = "fullname"
          type = "text" 
          value = {fullname} 
          placeholder = "Enter you first and last name"
          onChange = {handleFullName}/>
          <span className = "errorMsg">{errors.fullname}</span>
    </div>

    <div className = {errors.email ? "control error" : "control"}>
      <label htmlFor = "email" className = "labelSignup">Email</label>
      <input 
        className = "inputSignup"
        name = "email"
        type = "text"
        value = {email}
        placeholder = "Enter your email ex: user@example.com"
        onChange = {handleEmail}/>
        <span className = "errorMsg">{errors.email}</span>   
    </div>

    <div className = {errors.password ? "control error" : "control"}>
      <label htmlFor = "password" className = "labelSignup">Password</label>
      <input 
        className = "inputSignup"
        name = "password"
        type = "password"
        value = {password}
        placeholder = "Enter a password"
        onChange = {handlePassword}/>
        <span className = "errorMsg">{errors.password}</span>
    </div>

    <div className ={errors.confirm ? "control error" : "control"}>
      <label htmlFor = "confirm" className = "labelSignup">Confirm Password</label>
      <input 
        className = "inputSignup"
        name = "confirm"
        type = "password"
        value = {confirm}
        placeholder = "Confirm your password"
        onChange = {handleConfirm}/>
        <span className = "errorMsg">{errors.confirm}</span>
    </div>

    <div className = "buttonSignupDisplay">
      <button className = "buttonSignup">Create Account</button>
    </div>
    
    <div className = "loginLink">
      <h2>Already have an account?</h2>
      <a href = "login">Log In</a>
    </div>
  </form>

  </div>
  </div>

  </div>

    </>
  )
}

export default Signup
