import React from 'react';
import {HomeSingleProduct} from '../Pagecomponent';
import {Helper} from '../config';

class HomeCorouselProduct extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount = () => {};

    render() {
     
        const redirect = this.props.history;
        
        var TopgiftCard = this
            .props
            .val
            .map(function (img) {
                return (<HomeSingleProduct key={img.id} productInDetails={img} history={redirect}/>);
            })

        return (
            <div>

                <main id="main">

                    <section id="topGift" className="rowTopMargin">
                        <div className="container">
                            <div className="section-header">
                                <h2>{this.props.title}</h2>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="newProductWrapper" id="NewProduct">
                                        <ul className="productCarouselWrap topGiftItemsCarousel owl-carousel clearfix">
                                            {TopgiftCard}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        );
    }
}
export default HomeCorouselProduct
