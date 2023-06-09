
import Navbar from "../../components/navigation/Navbar.js";
import Footer from "../../components/navigation/Footer.js";
import ApliForm from "../../components/home/ApliForm.js";
import About from "../../components/home/About.js";
import JobList from "../../components/home/Joblist.js";
import Jobdetails from "../../components/home/Jobdetails.js";
import LoginF from "../../components/home/Login.js";

import React,{ useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams } from 'react-router-dom';
import { Container } from "react-bootstrap";

function Home(){
  const [jobList, setJobList] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:5000/job_offer",
    }).then((response) => {
      setJobList(response.data)
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
      }
    })
  }, []); // El array vacío como segundo argumento significa que este efecto se ejecutará una vez cuando el componente se monte.
  

  const location = useLocation();
  const { id } = useParams();
  
  if(location.pathname === '/'){
    return(
      <>
        <Navbar/> 
        <About/>
        <JobList jobLists={jobList} />
        <Footer/>
      </>
    )
  }else if(location.pathname === `/jobs/${id}`)
  {
    return(
    <>
      <Navbar/>
      <Jobdetails jobList={jobList}/>
      <Footer/>
    </>
    )
  }else if(location.pathname === `/AplicantForm/${id}`)
  {
    return (
      <>
        <Navbar/>
        <ApliForm id={id}/>
        <Footer/>
      </>
    );    

  }else if(location.pathname === `/login`)
  {
    return(
      <>  
      <Container >      
        <LoginF/>
      </Container>
      </>
  )
  }
}

export default Home;