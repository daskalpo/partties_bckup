
import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function DatePickerComponent(){
    const [selectedDate, setSelectedDate] = useState(new Date())

    const ClickableInput = ({onChange, placeholder, value, isSecure, id, onClick}) => (
  
        <input
          // style={{backgroundColor:"transparent", border:"none"}}
          onChange={onChange}
          placeholder={placeholder}
          value={value}
          isSecure={isSecure}
          id={id}
          // onClick={onClick}
          //disabled={true}
        />
      );


    openDatepicker = () => this._calendar.setOpen(true);

    return (
        <div className="CustomDatePicker">
            <DatePicker
                wrapperClassName="datepicker_input"
                selected={this.state.startDate}
                minDate={this.state.minimum_delivery_time}
                //maxDate={this.state.maximum_delivery_time}
                
                customInput={<ClickableInput
                    placeholder="Enter Date and Time"
                />}
                onChange={date=> this.setStartDate(date)}
                ref={(c) => this._calendar = c} />
        </div>
    )
}

export default DatePickerComponent;