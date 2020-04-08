import React from 'react';
import swal from 'sweetalert';
import FullCalendar from 'fullcalendar-reactwrapper';

import "./calendar.css";
import axios from '../../config/axios';

class EventCalender extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
            events: []
        }
    }

    componentDidMount(){
        axios.get("/tasks",{
            headers:{
                "x-auth": localStorage.getItem("authToken")
            }
        })
            .then(response=>{
                const events = response.data.map(task=>{
                    //title,start,end,id,url
                    return {
                        title: task.title,
                        start: task.createdAt,
                        end: task.dueDate 
                    }
                })
                this.setState({events})
            })
            .catch(err=>{
                swal ("Oops", `${err}` ,"error")
            })
    }


    render() {
        return (
            <div className="mt-" style={{height:'75vh'}}>
                <h3 className="page-header text-center">
                    <i className="fa fa-calendar"></i> Calendar
                </h3>
                <hr/>
                <FullCalendar
                    height = 'parent'
                    id = "your-custom-ID"
                    header = {{
                        left: 'prev,next today myCustomButton',
                        center: 'title, start, end',
                        right: 'month,basicWeek,basicDay'
                    }}
                    defaultDate={Date.now()}
                    navLinks= {true} // can click day/week names to navigate views
                    editable= {false}
                    eventLimit= {3} // allow "more" link when too many events
                    events = {this.state.events}
                />
            </div>
        )
    }
}

export default EventCalender