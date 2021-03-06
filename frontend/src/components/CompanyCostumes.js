import React, { Fragment } from "react";
import axios from "axios";
import { withStyles, makeStyles } from "@material-ui/core/styles";
// import Modal from 'react-bootstrap/Modal';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import GroupIcon from "@material-ui/icons/Group";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import ListItemText from "@material-ui/core/ListItemText";
import PeopleIcon from "@material-ui/icons/People";

import {  Modal } from "react-bootstrap";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import Env from "../helpers/Env";
import { TextField,Button } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

import Autocomplete from "@material-ui/lab/Autocomplete";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Form, Col } from "react-bootstrap";
import Tooltip from "@material-ui/core/Tooltip";

import JwPagination from "jw-react-pagination";

// import SimpleMap from "../components/SimpleMap";
// import "./CompanyDB.css";
// import UserCharacter from "./UserCharacter";

const StyledTableCell = withStyles((theme) => ({}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const classes = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 600,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
}));

const customStyles = {
  li: {
    first: {
      display: "none",
    },
    last: {
      display: "none",
    },
  },
};

var rolesdata = [];
var projectsdata = [];

class CompanyDB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userdetails: [],
      costumedetails: [],
      locationdetails: [],
      roles: [],
      show: false,
      pageOfItems: [],
      showmodal: false,
      name: "",
      source: "",
      description: "",
      msgmodal: false,
      access : false,
      persona: sessionStorage.getItem('persona'),
      projectid: sessionStorage.getItem('projectid'),
      userid: sessionStorage.getItem('userid'),
    };
    this.handleCostumes = this.handleCostumes.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.checkaccessrights = this.checkaccessrights.bind(this);

  }

  componentDidMount() {
    this.checkaccessrights("Costumes");
    console.log("inside componentDidMount");
    axios.get(Env.host + "/companydb/allroles").then((response) => {
      console.log(response);

      rolesdata = response.data;
    });

    axios.get(Env.host + "/companydb/allprojects").then((response) => {
      console.log(response);

      projectsdata = response.data;
    });

    this.getcostumes();
  }

  checkaccessrights = async(value) =>
{
if(this.state.persona == "admin")
{
  this.setState({
    access:true
  })
}
else{
  const data = {
    projectid :this.state.projectid,
    accessright : value,
    userid : this.state.userid
  }
  await axios
.post(
  Env.host + "/accessright/user/",data
)
.then((response) => {
  console.log("is it true",response.data);
if(response.data)
{
this.setState({
  access:true
})
}
else{
  this.setState({
    access:false
  })
}
  
});
}
}

  onChangePage(pageOfItems) {
    // update local state with new page of items
    this.setState({ pageOfItems });
  }

  SubmitCostumes = () => {
    const data = {
      name: this.state.name,
      source: this.state.source,
      description: this.state.description,
    };
    console.log(data);
    axios
      .post(Env.host + "/companydb/submitnewcostume", data)
      .then((response) => {
        console.log(response);
        this.getcostumes();
      });

    this.setState({
      showmodal: false,
    });
  };

  handlenamechange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  handlesourcechange = (e) => {
    this.setState({
      source: e.target.value,
    });
  };

  handledescriptionchange = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  handleclosemodal = () => {
    this.setState({
      show: false,
    });
  };

  deleteCompanyCostume = (userdetails) => {
    console.log("in dleete", userdetails);

    const data = {
      costumeid: userdetails,
    };
    axios.post(Env.host + "/companydb/deletecostume", data).then((response) => {
      console.log(response);
    });

    this.getcostumes();
  };

  handleModelClose = () => {
    this.setState({
      showmodal: false,
    });
  };

  getcostumes = () => {
    axios.get(Env.host + "/companydb/allcostumes").then((response) => {
      console.log(response);

      this.setState({
        costumedetails: response.data,
      });
    });
  };

  showCostumeModal = () => {
    this.setState({
      showmodal: true,
    });
  };

  handleCostumes = () => {
    this.getcostumes();
  };

  render() {
    let displaydetails = null;
    let costumemodal = null;

    costumemodal = (
      <Modal show={this.state.showmodal} onHide={this.handleprojectclose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Costumes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Costume Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Costume Name"
              name="name"
              // onKeyDown={this.onKeyUp}
              onChange={this.handlenamechange}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Costume Source</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Costume Source"
              name="source"
              // onKeyDown={this.onKeyUp}
              onChange={this.handlesourcechange}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Costume Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Costume Description"
              name="description"
              // onKeyDown={this.onKeyUp}
              onChange={this.handledescriptionchange}
            />
          </Form.Group>
          {/* Enter Role: <TextField>Enter Role</TextField> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleModelClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.SubmitCostumes}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );

    console.log(this.state.formdetails);
    const formdetails = this.state.pageOfItems.map((userdetails) => {
      return (
        <TableBody>
          <TableRow>
            <StyledTableCell> {userdetails.costumename}</StyledTableCell>
            <StyledTableCell> {userdetails.source}</StyledTableCell>
            <StyledTableCell> {userdetails.description}</StyledTableCell>
            <StyledTableCell>
              <Link
                onClick={(e) =>
                  this.deleteCompanyCostume(userdetails.costumeid)
                }
              >
                <Tooltip
                  title="Delete Company Costume"
                  classes={{ tooltip: classes.customWidth }}
                  placement="right"
                  arrow
                >
                  <span
                    className="glyphicon glyphicon-trash"
                    style={{ color: "black" }}
                  ></span>
                </Tooltip>
              </Link>

              <Link align="center" onClick={(e) =>
                  this.deleteCompanyCostume(userdetails.costumeid)
                }>
            <ListItem button key="Groups">
              <ListItemIcon>
                <DeleteIcon />{" "}
              </ListItemIcon>
              <ListItemText primary="" />
            </ListItem>
          </Link>


              <br></br>
            </StyledTableCell>
          </TableRow>
        </TableBody>
      );
    });
    displaydetails = (
      <div>
        <div class="paddingleft15">
        <div className="form-group">
        <div className="">
        <div className="form-group d-flex justify-content-between">
        <h2>Costumes</h2>
{this.state.access == true ? 
         <Button type="button" variant="outlined" color="primary"
                
                  onClick={this.showCostumeModal}
                >
                 Add New Costume
                </Button> : ""}
              </div>
              </div>
              <br></br>
              <TableContainer component={Paper}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell> Name</StyledTableCell>
                      <StyledTableCell>Source</StyledTableCell>
                      <StyledTableCell>Description</StyledTableCell>
                      <StyledTableCell>Delete Costume</StyledTableCell>
                    </TableRow>
                  </TableHead>

                  {formdetails}
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
    
    );
    return (
      <div>

        <div id="textdisplay" class="tabcontent">
          {displaydetails}
          <div align="center">
            <JwPagination
              items={this.state.costumedetails}
              onChangePage={this.onChangePage}
              styles={customStyles}
            />
          </div>
          {costumemodal}
        </div>
      </div>
    );
  }
}

export default CompanyDB;
