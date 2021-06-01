import React, {Component} from 'react';
import {Helper, Url, Global, Api} from '../config';
import {AdminHeader, SideBar, AdminFooter, TransactionsComponent, TransactionDetailsComponent} from '../Admincomponent';

class Transactions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin_user_name: '',
            transactions_list: '',
            transaction_full_details: ''
        }

    }
    admin_assign_common_variables = () => {
        this.setState({
            admin_user_name: window
                .localStorage
                .getItem("ADMIN_LOGGED_USER")
        });
    }
    componentDidMount = () => {
        this.admin_assign_common_variables();
        Helper.project_script_css_manager("admin");
        this.fetch_transaction_list();
        this.setState({show_transaction_details: false});
    }

    fetch_transaction_list = () => {
        let api = Url.customer_transactions;
        Api
            .fetch_customer_ltransactions(api)
            .then(res => {
                let response = JSON.parse(res);
                let data = response.response;
                console.log(data);
                if (data.status === 200) {
                    this.setState({transactions_list: data.transactions})
                }
            });
    }

    __load_transaction_full_details = (transaction) => {

        let api = Url.customer_transactions_details + '/' + transaction.id;
        Api
            .customer_transactions_details(api)
            .then(res => {
                let response = JSON.parse(res);
                let data = response.response
                console.log(data);
                if (data.status == 200) {
                    this.setState({show_transaction_details: true, transaction_full_details: data.transaction});
                }
            });
    }

    __open_transaction_details = () => {
        this.setState({show_transaction_details: false});
    }

    render() {
        return (
            <React.Fragment>
                <div className="hold-transition sidebar-mini layout-fixed">
                    <div className="wrapper">
                        <AdminHeader history={this.props.history}/>
                        <SideBar
                            headerTitle="transactions"
                            history={this.props.history}
                            admin_user_name={this.state.admin_user_name}/>
                        <div className="content-wrapper">
                            {this.state.show_transaction_details == true && <TransactionDetailsComponent
                                open_transaction_details={this
                                .__open_transaction_details
                                .bind(this)}
                                transaction_full_details={this.state.transaction_full_details}/>}{(this.state.transactions_list != '' && this.state.show_transaction_details == false) && <TransactionsComponent
                                load_transaction_full_details={this
                                .__load_transaction_full_details
                                .bind(this)}
                                history={this.props.history}
                                transactions_list={this.state.transactions_list}/>} {this.state.transactions_list == '' && <div id="loader"></div>}</div>
                        <AdminFooter history={this.props.history}/>
                        <aside className="control-sidebar control-sidebar-dark"></aside>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Transactions;
