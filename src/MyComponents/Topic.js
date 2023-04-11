
import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import axios from "axios"
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
function Topic(props) {

    const [open, setOpen] = useState(false);
    const [plus, setplus] = useState(true);

    console.log(props.units.title)
    return (


        <div>


            {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
            {/* <a href="#" class="btn btn-primary">Go somewhere</a>  */}
            <div class="d-grid gap-2" style={{ margin: "10px", backgroundColor: "#fff"}}>
                <Button type="button" class="btn btn-light" style={{ margin: "10px", backgroundColor: "#fff", color: "black", borderColor: "grey",  cursor: 'pointer' }}
                    onClick={() => {
                        setOpen(!open)
                        setplus(!plus)
                    }}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}>
                    <div style={{ display: "flex", justifyContent: " space-between", alignItems: "center" }}>
                        <h5 class="card-title" >{(props.i) + 1}.  {props.units.title}  </h5> {plus ? <i class="bi bi-plus-circle"></i> : <i class="bi bi-dash-circle"></i>}</div>
                    <div style={{ display: "flex", justifyContent: " space-between", alignItems: "center" }} >{(props.units.lectures).length} lectures  {(props.units.Quiz).length > 0 ? `${(props.units.Quiz).length} Quiz` : ""}</div>


                </Button>

                <Collapse in={open}>


                    <div id="example-collapse-text" >{ }


                       
                        {props.units.lectures.map((data, i) => {

                            return <> <div class="card" style={{ margin: "10px",cursor: 'pointer' }}>
                                <div class="card-body" style={{ display: "flex", justifyContent: " space-between", alignItems: "center" }} >
                                    <div><i class="bi bi-play-circle"></i> {i + 1}.  {data.title}</div>
                                    <div>{data.duration}</div>

                                </div>
                            </div>

                            </>
                        })}


                        {props.units.Quiz.map((data, i) => {

                            return <><div class="card" style={{ margin: "10px",cursor: 'pointer' }}>
                                <div class="card-body" style={{ display: "flex", justifyContent: " space-between", alignItems: "center" }} >
                                    <div><i class="bi bi-trophy"></i> {i + 1 + props.units.lectures.length}.  {data.title}</div>
                                    <div>{data.duration}</div>

                                </div>
                            </div>

                            </>
                        })}






                    </div>




                </Collapse>
            </div>
        </div>
    )
}

export default Topic