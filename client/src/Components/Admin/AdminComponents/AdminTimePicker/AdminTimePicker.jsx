import React, {Component} from 'react';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
class AdminTimePicker extends Component {
    getTime = (time) => {
        this.props.getTime(time)
    }
    render() {
        return (
            <div >
                <label>{this.props.label}</label>
                <TimePicker  showSecond={false}  style={{ width: 100 }} onChange = {this.getTime}/>
            </div>
        ) 
    }

}

export default AdminTimePicker;