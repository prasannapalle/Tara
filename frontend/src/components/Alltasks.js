import React from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import ListGroupItem from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/Card";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import { Component } from "react";
import { Button, FormControl } from "@material-ui/core/";
import Env from "../helpers/Env";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/core/Icon';
import { Edit, ContactlessOutlined } from '@material-ui/icons';
import { Delete } from '@material-ui/icons';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ScheduleIcon from '@material-ui/icons/Schedule';


class Alltasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userdetails: [],
      access: false
    };
  }
  componentDidMount() {
    if (sessionStorage.getItem("persona") == "admin") {
      let id = sessionStorage.getItem("companyId");
      axios
        .get(Env.host+"/calender/admin/alltasks/"+id)
        .then((response) => {
          this.setState({
            userdetails: response.data,
          });
        });
    } else {
      let id = sessionStorage.getItem("userid");
      axios.get(Env.host+"/calender/alltasks/"+id).then((response) => {
        this.setState({
          userdetails: response.data,
        });
      });
    }
  }

  render() {
    let projects = this.state.userdetails.length > 0 ? this.state.userdetails.map((el) => {
      console.log(this.state.userdetails);
      return (
        <div>
          <Card style={{ width: '50rem', "marginTop": "20PX" }}>
            <Card.Body>
              <div class="col-md-1"></div>
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-10">
                    <div style={{ "margin-top": "10px", "fontSize": "25px" }}><Link to={"/Eventdetails/" + el.taskid} style={{ color: "black" }} >{el.name}</Link></div>

                  </div>
                  <div class="col-md-1" style={{ marginright: "0px" }}>
                    {this.state.access == true ? <div>
                      <IconButton style={{ fontSize: 30 }} onClick={() => this.handleedit(el.taskid)}><Edit /></IconButton>
                      <IconButton style={{ fontSize: 30 }} onClick={() => this.handledelete(el.taskid)}><Delete /></IconButton></div> : ""}


                  </div>
                </div>


                <div class="row">

                  <div class="col-md-8">
                    <div style={{ "fontSize": "15px", paddingTop: "20px" }}>  <DateRangeIcon></DateRangeIcon>{el.date.substr(0, 10)}</div>
                  </div>

                  <div class="col-md-4">
                    <div style={{ "fontSize": "15px" }}>
                       <Button type="button" variant="outlined" color="primary"
                       

                      >
                        <Link to={"/Taskdetails/" + el.taskid} style={{ color: "black" }}></Link>


      View Users</Button></div>

                  </div>
                </div>



                <div style={{ "fontSize": "15px", "margin-top": "20px" }}>{el.description}</div>

              </div>

              <div class="col-md-1">



              </div>
            </Card.Body>
          </Card>
        </div>
      );
    })
      : "";

    return (
      <div>
        <div className="paddingleft15">
          <div>{this.state.sucessmsg}</div>
          <div className="form-group">
            <div className="">
              <div className="form-group d-flex justify-content-between">
                <h2>Tasks</h2>

              </div>
              <div class="row">
                <div class="col-md-1"></div>
                <div class="col-md-8">

                  {projects}

                </div>
                <div class="col-md-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default Alltasks;
