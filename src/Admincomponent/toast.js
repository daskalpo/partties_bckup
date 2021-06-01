import React from 'react'
import {Link} from 'react-router-dom';
import {Helper, Url, Global, Api} from '../config';

class Toast extends React.Component {
    componentDidMount = () => {
        Helper.loadScript("admin");
    }

    render() {
        return (
            <React.Fragment>
                <span className="hidden mamu" id="for_success"/>
                <span className="hidden" id="for_fail"/>
            </React.Fragment>
        );
    }
}
export default Toast
