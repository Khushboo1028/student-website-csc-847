import React, { useState, useEffect } from 'react'
import axios from "axios";

const HomeIntro = () => {


    const [users, setUsers] = useState([]);
    const [studentId, setStudentId] = useState();
    const [firstname, setFirstname] = useState();
    const [lastname, setLastname] = useState();
    const [email, setEmail] = useState();
    const [address, setAddress] = useState();
    const [gpa, setGpa] = useState();
    const [searchTerm, setSearchTerm] = useState();
    const [searchedStudents, setSearchedStudents] = useState([]);

 
    useEffect(() => {
        //api call here
        axios
            .get('http://34.132.48.95/students/')
            .then(function (response) {

                console.log(response.data);
                setUsers(response.data);

           
            })
            .catch(function (error) {
                console.log(error);
            });

    }, []);

    const handleSubmit=(e)=>{
    
        const newStudent = {studentId, firstname, lastname, email, address, gpa}
        console.log(newStudent);
        console.log("I am here");
        

        axios.post('http://34.132.48.95/students/', newStudent)
        .then((response)=>{
            
            console.log(response);

        
            alert("Succesfully Added Student");

            
        })
        .catch((error)=>{
            alert(error);
            console.log(error);
        })

        e.preventDefault();


    }

    const handleSearch=(e)=>{
        
        axios.get(`http://34.132.48.95/students/${searchTerm}`)
        .then((response) => {
            console.log(response);
            setSearchedStudents(response.data);
     
        })
        .catch((error) => {
            alert(error);
        })

        e.preventDefault();
    }

    
    return (
        <div style={{padding:'2rem'}}>
            <h1 style={{textAlign:'center'}}>Student Website: CSC 847 Assignment 1 by Khushboo</h1>
            <h2>ADD Students</h2>
            <form>
            <table>
      
                <tr>
                <td>
                <label>Student ID:</label> 
                </td>
                <td>
                <input value={studentId}  type="number" id="studentId" onChange={(event)=> setStudentId(event.target.value)}></input>
                </td>
                </tr>
              
        

                <tr>
                <td>
                <label>First Name:</label>
                </td>
                <td>
                <input value={firstname}  type="text" id="firstname" onChange={(event)=> setFirstname(event.target.value)}></input>
               </td>
                </tr>

                <tr>
                    <td>

                <label>Last Name:</label>
                </td>
                <td>

                <input value={lastname}  type="text" id="lastname" onChange={(event)=> setLastname(event.target.value)}></input>
                </td>
                </tr>

                <tr>
                <td>
                <label>Email:</label>
                </td>
                <td>
                <input value={email}  type="text" id="email" onChange={(event)=> setEmail(event.target.value)}></input>
                </td>
                </tr>

                <tr>
                    <td>
                <label>Mailing Address:</label>
                </td>
                <td>
                <input value={address}  type="text" id="address" onChange={(event)=> setAddress(event.target.value)}></input>
                </td>
                </tr>

                <tr>
                    <td>
                <label>GPA:</label>
                </td>
                <td>

                <input value={gpa}  type="number" id="gpa" onChange={(event)=> setGpa(event.target.value)}></input>
                </td>
                </tr>
               

                <tr><td>
                
                <input type="submit" onClick={handleSubmit}/>
                </td></tr>



            
            </table>
            </form>

    

            <h2>All Students</h2>
           <table style={{border: '1px black solid', padding:'0.5rem', width:'100%', textAlign:'left'}}>
           <tr >
                <th>Student ID </th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Mailing Address</th>
                <th>GPA</th>
            </tr>

            {users.map((user) => {
                return <tr>
                <td>{user.studentId}</td>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.gpa}</td>

                </tr>
            })}

           </table>

           <h2>Search for Students</h2>

           <form>
               <input style={{width:'400px'}} type="text" placeholder="Search by student Id, first name or last name" value={searchTerm} onChange={(event)=> setSearchTerm(event.target.value)}/>
                <br/>
                <br/>
               <input type="submit" value="Search" onClick={handleSearch}/>
           </form>

           <br/>

           <table style={{border: '1px black solid', padding:'0.5rem', width:'100%', textAlign:'left'}}>
           <tr>
                <th> Student ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Mailing Address</th>
                <th>GPA</th>
            </tr>

            {searchedStudents.map((user) => {
                return <tr>
                <td>{user.studentId}</td>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.gpa}</td>

                </tr>
            })}

           </table>
           


        </div>
        
    )
}

export default HomeIntro
