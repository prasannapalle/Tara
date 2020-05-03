import React from "react";
import axios from 'axios';
import { Component } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '../App.css';
import Env from "../helpers/Env";

class Mycalender extends Component {
    constructor(props) {
     super(props);

    const { match: { params } } = this.props
    const data = {
        id: params.id
    }

        this.state =
        {
            events: "",
            projectid:data.id
        }
    }

componentDidMount() {

    const { match: { params } } = this.props
    const data = {
        id: params.id
    }
    console.log(data.id)
    console.log(this.state.projectid)
    axios.get(Env.host +"/project-overview/getevents_fromproject/"+data.id).then((response) => {
      console.log(response);
        this.setState({
           events: response.data,
       });
    });
        
    }
  
    eventdateChangeHandler(e) {
        this.setState({ eventdate: e.target.value });
    }
    eventnameChangeHandler(e) {
        this.setState({ eventname: e.target.value });
    }
   

 

    render() {
        
         
        console.log(this.state.events)
        return (
            <div>
                <div class="col-md-3"></div>
                <div class="col-md-6" style={{"marginTop":"80px"}}>

                    <FullCalendar defaultView="dayGridMonth" plugins={[dayGridPlugin]} 
                        events={this.state.events} />
                </div>
             
                
            </div>

        );
    }

}



export default Mycalender;