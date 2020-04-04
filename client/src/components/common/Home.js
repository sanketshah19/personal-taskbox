import React from 'react';
import HomeImg from '../../Images/Home.jpg'

function Home(){
    return(
        <div className="row">
            <div className="col-md-8 offset-md-2 text-center">
                <h2 className="mb-2">Welcome to Taskbox</h2>
                <img src={HomeImg} alt="Home" style={{width: '100%', height: '90%'}}/>
            </div>
        </div>
    )
}

export default Home