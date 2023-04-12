import React, {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import validator from 'validator'


import { googleLogout, useGoogleLogin } from '@react-oauth/google';

function Login() {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        email: "",
        password: ""
      });
    
      const validateEmail = (email) => {
        if (validator.isEmail(email)) {
            console.log("true")
            return true
          } else {
            return false
          }
    
      }
   
    const handleUser = (e) =>{
      const { name, value } = e.target;
      setValues({...values, [name]:value})
    
    }
    
    const sendRequest= async()=>{
      try{
        const res = await axios.post(`https://imartius.onrender.com/course/login`, values)
        
        const data = await res.data;

        console.log(data)
        return data;
    
      }catch(err){
        alert(err)
      }
    
    }
    
    
    const handleSubmit = async(e)=>{
      e.preventDefault();
      if(validateEmail(values.email)){
        console.log("emailformat checked")
        
      }else{
        alert("invalid email")
        return
      }
      
      try{
      const data = await sendRequest();
      console.log("userId", data.data._id);
      if(data){
        console.log("data -->" ,data)
        await localStorage.setItem("userId", data.data._id)
        navigate("/course")
      }else{
        alert("invalid input")
      }
    
    
      }catch(err){
        alert("invalid details")
      }
    }

    const handleSignin = ()=>{

      navigate("/signin")

    }


    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState([]);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {setUser(codeResponse)
          navigate("/course")},
        onError: (error) => console.log('Login Failed:', error)

    });

    

    const logOut = () => {
        googleLogout();
        setProfile(null);
    };


    useEffect(() => {
        const subscribe = () => {

            
          
   

           
                if (user) {
                    axios
                        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                            headers: {
                                Authorization: `Bearer ${user.access_token}`,
                                Accept: 'application/json'
                            }
                        })
                        .then((res) => {
                            setProfile(res.data);
                        })
                        .catch((err) => console.log(err));
                }
    


        }


        return subscribe();




    }, [user]
    )
    
      return (
        <>
          <Card style={{ width: '18rem', margin:'auto' , marginTop : '100px'}}>
    
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleUser} />
    
              </Form.Group>
    
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" onChange={handleUser} />
              </Form.Group>
            
              <Button  variant="primary" type="submit" onClick={handleSubmit}>
                Submit
              </Button>

              <Button  variant="primary" type="submit" onClick={handleSignin}>
              click for signin
              </Button>
            </Form>
          
        <div style={{ display: "flex", flexDirection: "row-reverse", margin: "10px" }}>
                    <button onClick={() => login()}>Sign in with Google 🚀 </button>
                </div>
         
        </Card>

        
        </>
      );
}

export default Login