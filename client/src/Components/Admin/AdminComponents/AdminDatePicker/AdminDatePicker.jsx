import React, {Component} from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import Datetime from 'react-datetime';
import '../AdminDatePicker/AdminDatePicker.css';

class AdminDatePicker extends Component {
    state = {
        validDate:true,        
    }
    onChange = (date) => {
        let validDate = moment(date).format('D MMMM YYYY, H : mm');
        validDate!='Invalid date' && validDate.split(',')[1] != ' 0 : 00' ? 
            this.setState({validDate:true}, () => { this.props.onSelectDate(date)}):
            this.setState({validDate:false}); 
    };
    validation = (current) => {
       let yesterday = Datetime.moment().subtract(1, 'day');
       return current.isAfter( yesterday );
    };
    render() {
        return (
            <div>
                <label>{this.props.label}</label>
                <Datetime 
                    value = {this.props.dateFormat ? moment(this.props.date).format('D MMMM YYYY, H : mm') : moment(this.props.date). format('H : mm')}
                    onChange = {this.onChange} 
                    isValidDate = {this.validation}
                    dateFormat={this.props.dateFormat ? 'D MMMM YYYY,' : false}
                    timeFormat = 'H : mm'
                />
                <div> 
                    {!this.state.validDate ? <span>Неправильно введена дата</span> : null}
                </div>
            </div>
        ) 
    }
}

export default AdminDatePicker;
