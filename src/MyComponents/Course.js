import React, { useState, useEffect } from 'react';

import axios from "axios"


import Topic from './Topic';

function Course() {

    const [open, setOpen] = useState(false);


    const [courseData, setcourseData] = useState({})
    const [title, setTitle] = useState('')
    const [description, setdescription] = useState('')
    const [imageurl, setimageurl] = useState('')
    const [units, setunits] = useState([])

    // title: '',
    // description: '',
    // imageurl: '',
    // units: [],
    var id;

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



    useEffect(() => {
        const subscribe = () => {

            sendRequest().then((data) => setcourseData(data))
            // console.log("data--->", data);
            //  setuserData([...data])
            console.log("courseData", coursedata)


        }
        return subscribe();




    }, [id])

    return (
        <>
                  
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



