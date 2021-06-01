import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom'
import {Helper, Url, Global, Api} from '../config';
import {ProductAttributes, ProductCategory, ProductList, ProductVariations} from '../Admincomponent';

class ProductsComponent extends Component {
    constructor(props) {
        super(props);
    }

    __reload_internal_table_onapi = (act_tab) =>{
        this.props.load_particular_tab(act_tab);
    }

    render() {
console.log(this.props.admin_product_list)
        return (
            <React.Fragment>
                {(this.props.active_tab == "product_attributes" && this.props.admin_product_attribute != '') && <ProductAttributes 
                reload_internal_table_onapi={this
                    .__reload_internal_table_onapi
                    .bind(this)}
                    reload_product_tables={this.props.reload_product_tables}
                    admin_product_attribute={this.props.admin_product_attribute}/>}
                {(this.props.active_tab == "product_category" && this.props.admin_product_category != '') && <ProductCategory  reload_internal_table_onapi={this
                    .__reload_internal_table_onapi
                    .bind(this)}  admin_product_category={this.props.admin_product_category} history={this.props.history}/>}
                {(this.props.active_tab == "product_list" && this.props.admin_product_list != '') && <ProductList   reload_internal_table_onapi={this
                    .__reload_internal_table_onapi
                    .bind(this)} admin_product_list={this.props.admin_product_list}  history={this.props.history}/>}
                {(this.props.active_tab == "product_variations" && this.props.admin_product_variations != '') && <ProductVariations admin_product_variations={this.props.admin_product_variations}  reload_internal_table_onapi={this
                    .__reload_internal_table_onapi
                    .bind(this)} history={this.props.history}/>}
            </React.Fragment>
        );
    }
}

export default ProductsComponent;
