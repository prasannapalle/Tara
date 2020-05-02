import React from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import ListGroupItem from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/Card";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import { Component } from "react";
import FormControl from "@material-ui/core/FormControl";
import Env from "../helpers/Env";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/core/Icon';
import {Edit, ContactlessOutlined} from '@material-ui/icons';
import {Delete} from '@material-ui/icons';


    




class Alltasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
           allprojects:[],

        }
  

    }
    componentDidMount() {
        if(sessionStorage.getItem('persona')=="admin")
        {
            let id=sessionStorage.getItem('companyid')
            axios.get(Env.host+"/calender/admin/alltasks/"+id).then((response) => {
                this.setState({
                      userdetails: response.data
                    })
                })

        }
        else
        {
            let id=sessionStorage.getItem('id')
            axios.get(Env.host+"/calender/alltasks/"+id).then((response) => {
                this.setState({
                      userdetails: response.data
                    })
                })

            }   
   
}
      
    render() {
        let projects = this.state.userdetails? this.state.userdetails.map((project) => {
          console.log(this.state.userdetails)
            return(
                <div>
                     <Card style={{ width: '25rem' }}>
    <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
  </Card.Body>
  <ListGroup className="list-group-flush">
    <ListGroupItem>Cras justo odio</ListGroupItem>
    <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
    <ListGroupItem>Vestibulum at eros</ListGroupItem>
  </ListGroup>
  <Card.Body>
    <Card.Link href="#">Card Link</Card.Link>
    <Card.Link href="#">Another Link</Card.Link>
  </Card.Body>
</Card>
                     
                       </div>
     
                  )
                }
               ):""
       
                              
        return (
        <div>
         <div class="row">
         <div class="col-md-1"></div>

             <div style={{marginRight:"0px"}}
              ><h1> MY Events</h1></div>
         </div>
               <div class="row" style={{ height:"30px"}}>
                   <div class="col-md-2"></div>
                   <div class="col-md-8">
                   
                          {projects}
                    
                   </div>
                   <div class="col-md-2"></div>
               </div>
        </div>

        );
    }
}

export default Alltasks;
