import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Helper } from "../config";
import { SingleProduct } from "../Pagecomponent";
import InfiniteScroll from "react-infinite-scroll-component";

class VendorListComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    window.scrollTo(0, 0);
  };

  render() {
    console.log(this.props.vendorList);
    return (
      <section id="productListWrapper" className="rowTopMargin mobiletop">
        <div className="container">
          <div className="row productListInner">
            {this.props.vendorList.map((vendor, index) => (
              <div key={index} className="col-md-3 col-sm-4">
                <div className="productItemList vendor_main_max">
                  <div className="productImageWrap">
                    <img
                      key={index}
                      src={vendor.profile_picture}
                      alt="Cake"
                    ></img>
                  </div>

                  <div className="productListInnerContentWrap vendor_mar ">
                    <p className="productName v_m">
                      <strong>{vendor.name}</strong><br></br>
                      <strong className="vendor_margin_break">{vendor.phone}</strong><br></br>
                      <strong className="vendor_margin_break">{vendor.email}</strong>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
}
export default VendorListComponent;
