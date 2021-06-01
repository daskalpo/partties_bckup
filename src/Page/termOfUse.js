import React, { Component } from "react";
import { Header, Footer, LoginSignUpModal } from "../Pagecomponent";
import { Link, NavLink } from "react-router-dom";
import { Helper, Url, Global, Api } from "../config";

class TermOfUse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header_search_text_val: "",
      logged_in_user: "",
      wish_list_total_count: window.localStorage.getItem("WISHLIST_VALUE"),
      cart_total_items_count:
        window.localStorage.getItem("cart_total_items") == null
          ? 0
          : window.localStorage.getItem("cart_total_items"),
    };
  }
  assignCommonVariables = () => {
    this.setState({
      header_search_text_val: "",
      logged_in_user: window.localStorage.getItem("LOGGEDUSER"),
    });
    Helper.hide_show_cart_bubble_inzero();
    Helper.hide_show_cart_wishlist_inzero();
    Helper.global_function_for_adding_localcart_to_database_and_counts_manager();
  };

  __header = (searchText) => {
    Global.header_search_text_val = searchText;
    this.setState({ header_search_text_val: searchText });
  };
  __user = (user) => {
    this.setState({ logged_in_user: user });
  };
  componentDidMount = () => {
    window.scrollTo(0, 0);
    this.assignCommonVariables();
  };
  nevigate = (nav) => {
    Helper.clear_global_search_values_onNavigation();
    this.props.history.push("/" + nav);
  };
  render() {
    return (
      <React.Fragment>
        <LoginSignUpModal
          Title="AboutUs"
          history={this.props.history}
          user={this.__user.bind(this)}
        />
        <Header
          wish_list_total_count={this.state.wish_list_total_count}
          cart_total_items_count={this.state.cart_total_items_count}
          User={this.state.logged_in_user}
          headerTitle="AboutUs"
          user={this.__user.bind(this)}
          history={this.props.history}
          header_search_text_val={this.state.header_search_text_val}
          header={this.__header.bind(this)}
        />

        <main id="main" className="defaultPageWrapper">
          <div class="container filterContainer">
            <div class="row">
              <div class="col-md-12 breadcrumbWrapper">
                <ul class="breadcrumb">
                  <li>
                    <Link onClick={this.nevigate.bind(this, "home")}>Home</Link>
                  </li>
                  <li>Term Of Use</li>
                </ul>
              </div>
            </div>
          </div>
          <section id="productListWrapper" className="rowTopMargin">
            <div className="web_content_about_us">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div>
                      <div className="mycart_details">
                        <div className="mycart_header header_prflpage">
                          <div className="col-md-12">
                            <p>Term Of Use</p>
                          </div>
                        </div>
                        <div className="tabcontent_profile">
                          <p className="company_infotxt">
                            <p>
                              <span>
                                This website is uploaded by following all the
                                provisions of use and operations under terms of
                                Information Technology Act, 2000 and rules
                                thereunder, as applicable from time to time.
                                This present instrument is an electronic-records
                                in compliance with the aforesaid statute. This
                                document is published in accordance with the
                                provisions of Rule 3 (1) of the Information
                                Technology (Intermediaries guidelines) Rules,
                                2011 and includes the policies of partties.com,
                                terms of Use and for access or usage of the
                                website{" "}
                              </span>
                              <em>
                                <span>partties.com</span>
                              </em>
                              <span> and mobile/device application.</span>
                            </p>
                            <ol>
                              <li>
                                <strong>Terms of Use</strong>
                              </li>
                            </ol>
                            <ol>
                              <li>
                                <span>
                                  The website and device/mobile application is
                                  owned and operated by HexzonPrime Consulting
                                  Private Limited, a private limited company
                                  incorporated under the Companies Act, 1956 and
                                  having its registered office at 158/6B Prince
                                  Anawar Shah Rd,Kolkata-700045,WB. The
                                  operations on this site by accessing its
                                  website and use of mobile or any device would
                                  be construed as a legal and binding
                                  transaction deemed to have been entered into
                                  any legal person capable of contracting.&nbsp;
                                </span>
                              </li>
                              <li>
                                <span>HexzonPrime Consulting</span>
                                <span>
                                  {" "}
                                  Private Limited is the owner of the brand and
                                  website parties.com. The operation of the
                                  website and the handheld and shall conform
                                  with the privacy policy of such devices. This
                                  Privacy Policy provides succinctly the manner
                                  your data is collected and used for an
                                  enhanced experience on this site/application.
                                  As a visitor on this Customer you are
                                  requested to carefully peruse and agree to the
                                  Privacy Policy. By accessing the our website
                                  Site you agree to the collection and use of
                                  data from your device/mobile by{" "}
                                </span>
                                <span>HexzonPrime Consulting</span>
                                <span>
                                  {" "}
                                  Private Limited in the manner provided in this
                                  Privacy Policy.{" "}
                                </span>
                                <span>
                                  If you do not agree to these Terms of Use, you
                                  may not avail the services, and you are
                                  requested to uninstall the App. By installing,
                                  downloading or even merely using the
                                  application/website, you shall be contracting
                                  with HexzonPrime Consulting
                                </span>
                                <span> Private Limited </span>
                                <span>
                                  and you signify your acceptance to this Terms
                                  of Use and other policies (including but not
                                  limited to the Cancellation &amp; Refund
                                  Policy, Privacy Policy) as posted on the
                                  website and application that may operational
                                  and amended from time to time, and create a
                                  legally binding arrangement to abide by the
                                  same.
                                </span>
                              </li>
                              <li>
                                <span>
                                  This website is for the purpose of creating
                                  back to back contracts between service
                                  providers and the customers facilitated by
                                  HexzonPrime Consulting
                                </span>
                                <span> Private Limited</span>
                                <span>
                                  . The service provider shall provide such
                                  services as agreed between the Customer and
                                  the Service provider, dealing in (a) Food and
                                  beverages, (b) gift and item, (c) party items
                                  and (d) other products. The customer can
                                  choose and place orders as per the options
                                  provided and the range of articles available
                                  therefrom.&nbsp;
                                </span>
                              </li>
                              <li>
                                <span>HexzonPrime Consulting</span>
                                <span> Private Limited </span>
                                <span>
                                  enables delivery, arrangement and completion
                                  of works at select locations within the
                                  serviceable zones including activities such as
                                  i.e. pick-up, set up and delivery.
                                </span>
                              </li>
                            </ol>
                            <ol>
                              <li>
                                <strong>Warranties and Guarantees&nbsp;</strong>
                              </li>
                            </ol>
                            <p>&nbsp;</p>
                            <ol>
                              <li>
                                <span>
                                  The contractual terms that are offered by
                                  HexzonPrime Consulting and agreed between
                                  Customer and HexzonPrime Consulting
                                </span>
                                <span> Private Limited</span>
                                <span>
                                  {" "}
                                  with regard to products and services shall
                                  specify and include without limitation price,
                                  applicable taxes, shipping costs, payment
                                  terms, date, period and mode of delivery,
                                  warranties related to products and services
                                  and after sales services related to products
                                  and services. The management shall not have
                                  any control or determine or advise or in any
                                  way involve itself in the offering or
                                  acceptance of such commercial/contractual
                                  terms between the Buyers and any other service
                                  provider. HexzonPrime may, however, offer
                                  support services to customer for the purpose
                                  of discharge of the service required to be
                                  provided to the Customer, in any manner
                                  necessary. The price of the product and
                                  services offered by other service providers
                                  are determined by themselves and HexzonPrime
                                  has no role such determination of the price or
                                  any other terms and/or conditions.
                                </span>
                              </li>
                              <li>
                                <span>
                                  HexzonPrime shall not be held liable for make
                                  any representation or warranty as to the
                                  item-specified of any of the service
                                  providers. You are advised to independently
                                  verify the bona fides of any particular
                                  service providers that you choose to deal with
                                  on the website and use best judgment to choose
                                  any product.&nbsp;
                                </span>
                              </li>
                              <li>
                                <span>
                                  Neither any representation nor warranty as to
                                  specifics with regard to quality, value, and
                                  longevity of any products or services offered
                                  to be sold or purchased on the said website
                                  nor it there any implicit or explicit support
                                  or endorsement of any products or services on
                                  the website. There is no liability for any
                                  errors or omissions, whether on behalf of
                                  itself or third parties.
                                </span>
                              </li>
                              <li>
                                <span>
                                  Please note that there could be risks in
                                  dealing with underage persons or people acting
                                  under false pretence.
                                </span>
                              </li>
                            </ol>
                            <p>&nbsp;</p>
                            <ol>
                              <li>
                                <strong>
                                  Payments - Order Booking and Financial
                                  Terms&nbsp;
                                </strong>
                              </li>
                            </ol>
                            <p>&nbsp;</p>
                            <ol>
                              <li>
                                <span>
                                  The website allows the Customer to peruse the
                                  goods and place orders and upon acceptance in
                                  favour of the service provider or goods to be
                                  sold. Thereafter, the services are to be
                                  provided subject to the terms and conditions
                                  set out herein, facilitates delivery of goods
                                  or services, or after providing such service.
                                </span>
                              </li>
                              <li>
                                <span>
                                  All Orders once placed are treated as
                                  confirmed.
                                </span>
                              </li>
                              <li>
                                <span>
                                  In addition to the foregoing, HexzonPrime may
                                  also contact the customer over phone and / or
                                  email to inform and confirm any change the
                                  Order, due to availability or unavailability
                                  or change in Order or change in price of any
                                  item in the Order as agreed/chosen. Please
                                  note that any change or confirmation of the
                                  Order shall be treated as final.&nbsp;
                                </span>
                              </li>
                              <li>
                                <span>
                                  All payments made shall be in the denomination
                                  of Indian Rupees, as acceptable in the
                                  Republic of India. There will not be any
                                  facility for transaction to be carried out in
                                  any other form of currency with respect to the
                                  Orders or Services.
                                </span>
                              </li>
                              <li>
                                <span>
                                  The customer can pay by (i) credit card or
                                  debit card or net banking; (ii) any other RBI
                                  approved payment method at the time of booking
                                  an Order; or (iii) credit or debit card or
                                  cash at the time of delivery. Prior to
                                  conclusion of the transaction the customer
                                  shall accept and agree that the payment
                                  facility provided by HexzonPrime Consulting
                                </span>
                                <span> Private Limited</span>
                                <span>
                                  {" "}
                                  is neither a banking nor financial service but
                                  is merely a facilitator providing an
                                  electronic automated payment facility for the
                                  transactions using the existing authorized
                                  banking infrastructure and credit card payment
                                  gateway networks.
                                </span>
                              </li>
                              <li>
                                <span>
                                  In case of any transaction facilitated through
                                  the website it is made clear that the
                                  HexzonPrime is neither acting as trustees nor
                                  acting in a fiduciary capacity with respect to
                                  the transaction.
                                </span>
                              </li>
                              <li>
                                <span>
                                  The prices reflected on the Platform,
                                  including packaging or handling charges, are
                                  determined solely by the HexzonPrime
                                  Consulting
                                </span>
                                <span> Private Limited</span>
                                <span>
                                  {" "}
                                  and are listed based on information available.
                                  The information as available to the
                                  HexzonPrime is provided by clear and
                                  transparent representation and any information
                                  or alteration from such representation is not
                                  liability of the HexzonPrime Consulting
                                </span>
                                <span> Private Limited.</span>
                                <span>&nbsp;</span>
                              </li>
                              <li>
                                <span>
                                  The service provider shall be solely
                                  responsible for any warranty/guarantee of the
                                  goods or services sold to the customer and in
                                  no event shall be the responsibility of
                                  HexzonPrime Consulting
                                </span>
                                <span> Private Limited</span>
                                <span>.</span>
                              </li>
                              <li>
                                <span>
                                  The transactions are bilateral between the
                                  Service provider and customer, and between
                                  Merchant/Buyer&nbsp;and PDP, therefore,
                                  HexzonPrime
                                </span>{" "}
                                <span>
                                  is not liable to charge or deposit any taxes
                                  applicable on such transactions.&nbsp;
                                </span>
                              </li>
                            </ol>
                            <p>&nbsp;</p>
                            <ol>
                              <li>
                                <span>&nbsp;<strong>Returns/Cancellations</strong> - </span>
                                <strong>Cancellations and Refunds</strong>
                              </li>
                            </ol>
                            <p>
                              <span>
                                Please refer to the Cancellation and Refund
                                Policy for cancellation and refunds terms in
                                relation to usage of the website for availing
                                Services.&nbsp;The customer agrees and
                                acknowledges thatHexzonPrime shall not be
                                responsible for:
                              </span>
                            </p>
                            <ol>
                              <ol>
                                <li>
                                  <span>
                                    The services or goods provided by the
                                    service provider including but not limited
                                    to facilities indicated on the website
                                    suiting your requirements and taste;
                                  </span>
                                </li>
                                <li>
                                  <span>
                                    The availability or unavailability of
                                    certain items on the orders;
                                  </span>
                                </li>
                                <li>
                                  <span>
                                    The service provider serving the incorrect
                                    Orders; or
                                  </span>
                                </li>
                                <li>
                                  <span>
                                    Product liability of goods provided by
                                    service provider.
                                  </span>
                                </li>
                              </ol>
                            </ol>
                            <p>
                              <span>
                                Customer and Service Provider that HexzonPrime
                              </span>{" "}
                              <span>
                                shall not be responsible for any liability
                                arising out of disputes in relation to the
                                services proposed to be provided.
                              </span>
                            </p>
                            <p>
                              <span>
                                The services provided by HexzonPrime shall be
                                limited to the territorial area indicated in the
                                website and any expansion of such limits shall
                                be at the sole discretion of HexzonPrime.
                              </span>
                            </p>
                            <p>
                              <span>
                                The customer understands that delivery time
                                quoted at the time of confirming the Order is an
                                approximate estimate and may vary based on the
                                information obtained from service providers
                                and/or availability of products.&nbsp;
                              </span>
                            </p>
                            <p>
                              <span>
                                The website shall be operational only during the
                                working hours of the relevant service providers
                                and the sanction/permission/grant of the
                                location.
                              </span>
                            </p>
                            <p>
                              <span>
                                HexzonPrime extends 30 day returns and refunds
                                for cases arising from displeasure of customers
                                due to the products and services sold.
                              </span>
                            </p>
                            <p>
                              <strong>
                                If you use the website, you do the same at your
                                own risk.
                              </strong>
                            </p>
                            <p>
                              <span>
                                All Persons who are "incompetent to contract"
                                within the meaning of the Indian Contract Act,
                                1872 including minors, un-discharged insolvents
                                etc. are not eligible to use the Platform. Only
                                individuals who are 18 years of age or older may
                                use the Platform and avail Services. If you are
                                under 18 years of age and you wish to download,
                                install, access or use the Platform, your
                                parents or legal guardian must acknowledge and
                                agree to the Terms of Use and Privacy Policy.
                                Should your parents or legal guardian fail to
                                agree or acknowledge the Terms of Use and
                                policies, you shall immediately discontinue its
                                use.&nbsp;
                              </span>
                            </p>
                            <ol>
                              <li>
                                <strong> Amendments</strong>
                              </li>
                            </ol>
                            <p>
                              <span>
                                The management reserves the right to any
                                modification and/or alteration of the Terms and
                                conditions and any such modification agreed by
                                the management shall have in addition to and/or
                                furtherance of these general terms and
                                conditions.&nbsp;
                              </span>
                            </p>
                            <p>&nbsp;</p>
                            <ol>
                              <li>
                                <strong>Non-assignment</strong>
                              </li>
                            </ol>
                            <p>
                              <span>
                                There shall not be any assignment or transfer or
                                purport to assign or transfer the contract
                                between the customer and HexzonPrime to any
                                other person.
                              </span>
                            </p>
                            <ol>
                              <li>
                                <strong>
                                  Governing law and dispute resolution
                                </strong>
                              </li>
                            </ol>
                            <p>
                              <span>
                                The agreement and policies are governed by the
                                laws of India. Any action, suit, or other legal
                                proceeding, which is commenced to resolve any
                                matter arising under or relating to this
                                website, shall be subject to the jurisdiction of
                                the courts at Kolkata, India.
                              </span>
                            </p>
                            <p>&nbsp;</p>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mobile_content_about_us">
              <div className="container">
                <div className="row">
                  <div className="col-md-12 mobilepadding_off">
                    <div className="mycart_details">
                      <div className="company_heading_moble">
                        <p>Term Of Use</p>
                      </div>
                      <div className="cart_details_padding moble_contnt_padding">
                        <p className="company_infotxt">
                          This website is uploaded by following all the
                          provisions of use and operations under terms of
                          Information Technology Act, 2000 and rules thereunder,
                          as applicable from time to time. This present
                          instrument is an electronic-records in compliance with
                          the aforesaid statute. This document is published in
                          accordance with the provisions of Rule 3 (1) of the
                          Information Technology (Intermediaries guidelines)
                          Rules, 2011 and includes the policies of partties.com,
                          terms of Use and for access or usage of the website
                          partties.com and mobile/device application. I. Terms
                          of Use a. The website and device/mobile application is
                          owned and operated by HexzonPrime Consulting Private
                          Limited, a private limited company incorporated under
                          the Companies Act, 1956 and having its registered
                          office at 158/6B Prince Anawar Shah
                          Rd,Kolkata-700045,WB. The operations on this site by
                          accessing its website and use of mobile or any device
                          would be construed as a legal and binding transaction
                          deemed to have been entered into any legal person
                          capable of contracting. b. HexzonPrime Consulting
                          Private Limited is the owner of the brand and website
                          parties.com. The operation of the website and the
                          handheld and shall conform with the privacy policy of
                          such devices. This Privacy Policy provides succinctly
                          the manner your data is collected and used for an
                          enhanced experience on this site/application. As a
                          visitor on this Customer you are requested to
                          carefully peruse and agree to the Privacy Policy. By
                          accessing the our website Site you agree to the
                          collection and use of data from your device/mobile by
                          HexzonPrime Consulting Private Limited in the manner
                          provided in this Privacy Policy. If you do not agree
                          to these Terms of Use, you may not avail the services,
                          and you are requested to uninstall the App. By
                          installing, downloading or even merely using the
                          application/website, you shall be contracting with
                          HexzonPrime Consulting Private Limited and you signify
                          your acceptance to this Terms of Use and other
                          policies (including but not limited to the
                          Cancellation & Refund Policy, Privacy Policy) as
                          posted on the website and application that may
                          operational and amended from time to time, and create
                          a legally binding arrangement to abide by the same. c.
                          This website is for the purpose of creating back to
                          back contracts between service providers and the
                          customers facilitated by HexzonPrime Consulting
                          Private Limited. The service provider shall provide
                          such services as agreed between the Customer and the
                          Service provider, dealing in (a) Food and beverages,
                          (b) gift and item, (c) party items and (d) other
                          products. The customer can choose and place orders as
                          per the options provided and the range of articles
                          available therefrom. d. HexzonPrime Consulting Private
                          Limited enables delivery, arrangement and completion
                          of works at select locations within the serviceable
                          zones including activities such as i.e. pick-up, set
                          up and delivery. II. Warranties and Guarantees a. The
                          contractual terms that are offered by HexzonPrime
                          Consulting and agreed between Customer and HexzonPrime
                          Consulting Private Limited with regard to products and
                          services shall specify and include without limitation
                          price, applicable taxes, shipping costs, payment
                          terms, date, period and mode of delivery, warranties
                          related to products and services and after sales
                          services related to products and services. The
                          management shall not have any control or determine or
                          advise or in any way involve itself in the offering or
                          acceptance of such commercial/contractual terms
                          between the Buyers and any other service provider.
                          HexzonPrime may, however, offer support services to
                          customer for the purpose of discharge of the service
                          required to be provided to the Customer, in any manner
                          necessary. The price of the product and services
                          offered by other service providers are determined by
                          themselves and HexzonPrime has no role such
                          determination of the price or any other terms and/or
                          conditions. b. HexzonPrime shall not be held liable
                          for make any representation or warranty as to the
                          item-specified of any of the service providers. You
                          are advised to independently verify the bona fides of
                          any particular service providers that you choose to
                          deal with on the website and use best judgment to
                          choose any product. c. Neither any representation nor
                          warranty as to specifics with regard to quality,
                          value, and longevity of any products or services
                          offered to be sold or purchased on the said website
                          nor it there any implicit or explicit support or
                          endorsement of any products or services on the
                          website. There is no liability for any errors or
                          omissions, whether on behalf of itself or third
                          parties. d. Please note that there could be risks in
                          dealing with underage persons or people acting under
                          false pretence. III. Payments - Order Booking and
                          Financial Terms a. The website allows the Customer to
                          peruse the goods and place orders and upon acceptance
                          in favour of the service provider or goods to be sold.
                          Thereafter, the services are to be provided subject to
                          the terms and conditions set out herein, facilitates
                          delivery of goods or services, or after providing such
                          service. b. All Orders once placed are treated as
                          confirmed. c. In addition to the foregoing,
                          HexzonPrime may also contact the customer over phone
                          and / or email to inform and confirm any change the
                          Order, due to availability or unavailability or change
                          in Order or change in price of any item in the Order
                          as agreed/chosen. Please note that any change or
                          confirmation of the Order shall be treated as final.
                          d. All payments made shall be in the denomination of
                          Indian Rupees, as acceptable in the Republic of India.
                          There will not be any facility for transaction to be
                          carried out in any other form of currency with respect
                          to the Orders or Services. e. The customer can pay by
                          (i) credit card or debit card or net banking; (ii) any
                          other RBI approved payment method at the time of
                          booking an Order; or (iii) credit or debit card or
                          cash at the time of delivery. Prior to conclusion of
                          the transaction the customer shall accept and agree
                          that the payment facility provided by HexzonPrime
                          Consulting Private Limited is neither a banking nor
                          financial service but is merely a facilitator
                          providing an electronic automated payment facility for
                          the transactions using the existing authorized banking
                          infrastructure and credit card payment gateway
                          networks. f. In case of any transaction facilitated
                          through the website it is made clear that the
                          HexzonPrime is neither acting as trustees nor acting
                          in a fiduciary capacity with respect to the
                          transaction. g. The prices reflected on the Platform,
                          including packaging or handling charges, are
                          determined solely by the HexzonPrime Consulting
                          Private Limited and are listed based on information
                          available. The information as available to the
                          HexzonPrime is provided by clear and transparent
                          representation and any information or alteration from
                          such representation is not liability of the
                          HexzonPrime Consulting Private Limited. h. The service
                          provider shall be solely responsible for any
                          warranty/guarantee of the goods or services sold to
                          the customer and in no event shall be the
                          responsibility of HexzonPrime Consulting Private
                          Limited. i. The transactions are bilateral between the
                          Service provider and customer, and between
                          Merchant/Buyer and PDP, therefore, HexzonPrime is not
                          liable to charge or deposit any taxes applicable on
                          such transactions.  IV.  Returns/Cancellations -
                          Cancellations and Refunds Please refer to the
                          Cancellation and Refund Policy for cancellation and
                          refunds terms in relation to usage of the website for
                          availing Services. The customer agrees and
                          acknowledges thatHexzonPrime shall not be responsible
                          for: 1. The services or goods provided by the service
                          provider including but not limited to facilities
                          indicated on the website suiting your requirements and
                          taste; 2. The availability or unavailability of
                          certain items on the orders; 3. The service provider
                          serving the incorrect Orders; or 4. Product liability
                          of goods provided by service provider. Customer and
                          Service Provider that HexzonPrime shall not be
                          responsible for any liability arising out of disputes
                          in relation to the services proposed to be provided.
                          The services provided by HexzonPrime shall be limited
                          to the territorial area indicated in the website and
                          any expansion of such limits shall be at the sole
                          discretion of HexzonPrime. The customer understands
                          that delivery time quoted at the time of confirming
                          the Order is an approximate estimate and may vary
                          based on the information obtained from service
                          providers and/or availability of products. The website
                          shall be operational only during the working hours of
                          the relevant service providers and the
                          sanction/permission/grant of the location. HexzonPrime
                          extends 30 day returns and refunds for cases arising
                          from displeasure of customers due to the products and
                          services sold. If you use the website, you do the same
                          at your own risk. All Persons who are "incompetent to
                          contract" within the meaning of the Indian Contract
                          Act, 1872 including minors, un-discharged insolvents
                          etc. are not eligible to use the Platform. Only
                          individuals who are 18 years of age or older may use
                          the Platform and avail Services. If you are under 18
                          years of age and you wish to download, install, access
                          or use the Platform, your parents or legal guardian
                          must acknowledge and agree to the Terms of Use and
                          Privacy Policy. Should your parents or legal guardian
                          fail to agree or acknowledge the Terms of Use and
                          policies, you shall immediately discontinue its use.
                          V. Amendments The management reserves the right to any
                          modification and/or alteration of the Terms and
                          conditions and any such modification agreed by the
                          management shall have in addition to and/or
                          furtherance of these general terms and conditions. V.
                          Non-assignment There shall not be any assignment or
                          transfer or purport to assign or transfer the contract
                          between the customer and HexzonPrime to any other
                          person. VI. Governing law and dispute resolution The
                          agreement and policies are governed by the laws of
                          India. Any action, suit, or other legal proceeding,
                          which is commenced to resolve any matter arising under
                          or relating to this website, shall be subject to the
                          jurisdiction of the courts at Kolkata, India.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer history={this.props.history} />
      </React.Fragment>
    );
  }
}

export default TermOfUse;
