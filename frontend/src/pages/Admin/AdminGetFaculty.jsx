import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom';
import {adminGetAllFaculty} from '../../redux/actions/adminAction'
import {DataGrid} from '@material-ui/data-grid'

import styled from 'styled-components'
import AdminNavbar from '../../components/AdminNavbar'
import Loader from '../../components/Loader'

import {ImageSearch} from '@material-ui/icons'

const Container = styled.div` 
width:100%;
box-sizing:border-box;
background-color: rgb(255, 255, 255);
display:flex;
flex-direction:column;
border-left: 1px solid rgba(0, 0, 0, 0.158);
height: 100vh;
`
const Heading = styled.h1` 
font:400 2rem;
padding:0.5vmax; 
box-sizing:border-box;
color:#0077b6;
transition: all 0.5s;
margin: 2rem;
text-align: center;
border-bottom:1px solid #0077b6;
`
const Form = styled.form` 
width:20rem;
display: flex;
flex-direction: column;
align-items: center;
margin: auto;
padding: 3vmax;
background-color: white;
`

const FormItem = styled.div` 
display: flex;
width: 100%;
align-items: center;
margin: 2rem;
>select{
    padding:1vmax 4vmax;
    padding-right:1vmax;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.267);
    border-radius: 4px;
    font: 300 0.9vmax;
    outline: none;
}
>svg{
    position:absolute;
    transform:translateX(1vmax);
    font-size:1.6vmax; 
    color:rgba(0,0,0,0.623)
}
`
const Button = styled.button` 
    border-radius: 10px;
    border:none;
    background-color: #0077b6;
    font: 400 1vmax;
    color: white;
    text-decoration: none;
    padding: 0.5vmax;
    width: 30%;
    margin: 4vmax;
    text-align: center;
    cursor:pointer;
`


const AdminGetFaculty = () => {
    const admin = useSelector((store) => store.admin);
    const dispatch = useDispatch();
    const [department, setDepartment] = useState("C.S.E");
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {
        if (admin.allFaculty.length !== 0) {
            setIsLoading(false)
        }

    }, [admin.allFaculty.length])

    const formHandler = (e) => {
        e.preventDefault();
        setIsLoading(true);
        dispatch(adminGetAllFaculty({department}));
        setIsLoading(false);
    }

    const columns = [
        {field:"id",headerName:"No.",flex:0.3},
        {field:"code",headerName:"Registration Number",flex:0.5},
        {field:"name",headerName:"Name",flex:0.5},
        {field:"email",headerName:"Email",flex:0.3},
        {field:"designation",headerName:"Designation",flex:0.4}
    ]

    /*
    const subjects = [
        {no:1,code:12345,name:"Shifon Shaikh",email:"abc123@gmail.com",year:2020},
        {no:2,code:12345,name:"Rahul Yadav",email:"abc123@gmail.com",year:2018},
        {no:3,code:12345,name:"Disha Patani",email:"abc123@gmail.com",year:2016},
        {no:4,code:12345,name:"Rakesh Mali",email:"abc123@gmail.com",year:2006},
        {no:5,code:12345,name:"Raj Aryan",email:"abc123@gmail.com",year:2014},
    ]
    */

    const rows = [];
    admin.allFaculty.forEach((item,index) => {
        rows.push({
            id:index + 1,
            code:item.registrationNumber,
            name:item.name,
            email:item.email,
            designation:item.designation
        })
    })


  return (
      <>
      {
          admin.isAuthenticated?(
              <>
                  <AdminNavbar/>
    <Container>
        <Form onSubmit={formHandler}>
            <Heading>Search Faculty</Heading>
            <FormItem>
                <ImageSearch/>
                <select onChange = {(e) => setDepartment(e.target.value)}>
                    <option>C.S.E</option>
                    <option>E.C.E</option>
                    <option>I.T</option>
                    <option>Civil</option>
                    <option>Mechanical</option>
                </select>
            </FormItem>
            <Button type="submit">
                Search
            </Button>
        </Form>
        {
            isLoading?(
                <Loader/>
            ):(
<DataGrid rows={rows} columns={columns} pageSize={5} disableSelectionOnClick autoHeight/>
            )
        }
        
    </Container>
              </>
          ):(
              navigate('/admin/login')
          )
      }
      </>
    

    
  )
}

export default AdminGetFaculty
