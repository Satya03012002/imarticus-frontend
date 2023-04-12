import React, { useState, useEffect } from 'react';

import axios from "axios"


import Topic from './Topic';


import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";

function Course() {
    const navigate = useNavigate();


    const [courseData, setcourseData] = useState({})
    const [title, setTitle] = useState('')
    const [description, setdescription] = useState('')
    const [imageurl, setimageurl] = useState('')
    const [units, setunits] = useState([])


    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState([]);

    // const login = useGoogleLogin({
    //     onSuccess: (codeResponse) => setUser(codeResponse),
    //     onError: (error) => console.log('Login Failed:', error)
    // });



    const coursedata = {}

    const sendRequest = async () => {
        try {
           

      

            const res = await axios.get(`https://imartius.onrender.com/course/6434eaa7538a41ee6db7dfab`);


            const data = await res.data;


            coursedata.title = data.title
            coursedata.description = data.description
            coursedata.imageurl = data.imageurl
            coursedata.units = data.units
            console.log(coursedata)
            setTitle( coursedata.title)
            setdescription(coursedata.description)
            setimageurl( coursedata.imageurl )
            setunits(coursedata.units)

            return data;

        } catch (err) {
            alert(err)
        }

    }

    const logOut = () => {
        googleLogout();
        setProfile(null);
        navigate("/")

    };


    useEffect(() => {
        const subscribe = () => {

            sendRequest().then((data) => setcourseData(data))
          
            console.log("courseData", coursedata)

           
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
    

            <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                
                    <div><button onClick={logOut} style={{ margin: "5px" }}>Log out</button></div>
                    
                </div>



            <div class="card mb-3" style={{ margin: "190px" }}>
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src={imageurl} class="img-fluid rounded-start" alt="..."  />
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">{title}</h5>
                            <div class="alert alert-secondary" role="alert">
                                {description}
                            </div>
                            {/* <p class="card-text">Batch: Default_Batch_1625571974257_Introduction to Machine Learning</p> */}
                            <p class="card-text"><small class="text-muted"><strong>0% Complete</strong></small></p>
                        </div>
                    </div>
                </div>


                <div class="card-body">
                {/* <h5 class="card-title">{title}</h5> */}
                {units.map((data, index) => {

                    return <>        
                 <Topic  units={data} i = {index}/>

                    </>
                })}
                </div>
            </div> 


        </>
    )
}

export default Course



