import React, {Component} from 'react';
import {Helper, Url, Global, Api} from '../config';
import {AdminHeader, SideBar, AdminFooter, ProductsComponent, TopMenuComponent, BannerWidgetComponent, TileWidgetComponent} from '../Admincomponent';


export default class Widgets extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            admin_user_name: '',
            active_tab: '',
            top_menu: '',
            banners: '',
            tiles: '',
            loader: false,
            menuList: [],
            mobileBannerList: [],
            webBannerList: [],

        }
    }

    componentDidMount = () => {
        this.admin_assign_common_variables();
        Helper.project_script_css_manager("admin");
        this.__toggle_internal_tabs("top_menu");
    }

    admin_assign_common_variables = () => {
        this.setState({
            admin_user_name: window
                .localStorage
                .getItem("ADMIN_LOGGED_USER")
        });
    }

    __load_particular_tab = (active_tab) => {
        if (active_tab == "top_menu") {
            //this.fetch_top_menu();
            return(<TopMenuComponent
                        menulist={this.state.menuList}
                        history={this.props.history}
                    />)
        }

        if (active_tab == "banners") {
            //this.fetch_product_category();
            return(<BannerWidgetComponent
                menulist={this.state.menuList}
                webBannerList={this.state.webBannerList}
                mobileBannerList={this.state.mobileBannerList}
                history={this.props.history}
            />)
        }

        if (active_tab == "tiles") {
            //this.fetch_product_list();
            return(<TileWidgetComponent
                menulist={this.state.menuList}
                history={this.props.history}
            />)
        }

    }

    fetch_top_menu = () => {
        this.setState({loader: true})
        let api = Url.topMenu;
        Api.fetch_top_menus(api).then((res) => {
            this.setState({loader: false})
            let response = JSON.parse(res);
            let data = response.response;
            if (data.status){
                this.setState({menuList: data.data});
                console.log("MenusList", this.state.menuList);
            }
          });
    }

    __toggle_internal_tabs = (internal_tab_name) => {
        console.log("------------------")
        this.setState({active_tab: internal_tab_name});
        this.__load_particular_tab(internal_tab_name);
    }

    get_banners = () => {
        this.setState({loader: true});
        
        let api = Url.admin_banners;
        Api.get_banners(api).then((res) => {
            this.setState({loader: false})
            let response = JSON.parse(res);
            let data = response.response;
            if (data.status){
                //this.fetch_top_menu()
            console.log("Status: ", data.data.desktop);
                this.setState({webBannerList: data.data.desktop, mobileBannerList: data.data.mobile, loader:false});
                
            }else {
                this.setState({loader:false});
                alert("Status: ", data.status);
            }
          });
    }

    render(){
        return(
            <React.Fragment>
                <div className="hold-transition sidebar-mini layout-fixed">
                    <div className="wrapper">
                        <AdminHeader history={this.props.history}/>
                        <SideBar
                            toggle_internal_tabs={this
                            .__toggle_internal_tabs
                            .bind(this)}
                            headerTitle="widgets"
                            history={this.props.history}
                            admin_user_name={this.state.admin_user_name}/>
                            <div className="content-wrapper">
                                
                                {/* <TopMenuComponent
                                    menulist={this.state.menuList}
                                /> */}

                                {this.__load_particular_tab(this.state.active_tab)}
                            </div>
                            <AdminFooter history={this.props.history}/>
                        <aside className="control-sidebar control-sidebar-dark"></aside>

                    </div>
                </div>
            </React.Fragment>
        );
    }
}