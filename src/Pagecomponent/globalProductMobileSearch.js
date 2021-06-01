import React from 'react';
import {Link, NavLink} from 'react-router-dom'
import $ from 'jquery';
import {Helper, Url, Global, Api} from '../config';

class GlobalProductMobileSearch extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            price: '',
            type: '',
            order: '',
            price_show: '',
        };

    }

    componentDidMount = () => {
        let price = '';
        let local_price = Global
            .global_product_search_values_obj
            .price
            .split(',');
        if (local_price == '') {
            price = "Select price";
        } else {
            price = local_price[0] + " to " + local_price[1]
        }
        this.setState({price_show: price, order: Global.global_product_search_values_obj.order})
    }

    

    allFieldSearch = () => {
       this.props.refreshGlobalProductList();
    }

    price(e) {

        document
            .querySelector('#clickit')
            .click();
        console.log(document.getElementsByClassName('irs-from')[0].innerHTML);
        let local_price = parseInt(document.getElementsByClassName('irs-from')[0].innerHTML.replace(" ", "")) + ',' + parseInt(document.getElementsByClassName('irs-to')[0].innerHTML.replace(" ", ""));

        this.setState({
            price_show: parseInt(document.getElementsByClassName('irs-from')[0].innerHTML.replace(" ", "")) + ' to ' + parseInt(document.getElementsByClassName('irs-to')[0].innerHTML.replace(" ", ""))
        })
        Global.global_product_search_values_obj.price = local_price;
        this.setState({price: local_price});
        this.allFieldSearch();
    }

    order = (e) => {
        Global.global_product_search_values_obj.order = e;
        this.setState({order: e});
    }

    clear_all_searchParameters = () => {
        $('input[type="radio"]').each(function () {
            $(this).prop('checked', false);
        });
        Global.header_search_text_val="";
        Global.global_product_search_values_obj.price="";
        Global.global_product_search_values_obj.order="";

        this.allFieldSearch();
    }

    render() {
        const divStyle = {
            display: 'none'
        };

        return (

            <React.Fragment key={"------------MOBILE_SEARCH_FILTER-------------------"}>
                <div id="filterOverlay" className="filterOverlay" style={divStyle}></div>
                <div id="filterMobileWrapper" className="filterMobileWrapper" style={divStyle}>
                    <div className="filterTabWrap clearfix">
                        <Link to="#" className="filterTab filterBoxTab activeFilterTab">Filter</Link>
                        <Link to="#" className="sortTab filterBoxTab">Sort By</Link>
                    </div>
                    <div className="filterBoxContentWrap">
                        <div className="filterBoxfilterContainer" id="filterBoxWrapper">
                            <div className="filterCatWrap">
                                <label className="search_bolder">Price</label>
                                <div className="typeBoxPriceListWrap">

                                    <div className="range-slider">
                                        <input type="range" className="js-range-slider"/>
                                    </div>
                                    <div className="filterapplyBtnWrap"></div>

                                </div>
                            </div>

                        </div>
                        <div className="filterBoxSortContainer" id="sortbyBoxWrapper">
                            <div className="filterCatWrap">
                                <label className="search_bolder">Sort by :</label>
                                <div className="typeBoxFilterListWrap">
                                    <div className="typeList">

                                        <div className="typeList">

                                            <label>
                                                <span className="container_label marginoff_paymnt">
                                                    <input
                                                        name="gender"
                                                        onClick={this
                                                        .order
                                                        .bind(this, "low-high")}
                                                        type="radio"
                                                        value=""/>
                                                    <span className="checkmark"></span>
                                                </span>
                                                <span className="seacrh_inte_text">Price: Low to High</span>
                                            </label>

                                        </div>
                                        <div className="typeList">

                                            <label>
                                                <span className="container_label marginoff_paymnt"><input
                                                    name="gender"
                                                    onClick={this
                .order
                .bind(this, "high-low")}
                                                    type="radio"
                                                    value=""/>
                                                    <span className="checkmark"></span>
                                                </span>
                                                <span className="seacrh_inte_text">Prie: High to Low</span>
                                            </label>

                                        </div>

                                        <label>
                                            <span className="container_label marginoff_paymnt"><input
                                                name="gender"
                                                onClick={this
                .order
                .bind(this, "popular")}
                                                type="radio"
                                                value=""/>
                                                <span className="checkmark"></span>
                                            </span>
                                            <span className="seacrh_inte_text">Popularity</span>
                                        </label>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="filterBoxBtnWrap">
                        <Link
                            to="#"
                            onClick={this
                            .clear_all_searchParameters
                            .bind(this)}
                            className="filterBoxActionBtn filterBoxApply">Clear All</Link>
                        <Link
                            to="#"
                            id="clickit"
                            onClick={this
                            .price
                            .bind(this)}
                            className="filterBoxActionBtn filterBoxApply">Apply Now</Link>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default GlobalProductMobileSearch
