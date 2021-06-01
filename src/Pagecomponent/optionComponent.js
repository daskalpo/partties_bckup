import React from 'react';
import {Global} from '../config';

class OptionComponent extends React.Component {

    constructor(props) {
        super(props);

    }
    attrbitues = (data) => {

        this
            .props
            .store_checked_attributes(data, !this.props.prod.isChecked)
    }

    render() {

        return (

            <React.Fragment>
                <div className="typeList">
                    <label>

                        <span className="container_label marginoff_paymnt">
                            <input
                                checked={this.props.prod.isChecked}
                                type="checkbox"
                                onChange={this
                                .attrbitues
                                .bind(this, this.props.prod)}
                                value={this.props.prod.isChecked}/>
                            <span className="checkmark"></span>
                        </span>

                        <text className="seacrh_inte_text">{this.props.prod.name}</text>
                    </label>
                </div>
            </React.Fragment>
        );
    }
}
export default OptionComponent
