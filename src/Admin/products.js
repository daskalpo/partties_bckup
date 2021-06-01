import React, {Component} from 'react';
import {Helper, Url, Global, Api} from '../config';
import {AdminHeader, SideBar, AdminFooter, ProductsComponent} from '../Admincomponent';

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin_user_name: '',
            active_tab: '',
            admin_product_attribute: '',
            admin_product_category: '',
            admin_product_list: '',
            admin_product_variations: '',
            loader: false
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
        this.__toggle_internal_tabs("product_attributes");
    }
    __load_particular_tab = (active_tab) => {
        if (active_tab == "product_attributes") {
            this.fetch_product_attribute();
        }

        if (active_tab == "product_category") {
            this.fetch_product_category();
        }

        if (active_tab == "product_list") {
            this.fetch_product_list();
        }

        if (active_tab == "product_variations") {
            this.fetch_product_variations();
        }
    }

    fetch_product_attribute = () => {
        this.setState({loader: true})
        let api = Url.admin_product_attributes_list;
        Api
            .fetch_product_attributes_list(api)
            .then(res => {
                this.setState({loader: false})
                let data = JSON.parse(res);
                if (data.code == "200") {
                    this.setState({admin_product_attribute: data.data})
                    console.log(data.data);
                }
            });
    }

    fetch_product_category = () => {
        this.setState({loader: true})
        let api = Url.admin_product_categories_list;
        Api
            .fetch_product_category_list(api)
            .then(res => {
                this.setState({loader: false})
                let data = JSON.parse(res);
                if (data.code == "200") {
                    console.log(data.data);
                    this.setState({admin_product_category: data.data})
                    console.log(data.data);
                }
            });
    }

    fetch_product_list = () => {
        this.setState({loader: true})
        let api = Url.admin_product_lists_list;
        Api
            .fetch_product_lists_list(api)
            .then(res => {
                this.setState({loader: false})
                let data = JSON.parse(res);
                if (data.code == "200") {
                    console.log('Catch Admin : ', data)
                    // data.data.map(prod=> {
                    //     prod.image.map(img=> {
                            
                    //     })
                    // })
                    this.setState({admin_product_list: data.data})
                }
            });
    }

    fetch_product_variations = () => {
        this.setState({loader: true})
        let api = Url.admin_product_varitions_list;
        Api
            .fetch_product_variations_list(api)
            .then(res => {
                this.setState({loader: false})
                let data = JSON.parse(res);
                if (data.code == "200") {
                    this.setState({admin_product_variations: data.data})
                }
            });
    }

    __toggle_internal_tabs = (internal_tab_name) => {
        this.setState({active_tab: internal_tab_name});
        this.__load_particular_tab(internal_tab_name);
    }

    render() {
        return (
            <React.Fragment>
                <div className="hold-transition sidebar-mini layout-fixed">
                    <div className="wrapper">
                        <AdminHeader history={this.props.history}/>
                        <SideBar
                            toggle_internal_tabs={this
                            .__toggle_internal_tabs
                            .bind(this)}
                            headerTitle="products"
                            history={this.props.history}
                            admin_user_name={this.state.admin_user_name}/>
                        <div className="content-wrapper">
                            {this.state.admin_product_attribute != '' && <ProductsComponent
                                load_particular_tab={this
                                .__load_particular_tab
                                .bind(this)}
                                admin_product_category={this.state.admin_product_category}
                                admin_product_list={this.state.admin_product_list}
                                admin_product_variations={this.state.admin_product_variations}
                                admin_product_attribute={this.state.admin_product_attribute}
                                active_tab={this.state.active_tab}
                                history={this.props.history}
                                customer_list={this.state.customer_list}/>}{this.state.loader && <div id="loader"></div>}
                        </div>
                        <AdminFooter history={this.props.history}/>
                        <aside className="control-sidebar control-sidebar-dark"></aside>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Products;
