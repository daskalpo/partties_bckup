import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, BrowserRouter, Route, Redirect } from "react-router-dom";
import {
  Home,
  List,
  ProductDetail,
  GiftDetail,
  Cart,
  Payment,
  WishList,
  CustomizeCake,
  OrderConfirmation,
  OrderHistory,
  OrderDetails,
  Profile,
  PartyEnquiry,
  Gift,
  PartyItems,
  PartyItemDetail,
  GlobalProduct,
  Recommendations,
  RecentlyViewedItems,
  VendorList,
  AboutUs,
  ContactUs,
  Career,
  Blog,
  Faq,
  TermOfUse,
  ResetPassword,
} from "./Page";
import {
  Dashboard,
  Customers,
  AdminLogin,
  Orders,
  Transactions,
  Products,
  CustomerEnquiry,
  Vendors,
  CsvUpload,
  Pincode,
  Widgets,
} from "./Admin";

const routing = (
  <HashRouter hashType={"noslash"}>
    <Route path="/" exact component={Home} />
    <Route path="/home" component={Home} />
    <Route path="/product-list" component={List} />
    <Route path="/product-detail/:type" component={ProductDetail} />
    <Route path="/cart" component={Cart} />
    <Route path="/payment" component={Payment} />
    <Route path="/wish-list" component={WishList} />
    <Route path="/customize-cake" exact component={CustomizeCake} />
    <Route path="/customize-cake/:slug" component={CustomizeCake} />
    <Route path="/order-confirmation/:orderId" component={OrderConfirmation} />
    <Route path="/order-history" component={OrderHistory} />
    <Route path="/order-details/:orderId" component={OrderDetails} />
    <Route path="/my-profile" component={Profile} />
    <Route path="/party-enquiry" component={PartyEnquiry} />
    <Route path="/gifts" component={Gift} />
    <Route path="/gift-detail/:type" component={GiftDetail} />
    <Route path="/party-items" component={PartyItems} />
    <Route path="/party-item-detail/:type" component={PartyItemDetail} />
    <Route path="/global-products" exact component={GlobalProduct} />
    <Route path="/recommendations" exact component={Recommendations} />
    <Route
      path="/recently-viewed-items"
      exact
      component={RecentlyViewedItems}
    />
    <Route path="/vendor-list" component={VendorList} />
    <Route path="/about-us" exact component={AboutUs} />
    <Route path="/contact-us" exact component={ContactUs} />
    <Route path="/career" exact component={Career} />
    <Route path="/blog" exact component={Blog} />
    <Route path="/faq" exact component={Faq} />
    <Route path="/term-of-use" exact component={TermOfUse} />
    <Route path="/reset-password/:authToken" exact component={ResetPassword} />

    <Route path="/admin-panel" exact component={AdminLogin} />
    <Route path="/admin-panel/dashboard" component={Dashboard} />
    <Route path="/admin-panel/customers" component={Customers} />
    <Route path="/admin-panel/orders" component={Orders} />
    <Route path="/admin-panel/transactions" component={Transactions} />
    <Route path="/admin-panel/products" component={Products} />
    <Route path="/admin-panel/customer-enquiry" component={CustomerEnquiry} />
    <Route path="/admin-panel/vendors" component={Vendors} />
    <Route path="/admin-panel/csv-upload" component={CsvUpload} />
    <Route path="/admin-panel/pincode" component={Pincode} />
    <Route path="/admin-panel/widgets" component={Widgets} />
    {/* <Route path="/admin-panel/widgets/add-edit-widget" component={AddEditTilePage} /> */}
  </HashRouter>
);
ReactDOM.render(routing, document.getElementById("root"));
