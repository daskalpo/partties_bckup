import React from 'react';

class Blank extends React.Component {

    render() {
        console.log(this.props)
        return (
            <React.Fragment>

                <section id="productListWrapper" className="rowTopMargin">
                    <div className="container_blank">
                        {(this.props.headerTitle == "ProductDetails" || this.props.headerTitle == "Payment") && <div className="loader tops paddtopi">Loading ...</div>}
                        {this.props.headerTitle == "Cart" && <div className="loader">Loading ...</div>}
                    </div>
                </section>

            </React.Fragment>
        );
    }
}
export default Blank
