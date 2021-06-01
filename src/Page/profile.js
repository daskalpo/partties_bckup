import React, {Component} from 'react';
import {
    Header,
    OffersAndUpdates,
    Footer,
    LoginSignUpModal,
    ProfileComponent,
    Alert
} from '../Pagecomponent';
import {Api, Url, Helper, Global} from '../config';

class Profile extends Component {
    constructor(props) {

        super(props);
        this.state = {
            header_search_text_val: '',
            logged_in_user: '',
            user_profile_data: '',
            loaderStatus: false,
            wish_list_total_count: window
                .localStorage
                .getItem("WISHLIST_VALUE"),
            cart_total_items_count: window
                .localStorage
                .getItem("cart_total_items") == null
                ? 0
                : window
                    .localStorage
                    .getItem("cart_total_items")
        };
    }
    assignCommonVariables = () => {
        this.setState({
            header_search_text_val: '',
            logged_in_user: window
                .localStorage
                .getItem('LOGGEDUSER')
        })
        Helper.hide_show_cart_bubble_inzero();
        Helper.hide_show_cart_wishlist_inzero();
    }

    __header = (searchText) => {
        Global.header_search_text_val = searchText;
        this.setState({header_search_text_val: searchText})

    }
    __user = (user) => {
        this.setState({logged_in_user: user})

    }
    componentDidMount = () => {
        window.scrollTo(0, 0);
        this.assignCommonVariables();
        this.manage_user_profile_details_data();
    }

    update_user = (data) => {

        window
            .localStorage
            .setItem('LOGGEDUSER', data.name);
        this.setState({logged_in_user: data.name});
    }
    __apibased_user_profile_details_data_update = (data, type) => {
        console.log(data)
        if (type == "address") {
            let local_user_profile_data = this.state.user_profile_data;
            local_user_profile_data.address = data;
            this.setState({user_profile_data: local_user_profile_data});
        }

        if (type == "profile") {
            let local_user_profile_data = this.state.user_profile_data;
            local_user_profile_data.user = data;
            this.setState({user_profile_data: local_user_profile_data});
            this.update_user(data);
        }
    }

    manage_user_profile_details_data = () => {
        this.setState({loaderStatus: true});
        let api = Url.user_profile;
        Api
            .user_profile_data(api)
            .then(res => {
                let response = JSON.parse(res);
                let data = response.response;
                this.setState({loaderStatus: false});
                if (data.status === 200) {
                    this.setState({user_profile_data: data})
                }
            });
    }

    render() {

        return (
            <React.Fragment>
               <LoginSignUpModal
                    Title="Profile"
                    history={this.props.history}
                    user={this
                    .__user
                    .bind(this)}/>
                <Header
                    wish_list_total_count={this.state.wish_list_total_count}
                    cart_total_items_count={this.state.cart_total_items_count}
                    User={this.state.logged_in_user}
                    headerTitle="Profile"
                    history={this.props.history}
                    header_search_text_val={this.state.header_search_text_val}
                    header={this
                    .__header
                    .bind(this)}/>

               
                <main id="main" className="defaultPageWrapper profile_page_wrapper">
                    {this.state.loaderStatus && <div className="loader tops">Loading ...</div>}
                    {this.state.user_profile_data && <ProfileComponent
                        apibased_user_profile_details_data_update={this
                        .__apibased_user_profile_details_data_update
                        .bind(this)}
                        User={this.state.logged_in_user}
                        user_profile_data={this.state.user_profile_data}
                        history={this.props.history}/>}
                    <OffersAndUpdates history={this.props.history}/>
                    <Footer  history={this.props.history}/>
                </main>

            </React.Fragment>

        );

    }
}

export default Profile;
