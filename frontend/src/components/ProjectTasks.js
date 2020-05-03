import React from "react";
import axios from "axios";
import { withStyles, makeStyles } from "@material-ui/core/styles";
// import Modal from 'react-bootstrap/Modal';
import { Button, Modal } from 'react-bootstrap';
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
import { Edit } from '@material-ui/icons';
import { Delete } from '@material-ui/icons';




const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 14,
  },




  body: {
    fontSize: 14,
  },
}))(TableCell);


const classes = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 600
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300
  }
}));
var eventsdata = [];

class ProjectTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: sessionStorage.getItem('role'),
      projectid: "",
      eventcheck: true,
      usercheck: false,
      name: "",
      date: "",
      description: "",
      eventlist: [],
      userdetails: [],
      addeventshow: false,
      show: false,
      projectshow: false,
      userval: [],
      access: false,
      edit: false,
      enableaddproject: false,
      checkedItems: new Map(),
      projects: [],
      taskid: ""

    };
    this.handleUsers = this.handleUsers.bind(this);
    this.getevents = this.getevents.bind(this);
    this.getusers = this.getusers.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleprojectclose = this.handleprojectclose.bind(this);
    this.handleprojects = this.handleprojects.bind(this);
    this.handleprojectclosemodal = this.handleprojectclosemodal.bind(this);
    this.handleaddeventclose = this.handleaddeventclose.bind(this);
    this.handleaddeventclosemodal = this.handleaddeventclosemodal.bind(this);
    this.handleaddEvents = this.handleaddEvents.bind(this)
    this.handleedit = this.handleedit.bind(this)


  }

  componentDidMount(props) {

    const { match: { params } } = this.props
    const data = {
      id: params.id
    }

    axios.get(Env.host + "/project-overview/gettasks_fromproject/" + data.id).then((response) => {
      eventsdata = response.data;
      console.log(eventsdata)
    })
    this.setState({
      projectid: data.id
    })

    if (sessionStorage.getItem('persona') !== "admin") {
      let userid = sessionStorage.getItem('id');
      const data = {
        usergroup: "create task"
      }
      axios.get(Env.host + "/accessright/user/" + userid, data).then((response) => {
        this.setState({
          access: response.data
        })
        this.getevents();
      })
    }
    else {
      this.setState({
        access: true
      })

    }



    this.getevents();

  }


  handleprojectclosemodal = () => {
    this.setState({
      projectshow: false
    })
  }
  handleaddeventclosemodal = () => {
    this.setState({
      addeventshow: false
    })
  }
  handleeditclosemodal = () => {
    this.setState({
      edit: false
    })
  }

  handleprojectclose = () => {
    this.setState({
      projectshow: false
    })

    var temp = [];
    this.state.checkedItems.forEach(logMapElements)
    function logMapElements(value, key, map) {
      console.log(key, value)
      if (value) {
        temp.push(key);
      }

    }
    const data = {

      userids: temp,
      projectid: this.state.projects[0].taskid

    }
    console.log("in checked items", data)
    Object.entries(this.state.checkedItems).map(([key, value]) => {
      console.log(key);
    })
    axios.post(Env.host + "/project-overview/assigntotasks", data).then((response) => {
      console.log("dta in asign project", data);
    });

  }
  handleeditclose = () => {
    this.setState({
      edit: false
    })
    const data = {
      name: this.state.name,
      date: this.state.date,
      description: this.state.description,

    }
    axios.post(Env.host + "/calender/task/" + this.state.taskid, data).then((response) => {
      this.getevents();
      this.setState({
        name: "",
        date: "",
        description: "",
      })


    });

  }
  handleaddeventclose = () => {

    const data = {
      name: this.state.name,
      date: this.state.date,
      description: this.state.description,
      projectid: this.state.projectid,
    }


    axios.post(Env.host + "/project-overview/posttasks_toproject", data).then((response) => {
      console.log("dta in add event", data);
      this.getevents();
      this.setState({
        addeventshow: false,

      })
      this.getevents();
    });


  }

  handleShow = (e, uservalue) => {
    this.setState({
      show: true
    })
    this.setState({
      userval: uservalue.userid
    })
  }


  getusers = () => {
    const data1 = {
      projectid: this.state.projectid,
    }

    axios.get(Env.host + "/project-overview/getusers_fromproject/" + data1.projectid).then((response) => {
      this.setState({
        userdetails: response.data
      })

    });
  };
  getevents = () => {
    const { match: { params } } = this.props
    const data = {
      id: params.id
    }
    axios.get(Env.host + "/project-overview/gettasks_fromproject/" + data.id).then((response) => {
      console.log(response);
      this.setState({
        eventlist: response.data,
      });
    });
  };


  handleUsers = () => {
    this.setState({
      usercheck: !this.state.usercheck,
      eventcheck: false,
    });
    this.getusers();
  };
  handleEvents = () => {
    this.setState({
      usercheck: false,
      eventcheck: !this.state.eventcheck,
    });
    this.getevents();
  };

  handleprojects = (event, values, props) => {
    console.log("in handle on change roles");

    this.setState({
      projects: values
    }, () => {
    });
    console.log(this.state.projects)
  }


  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    });
    console.log("showpopup in togglepopup", this.state.showPopup)
  }

  handleChange = (e) => {
    const item = e.target.name;
    const isChecked = e.target.checked;
    console.log("the name is", item);
    console.log("if checked", isChecked);
    this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
    console.log("checked items are", this.state.checkedItems);
    this.setState({
      enableaddproject: true
    })
  }


  AssignEvent = (e) => {

    this.setState({
      projectshow: true
    })
  }
  handleaddEvents = (e) => {


    this.setState({
      addeventshow: true
    })

  }
  handledelete = (id) => {

    console.log("delete")
    console.log(id)

    axios.post(Env.host + "/calender/deletetask/" + id).then((response) => {
      this.getevents();
    })



  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleedit = (id) => {
    console.log("edit")

    this.setState({
      edit: !this.state.edit,
      taskid: id

    })
  }
  render() {
    let details = null;
    let displaydetails = null;
    let projectmodel = null;
    let addeventbutton;
    let editform = null;
    if (this.state.edit) {
      editform = (<Modal show={this.state.edit} onHide={this.handleeditclose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <label for="name">Name:</label>
            <input type="text" name="name" id="nam" value={this.state.name} onChange={this.onChange} class="form-control" required />
            <br></br>

            <br></br><label for="date">  Date</label>
            <input type="date" name="date" id="date" value={this.state.date} onChange={this.onChange} class="form-control" required />

            <br></br><label for="description"> description</label>
            <input type="text" name="description" id="description" value={this.state.description} onChange={this.onChange} class="form-control" required />
            <br></br>


          </form>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleeditclosemodal}>
            Close
   </Button>
          <Button variant="primary" onClick={() => this.handleeditclose()}>
            Save Changes
   </Button>
        </Modal.Footer>
      </Modal>


      )
    }



    if (this.state.checkedItems.size > 1) {
      this.state.enableaddproject = true

    }
    if (this.state.usercheck) {
      const formdetails = this.state.userdetails.map((userdetails) => {

        projectmodel = <Modal show={this.state.projectshow} onHide={this.handleprojectclose}>
          <Modal.Header closeButton>
            <Modal.Title>Add User To Tasks</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormControl className={classes.formControl}>
              <Autocomplete
                multiple
                id="tags-standard"
                options={eventsdata}
                getOptionLabel={each => each.name}
                onChange={this.handleprojects}
                renderInput={params => (
                  <TextField size="500"
                    {...params}
                    variant="standard"
                    label="Tasks"
                    placeholder="Enter Tasks"
                    style={{ width: "150px" }}
                  />
                )}
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleprojectclosemodal}>
              Close
     </Button>
            <Button variant="primary" onClick={this.handleprojectclose}>
              Save Changes
     </Button>
          </Modal.Footer>
        </Modal>

        return (
          <TableBody>
            <TableRow>
              <StyledTableCell><Checkbox name={userdetails.userid} checked={this.state.checkedItems.get(userdetails.userid)} onChange={this.handleChange} /></StyledTableCell>
              <StyledTableCell>{userdetails.name}</StyledTableCell>
              <StyledTableCell>{userdetails?.role1}/{userdetails.role2}/{userdetails.role3}/{}</StyledTableCell>
              <StyledTableCell>{userdetails.address}</StyledTableCell>
              <StyledTableCell>{userdetails.phonenumber}</StyledTableCell>
              <StyledTableCell>{userdetails.mail}</StyledTableCell>
            </TableRow>
          </TableBody>
        );
      });

      displaydetails = (
        <div>
          <div class="">
            <div class="form-group row" paddingleft>
              <div class="col-lg-12">
                {" "}
                <h2></h2>
                <TableContainer component={Paper}>
                  <Table aria-label="customized table">
                    <TableHead>
                      <TableRow>

                        <StyledTableCell></StyledTableCell>

                        <StyledTableCell>User Name</StyledTableCell>
                        <StyledTableCell>Roles</StyledTableCell>

                        <StyledTableCell>User address</StyledTableCell>
                        <StyledTableCell>Phone Number</StyledTableCell>
                        <StyledTableCell>Mail Id</StyledTableCell>
                      </TableRow>
                    </TableHead>

                    {formdetails}

                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>
          <div>

            {projectmodel}
          </div>
        </div>
      );
    }


    if (this.state.eventcheck) {
      details = this.state.eventlist.map((event) => {

        return (
<table>
<tr>
<td>
          <div style={{marginLeft: "50px"}} align="center">
          <div className="row" key = {event.event_name}>	
          <div className="well" style ={{height:'250px',width:'100%'}}>
              <h3><div style={{ "margin-top": "10px", "fontSize": "25px" }}><Link to={"/taskdetails/" + event.taskid} style={{ color: "black" }} >{event.name}</Link></div></h3>
                  <h4><div style={{ "margin-top": "10px", "fontSize": "15px" }}><Link to={"/taskdetails/" + event.taskid} style={{ color: "black" }} >{event.description}</Link></div></h4>
                  <div class="col-md-10" style={{ marginright: "0px" }}>
                  {this.state.access == true ? <div>
                    <IconButton align="center" style={{ fontSize: 20 }} onClick={() => this.handleedit(event.taskid)}><Edit />Edit Task</IconButton>
                    </div> : ""}
                </div>
       <div class="col-md-10" style={{ marginright: "0px" }}>
                  {this.state.access == true ? <div>
                    <IconButton style={{ fontSize: 20 }} onClick={() => this.handledelete(event.taskid)}><Delete />Delete Task</IconButton></div> : ""}
                </div>
                 
          </div>
          </div> 
          </div> 
          </td>
          </tr>
                      </table>

      
         
        
           
               
        )
      })




    }

    addeventbutton = (<Modal show={this.state.addeventshow} onHide={this.handleaddeventclose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Task to Project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <label for="name"> Name:</label>
          <input type="text" name="name" id="nam" value={this.state.name} onChange={this.onChange} class="form-control" required />
          <br></br>

          <br></br><label for="date">  Date</label>
          <input type="date" name="date" id="date" value={this.state.date} onChange={this.onChange} class="form-control" required />

          <br></br><label for="description"> description</label>
          <input type="text" name="description" id="description" value={this.state.description} onChange={this.onChange} class="form-control" required />
          <br></br>


        </form>


      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={this.handleaddeventclosemodal}>
          Close
 </Button>
        <Button variant="primary" onClick={this.handleaddeventclose}>
          Save Changes
 </Button>
      </Modal.Footer>
    </Modal>


    )






    return (
      <div align="center">
        <div class="non" style={{ "padding-left": "200px", "margin-top": "30px", "font-size": "40px" }}>
          <button style={{ "font-size": "20px" }}
            class="btn btn-outline-dark mr-1"
            onClick={() => this.handleUsers()}>
            Users
          </button>
          {this.state.access == true ?
            <button disabled={!this.state.enableaddproject}
              class="btn btn-outline-dark mr-1" style={{ "font-size": "20px" }}
              onClick={() => this.AssignEvent()}
            >
              Assign To Task
          </button> : ""}

          <button style={{ "font-size": "20px" }}
            class="btn btn-outline-dark mr-1"
            onClick={() => this.handleEvents()}
          >
            Tasks
          </button>
          {this.state.access == true ?
            <button style={{ "font-size": "20px" }}
              class="btn btn-outline-dark mr-1"
              onClick={() => this.handleaddEvents()}
            >
              Add Task
          </button> : ""}

          {editform}

        </div>


        <div align="center">
             <br></br>
             {displaydetails}
            {details}
            </div>
            {addeventbutton}

            

        {/* <div id="textdisplay" class="tabcontent">
          <div class="col-md-2"></div>
          <div class="col-md-9" style={{ "margin-top": "30px" }} >

            {displaydetails}
            {details}
          </div>

          {addeventbutton}
        </div> */}
      </div>

    );
  }
}



export default ProjectTasks;