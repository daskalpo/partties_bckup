import { Api, Url, Global, Helper } from "../config";
import $ from "jquery";

export function project_script_css_manager(project) {
  if (project == "admin") {
    if (window.localStorage.getItem("RELOAD") == 1) {
      window.localStorage.setItem("RELOAD", 2);
      // window     .location     .reload();
    }
    $("link[id=mobileResponsive]").remove();
    $("link[id=webResponsive]").remove();
  }

  if (project == "partties") {
    window.localStorage.setItem("RELOAD", 1);

    var stylesheet = $("<link>", {
      rel: "stylesheet",
      id: "webResponsive",
      type: "text/css",
      href: "assets/css/style.css",
    });
    stylesheet.appendTo("head");

    var stylesheet = $("<link>", {
      rel: "stylesheet",
      id: "mobileResponsive",
      type: "text/css",
      href: "assets/css/style_responsive.css",
    });
    stylesheet.appendTo("head");
  }
}

export function loadScript(project) {
  if (project == "admin") {
    var myobj = document.getElementById("mainjs");
    myobj.remove();
    let script = document.createElement("script");

    script.src = "assets/js/admin.js";
    script.id = "mainjs";
    document.getElementsByTagName("head")[0].appendChild(script);
  } else {
    var myobj = document.getElementById("mainjs");
    myobj.remove();
    let script = document.createElement("script");

    script.src = "assets/js/main.js";
    script.id = "mainjs";
    document.getElementsByTagName("head")[0].appendChild(script);
  }
}
export function loginValidation(data) {
  let errobj = {
    loginEmailOrPhone: false,
    loginPassword: false,
    continue: true,
  };

  if (
    data.loginEmailOrPhone === undefined ||
    data.loginEmailOrPhone.trim() === ""
  ) {
    errobj.loginEmailOrPhone = "Please Enter E-mail or Mobile No";
    errobj.continue = false;
  }
  if (data.loginPassword === undefined || data.loginPassword.trim() === "") {
    errobj.loginPassword = "Please Enter Password";
    errobj.continue = false;
  }

  return errobj;
}

export function customisedCakeValidation(data) {
  let errobj = {
    description: false,
    continue: true,
  };

  if (data.description === undefined || data.description.trim() === "") {
    errobj.description = "Please Enter you customization intructions";
    errobj.continue = false;
  }

  return errobj;
}

export function signUpValidation(data) {
  let errobj = {
    name: false,
    email: false,
    mobile: false,
    mobileType: false,
    dob: false,
    password: false,
    currentPassword: false,
    continue: true,
  };

  let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  if (data.name === undefined || data.name.trim() === "") {
    errobj.name = "Please Enter Name";
    errobj.continue = false;
  }
  if (data.email === undefined || data.email.trim() === "") {
    errobj.email = "Please Enter E-mail";
    errobj.continue = false;
  } else if (reg.test(data.email) == false) {
    errobj.email = "Please Enter Valid E-mail";
    errobj.continue = false;
  }

  if (data.mobile === undefined || data.mobile.trim() === "") {
    errobj.mobile = "Please Enter Mobile No";
    errobj.continue = false;
  }

  if (data.mobileType === undefined || data.mobileType.trim() === "") {
    errobj.mobileType = "Please Select Mobile Type";
    errobj.continue = false;
  }

  if (data.dob === undefined || data.dob.trim() === "") {
    errobj.dob = "Please Enter DOB";
    errobj.continue = false;
  }

  if (data.password === undefined || data.password.trim() === "") {
    errobj.password = "Please enter Password minimum 9 characters";
    errobj.continue = false;
  } else if (data.password.length < 9) {
    errobj.password = "Please enter Password minimum 9 characters";
    errobj.continue = false;
  }
  if (
    data.confirmPassword === undefined ||
    data.confirmPassword.trim() === ""
  ) {
    errobj.confirmPassword = "Please Confirm Password";
    errobj.continue = false;
  } else if (data.password != data.confirmPassword) {
    errobj.confirmPassword = "Entered Password does not match";
    errobj.continue = false;
  }
  return errobj;
}

export function resetValidation(data) {
  let errobj = {
    password: false,
    confirm_password: false,
    continue: true,
  };

  if (data.password === undefined || data.password.trim() === "") {
    errobj.password = "Please enter Password minimum 9 characters";
    errobj.continue = false;
  } else if (data.password.length < 9) {
    errobj.password = "Please enter Password minimum 9 characters";
    errobj.continue = false;
  }
  if (
    data.confirm_password === undefined ||
    data.confirm_password.trim() === ""
  ) {
    errobj.confirm_password = "Please Confirm Password";
    errobj.continue = false;
  } else if (data.password != data.confirm_password) {
    errobj.confirm_password = "Entered Password does not match";
    errobj.continue = false;
  }
  return errobj;
}

export function accountValidation(data) {
  let errobj = {
    email: false,
    continue: true,
  };
  if (data.email === undefined || data.email.trim() === "") {
    errobj.email = "Enter Account Email";
    errobj.continue = false;
  }

  return errobj;
}

export function convert_YMD(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
}

export function cart_json_maker(product, from_api) {
  Helper.hide_show_cart_bubble_inzero();
  console.log(product);

  let local_completeProdDetails = [];
  if (from_api == "product_list_api") {
    return new Promise((resolve, reject) => {
      local_completeProdDetails["product_id"] = product.variation.product_id;
      local_completeProdDetails["product_variation_id"] = product.variation.id;
      local_completeProdDetails["name"] = product.name;
      var priceElement = product.variation.price;
      if (priceElement != null){
        local_completeProdDetails["price"] = priceElement;
      }else {
        local_completeProdDetails["price"] = 0;
      }
      
      local_completeProdDetails["weight"] = product.variation.weight;
      local_completeProdDetails["vendor"] = product.vendor.name;
      local_completeProdDetails["quantity"] = 1;
      local_completeProdDetails["message"] = "";
      local_completeProdDetails["tax"] = product.tax_category.amount;
      local_completeProdDetails["delivery_time"] = product.deliverable_hours;
      local_completeProdDetails["delivery_set_by_customer"] = false;
      local_completeProdDetails["type"] = product.type;

      product.image.map(function (img, index) {
        if (img.feature == 1) {
          local_completeProdDetails["image"] = img.image_path;
        }
      });
      resolve(local_completeProdDetails);
    });
  }
  if (from_api == "product_slug_api") {
    return new Promise((resolve, reject) => {
      try{
        
        local_completeProdDetails["product_id"] =
          product.variations[0].product_id;
        local_completeProdDetails["product_variation_id"] =
          product.product_variation_id;
      }catch(e) {
        local_completeProdDetails["product_id"] =
          product.variation.product_id;
        local_completeProdDetails["product_variation_id"] =
          product.variation.id;
      }
      
      
      local_completeProdDetails["name"] = product.name;
      var priceElement = product.price;
      if (priceElement != null){
        local_completeProdDetails["price"] = priceElement;
      }else {
        local_completeProdDetails["price"] = 0;
      }
      local_completeProdDetails["weight"] = product.weight;
      local_completeProdDetails["vendor"] = product.vendor.name;
      local_completeProdDetails["quantity"] = parseInt(product.quantitys);
      local_completeProdDetails["message"] = product.message;
      local_completeProdDetails["tax"] = product.tax_category.amount;
      local_completeProdDetails["delivery_time"] = product.custom_delivery_time;
      local_completeProdDetails["delivery_set_by_customer"] = true;
      local_completeProdDetails["type"] = product.type;

      try{
        product.images.map(function (img, index) {
          if (img.feature == 1) {
            local_completeProdDetails["image"] = img.image_path;
          }
        });
      }catch(e){
        product.image.map(function (img, index) {
          if (img.feature == 1) {
            local_completeProdDetails["image"] = img.image_path;
          }
        });
      }
      resolve(local_completeProdDetails);
    });
  }
}
export function localstorage___addToCart(product) {
  console.log(product);
  let cart = [];
  let local_cart = [];
  let tmpCart = [];
  let match_found = false;
  JSON.parse(window.localStorage.getItem("CART")) === null
    ? (cart = [])
    : (cart = JSON.parse(window.localStorage.getItem("CART")));

  local_cart = {
    product_id: product.product_id,
    product_variation_id: product.product_variation_id,
    name: product.name,
    price: product.price,
    weight: product.weight,
    vendor: product.vendor,
    quantity: product.quantity,
    image: product.image,
    message: product.message,
    tax: product.tax,
    delivery_time: product.delivery_time,
    delivery_set_by_customer: product.delivery_set_by_customer,
    type: product.type,
  };

  cart.map(function (prod, index) {
    if (
      prod.product_id === local_cart.product_id &&
      prod.price === local_cart.price
    ) {
      prod.quantity = prod.quantity + 1;
      if (prod.delivery_set_by_customer === false) {
        prod.delivery_time = product.delivery_time;
        prod.delivery_set_by_customer = product.delivery_set_by_customer;
      }
      tmpCart.push(prod);
      match_found = true;
    } else {
      tmpCart.push(prod);
    }
  });
  if (match_found === false) {
    tmpCart.push(local_cart);
  }
  console.log(tmpCart);
  window.localStorage.setItem("CART", JSON.stringify(tmpCart));
}

export function localStorage___update_cartItem_by_quantity(
  cart_product,
  value
) {
  let cart = [];
  let tmpCart = [];

  JSON.parse(window.localStorage.getItem("CART")) === null
    ? (cart = [])
    : (cart = JSON.parse(window.localStorage.getItem("CART")));

  cart.map(function (prod, index) {
    if (
      prod.product_id === cart_product.product_id &&
      prod.product_variation_id === cart_product.product_variation_id
    ) {
      let val = -(value - prod.quantity);
      Helper.cart_item_modify(val);
      prod.quantity = value;
      tmpCart.push(prod);
    } else {
      tmpCart.push(prod);
    }
  });

  window.localStorage.setItem("CART", JSON.stringify(tmpCart));
}

export function localStorage___update_cartItem_by_remove(cart_product) {
  let cart = [];
  let tmpCart = [];

  JSON.parse(window.localStorage.getItem("CART")) === null
    ? (cart = [])
    : (cart = JSON.parse(window.localStorage.getItem("CART")));

  cart.map(function (prod, index) {
    if (
      prod.product_id == cart_product.product_id &&
      prod.product_variation_id == cart_product.product_variation_id
    ) {
      Helper.cart_item_modify(prod.quantity);
    } else {
      tmpCart.push(prod);
    }
  });

  window.localStorage.setItem("CART", JSON.stringify(tmpCart));
}

export function localStorage___update_cartItem_by_customMessage(
  cart_product,
  custom_message,
  changed_variation_id,
  variation_price,
  variation_weight
) {
  let cart = [];
  let tmpCart = [];

  JSON.parse(window.localStorage.getItem("CART")) === null
    ? (cart = [])
    : (cart = JSON.parse(window.localStorage.getItem("CART")));
  return new Promise((resolve, reject) => {
    if (cart_product.product_variation_id === changed_variation_id) {
      cart.map(function (prod, index) {
        if (prod.product_variation_id === changed_variation_id) {
          prod.message = custom_message;
          prod.price = variation_price;
          prod.weight = variation_weight;
          tmpCart.push(prod);
        } else {
          tmpCart.push(prod);
        }
      });
    } else {
      cart.map(function (prod, index) {
        if (prod.product_variation_id === cart_product.product_variation_id) {
          prod.product_variation_id = parseInt(changed_variation_id);
          prod.message = custom_message;
          prod.price = variation_price;
          prod.weight = variation_weight;
          tmpCart.push(prod);
        } else {
          tmpCart.push(prod);
        }
      });

      // ????????????
      let arr = [];
      let match_found = false;
      for (var i = 0; i < tmpCart.length; i++) {
        if (arr.length == 0) {
          arr.push(tmpCart[0]);
        } else {
          for (var j = 0; j < arr.length; j++) {
            if (
              arr[j].product_id == tmpCart[i].product_id &&
              arr[j].product_variation_id == tmpCart[i].product_variation_id
            ) {
              arr[j].quantity =
                parseInt(arr[j].quantity) + parseInt(tmpCart[i].quantity);
              match_found = true;
              break;
            } else {
              match_found = false;
            }
          }
          if (match_found == false) {
            arr.push(tmpCart[i]);
          }
        }
        match_found == false;
      }
      // ???????????
      tmpCart = [];
      tmpCart = arr;
    }
    console.log(tmpCart);

    window.localStorage.setItem("CART", JSON.stringify(tmpCart));
    resolve(tmpCart);
  });
}

export function update_localstorage_to_database_on_login() {
  return new Promise((resolve, reject) => {
    let api = Url.cart_add_to_database;
    Api.user_cart_update_database(api).then((res) => {
      let response = JSON.parse(res);
      let data = response.response;
      console.log(data);
      if (data.status === true) {
        window.localStorage.setItem("CART", JSON.stringify(null));
        resolve(true);
      }
      if (data.status === false) {
        resolve(true);
      }
    });
  });
}

export function update_directly_to_database_on_login() {
  return new Promise((resolve, reject) => {
    let api = Url.cart_add_to_database;
    Api.user_cart_update_database(api).then((res) => {
      let response = JSON.parse(res);
      let data = response.response;
      console.log(data);
      if (data.status === true) {
        window.localStorage.setItem("CART", JSON.stringify(null));
      }
    });
    resolve(true);
  });
}

export function add_directly_to_database_on_login(product) {
  let local_cart = {
    product_id: product.product_id,
    product_variation_id: product.product_variation_id,
    name: product.name,
    price: product.price,
    vendor: product.vendor,
    quantity: product.quantity,
    image: product.image,
    message: product.message,
    delivery_time: product.delivery_time,
  };
  console.log(local_cart);

  return new Promise((resolve, reject) => {
    let api = Url.cart_add_online;
    Api.add_user_cart_update_database(local_cart, api).then((res) => {
      let response = JSON.parse(res);
      let data = response.response;
      console.log(data);
      if (data.status === true) {
        Helper.add_to_wishlist_value(data.wishlist);
        let local_cart_total_items_count = 0;
        data.cartitem.map((prod) => {
          local_cart_total_items_count += prod.quantity;
        });
        Helper.cart_item_assign(local_cart_total_items_count);

        window.localStorage.setItem("CART", JSON.stringify(null));
        resolve(true);
      }
    });
  });
}

export function user_address_Validation(data) {
  let errobj = {
    address: false,
    address_type: false,
    phone: false,
    city: false,
    state: false,
    pincode: false,
    continue: true,
  };

  let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  if (data.address === undefined || data.address.trim() === "") {
    errobj.address = "Please Enter Address";
    errobj.continue = false;
  }

  if (data.address_type === undefined || data.address_type.trim() === "") {
    errobj.address_type = "Please Enter Address Type";
    errobj.continue = false;
  }

  if (data.phone === undefined || data.phone.length <= 0) {
    errobj.phone = "Please Enter mobile number";
    errobj.continue = false;
  }

  if (data.city === undefined || data.city.length <= 0) {
    errobj.city = "Please select your City";
    errobj.continue = false;
  }

  if (data.state === undefined || data.state.length <= 0) {
    errobj.state = "Please select your State";
    errobj.continue = false;
  }
  if (data.pincode === undefined || data.pincode.length <= 0) {
    errobj.pincode = "Please Enter pincode";
    errobj.continue = false;
  } else if (data.pincode.length < 6) {
    errobj.pincode = "Please Enter Valid pincode";
    errobj.continue = false;
  } else {
    let status = false;
    Global.pincode.map((pincode) => {
      if (pincode == data.pincode) {
        status = true;
      }
    });
    if (status == false) {
      errobj.pincode = "Product is not deliverable to this Pincode";
      errobj.continue = false;
    }
  }

  return errobj;
}

export function user_shipping_Validation(data) {
  let errobj = {
    address: false,
    address_type: false,
    phone: false,
    city: false,
    state: false,
    pincode: false,
    contact_name: false,
    continue: true,
  };

  let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  if (data.address === undefined || data.address.trim() === "") {
    errobj.address = "Please Enter Address";
    errobj.continue = false;
  }

  if (data.address_type === undefined || data.address_type.trim() === "") {
    errobj.address_type = "Please Enter Address Type";
    errobj.continue = false;
  }

  if (data.phone === undefined || data.phone.length <= 0) {
    errobj.phone = "Please Enter mobile number";
    errobj.continue = false;
  }

  if (data.city === undefined || data.city.length <= 0) {
    errobj.city = "Please select your City";
    errobj.continue = false;
  }

  if (data.state === undefined || data.state.length <= 0) {
    errobj.state = "Please select your State";
    errobj.continue = false;
  }

  if (data.pincode === undefined || data.pincode.length <= 0) {
    errobj.pincode = "Please Enter pincode";
    errobj.continue = false;
  } else if (data.pincode.length < 6) {
    errobj.pincode = "Please Enter Valid pincode";
    errobj.continue = false;
  } else {
    let status = false;
    Global.pincode.map((pincode) => {
      if (pincode == data.pincode) {
        status = true;
      }
    });
    if (status == false) {
      errobj.pincode = "Product is not deliverable to this Pincode";
      errobj.continue = false;
    }
  }

  if (data.contact_name === undefined || data.contact_name.trim() === "") {
    errobj.contact_name = "Please Enter Contact Name";
    errobj.continue = false;
  }

  return errobj;
}

export function assign_cart_item_modify(qty) {
  let cart_total_items = parseInt(
    window.localStorage.getItem("cart_total_items")
  );

  console.log(cart_total_items);

  if (isNaN(cart_total_items)) {
    cart_total_items = 0;
  }

  console.log(cart_total_items);

  let total_added = parseInt(cart_total_items) + parseInt(qty);
  console.log(total_added);
  document.getElementById("catrt_total_items").textContent = total_added;
  window.localStorage.setItem("cart_total_items", total_added);
  Helper.hide_show_cart_bubble_inzero();
}

export function cart_item_modify(qty) {
  console.log(qty);

  let cart_total_items = window.localStorage.getItem("cart_total_items");

  cart_total_items == null
    ? 0
    : window.localStorage.getItem("cart_total_items");
  if (cart_total_items == "NaN") {
    cart_total_items = 0;
  }

  let decrement = parseInt(cart_total_items) - parseInt(qty);

  document.getElementById("catrt_total_items").textContent = decrement;
  window.localStorage.setItem("cart_total_items", decrement);
}

export function cart_item_assign(qty) {
  document.getElementById("catrt_total_items").textContent = qty;
  window.localStorage.setItem("cart_total_items", qty);
  Helper.hide_show_cart_bubble_inzero();
}

export function increment_cart_item() {
  let cart_total_items = window.localStorage.getItem("cart_total_items");

  cart_total_items == null
    ? 0
    : parseInt(window.localStorage.getItem("cart_total_items"));
  let increment = ++cart_total_items;

  document.getElementById("catrt_total_items").textContent = increment;
  window.localStorage.setItem("cart_total_items", increment);
  Helper.hide_show_cart_bubble_inzero();
}

export function convert_object_to_array(data) {
  var keys = [];
  let dataObj = data;
  for (var number in dataObj) {
    if (dataObj.hasOwnProperty(number)) {
      keys.push(dataObj[number]);
    }
  }

  return keys;
}

export function toggle_login_signup(val) {
  if (val == "login") {
    document.getElementById("signupFormWrap").style.display = "none";
    document.getElementById("forgetPassFormWrap").style.display = "none";
    document.getElementById("loginFormWrap").style.display = "block";
    document.getElementById("modalLgSpTitle").innerHTML =
      "Please Login to your Account";
  }

  if (val == "signup") {
    document.getElementById("signupFormWrap").style.display = "block";

    document.getElementById("forgetPassFormWrap").style.display = "none";
    document.getElementById("loginFormWrap").style.display = "none";
    document.getElementById("modalLgSpTitle").innerHTML =
      "Please Sign Up to join Partties";
  }

  if (val == "forgetpassword") {
    document.getElementById("signupFormWrap").style.display = "none";
    document.getElementById("forgetPassFormWrap").style.display = "block";
    document.getElementById("loginFormWrap").style.display = "none";
    document.getElementById("modalLgSpTitle").innerHTML =
      "Enter Account Email";
  }
}

export function alert(text) {
  document.querySelector("#alertOpen").click();

  document.getElementById("text").innerHTML = text;
}

export function hide_show_cart_bubble_inzero() {
  var span = parseInt(document.getElementById("catrt_total_items").textContent);

  if (span === 0 || span == "0") {
    document.getElementById("catrt_total_items").style.visibility = "hidden";
  } else {
    document.getElementById("catrt_total_items").style.visibility = "visible";
  }
}

export function hide_show_cart_wishlist_inzero() {
  var span = parseInt(document.getElementById("web_add_to_wishlist").innerText);
  // console.log(span);
  if (!span) {
    document.getElementById("web_add_to_wishlist").style.visibility = "hidden";
  } else {
    document.getElementById("web_add_to_wishlist").style.visibility = "visible";
  }
}

export function clear_global_search_values_onNavigation() {
  Global.header_search_text_val = "";
  Global.search_values_obj = {
    price: "",
    type: "",
    order: "",
  };

  Global.gift_search_values_obj = {
    price: "",
    type: "",
    order: "",
  };

  Global.partyitem_search_values_obj = {
    price: "",
    type: "",
    order: "",
  };

  Global.global_product_search_values_obj = {
    price: "",
    type: "",
    order: "",
  };
}
export function add_to_wishlist_value(value) {
  document.getElementById("web_add_to_wishlist").textContent = value;
  document.getElementById("web_add_to_wishlist").style.visibility = "visible";

  window.localStorage.setItem("WISHLIST_VALUE", value);
  Helper.hide_show_cart_wishlist_inzero();
}

export function filter_checked_attribute(checked_element) {
  let local_type_filter = "";
  for (var key in checked_element) {
    if (checked_element.hasOwnProperty(key)) {
      if (checked_element[key].isChecked === true) {
        local_type_filter += "," + checked_element[key].name;
      }
    }
  }
  return local_type_filter.slice(1);
}

export function fetch_logged_user_detail() {
  let user_logged_details = JSON.parse(
    window.localStorage.getItem("USERTOKKEN")
  );
  let token_type = "";
  let token = "";
  if (user_logged_details) {
    token_type = user_logged_details.token_type;
    token = user_logged_details.token;
  }

  let userObj = {
    token_type: token_type,
    token: token,
  };
  return userObj;
}

export function admin_fetch_logged_user_detail() {
  let user_logged_details = JSON.parse(
    window.localStorage.getItem("ADMIN_USER_TOKKEN")
  );
  let token_type = "";
  let token = "";
  if (user_logged_details) {
    token_type = user_logged_details.token_type;
    token = user_logged_details.token;
  }

  let userObj = {
    token_type: token_type,
    token: token,
  };
  return userObj;
}

export function cart_item_assign_after_login(qty) {
  if (qty != 0) {
    document.getElementById("catrt_total_items").textContent = qty;

    Helper.hide_show_cart_bubble_inzero();
    window.localStorage.setItem("cart_total_items", qty);
  }
}

export function get_review_date(review_date) {
  var date = new Date(review_date);
  function dateFormat(number) {
    if (number < 10) {
      return "0" + number;
    }
    return number;
  }
  return (
    dateFormat(date.getFullYear()) +
    "-" +
    dateFormat(date.getMonth() + 1) +
    "-" +
    dateFormat(date.getDate())
  );
}

export function user_review_Validation(data) {
  let errobj = {
    review_title: false,
    review_content: false,
    continue: true,
  };

  if (data.review_title === undefined || data.review_title.trim() === "") {
    errobj.review_title = "Please Enter Title";
    errobj.continue = false;
  }
  if (data.review_content === undefined || data.review_content.trim() === "") {
    errobj.review_content = "Please Enter Review Content";
    errobj.continue = false;
  }

  return errobj;
}

export function logout() {
  localStorage.clear();
  Helper.add_to_wishlist_value(0);
  window.localStorage.setItem("cart_total_items", 0);

  document.getElementById("catrt_total_items").textContent = 0;
  var span = parseInt(document.getElementById("catrt_total_items").textContent);
  console.log(span);
  if (span === 0 || span == "0") {
    document.getElementById("catrt_total_items").style.visibility = "hidden";
  } else {
    document.getElementById("catrt_total_items").style.visibility = "visible";
  }

  Helper.hide_show_cart_bubble_inzero();
  Helper.hide_show_cart_wishlist_inzero();
}

export function user_profile_section_manager(option) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace("active", "");
  }
  document.getElementById(option).style.display = "block";

  document.getElementById("user_" + option).classList.add("active");
}

export function initial_profile_section_load() {
  document.getElementById("profile").style.display = "block";

  document.getElementById("user_profile").classList.add("active");
}

export function get_user_profile_dateformats(user_date) {
  if (user_date === null || user_date == null || user_date == "") {
    return "";
  }

  const date = new Date(user_date);
  const dateTimeFormat = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
  const [
    { value: month },
    ,
    { value: day },
    ,
    { value: year },
  ] = dateTimeFormat.formatToParts(date);
  return `${day}-${month}-${year}`;
}

export function passwordChangeValidation(data) {
  let errobj = {
    current_password: false,
    new_password: false,
    confirm_new_password: false,
    continue: true,
  };

  let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  if (
    data.current_password === undefined ||
    data.current_password.trim() === ""
  ) {
    errobj.current_password = "Please enter current password";
    errobj.continue = false;
  }

  if (data.new_password === undefined || data.new_password.trim() === "") {
    errobj.new_password = "Please enter Password with minimum 9 characters";
    errobj.continue = false;
  } else if (data.new_password.length < 9) {
    errobj.new_password = "Please enter Password minimum 9 characters";
    errobj.continue = false;
  }

  if (
    data.confirm_new_password === undefined ||
    data.confirm_new_password.trim() === ""
  ) {
    errobj.confirm_new_password = "Please confirm new password";
    errobj.continue = false;
  } else if (data.new_password != data.confirm_new_password) {
    errobj.confirm_new_password = "Entered password does not match";
    errobj.continue = false;
  }
  return errobj;
}

export function party_enquiry_validation(data) {
  let errobj = {
    number_invities: false,
    party_date: false,
    venue: false,
    occasion: false,
    services: false,
    additional_notes: false,
    continue: true,
  };

  if (
    data.number_invities === undefined ||
    data.number_invities.trim() === ""
  ) {
    errobj.number_invities = "Please give an idea of number of invities";
    errobj.continue = false;
  }
  if (data.party_date === undefined || data.party_date.trim() === "") {
    errobj.party_date = "Please enter Party Date";
    errobj.continue = false;
  }

  if (data.venue === undefined || data.venue.trim() === "") {
    errobj.venue = "Please Enter Venue";
    errobj.continue = false;
  }

  if (data.occasion === undefined || data.occasion.trim() === "") {
    errobj.occasion = "Please Enter Occasion";
    errobj.continue = false;
  }

  if (data.services === undefined || data.services.trim() === "") {
    errobj.services = "Please Enter Service";
    errobj.continue = false;
  }

  if (
    data.additional_notes === undefined ||
    data.additional_notes.trim() === ""
  ) {
    errobj.additional_notes = "Please Enter any additional Notes";
    errobj.continue = false;
  }
  return errobj;
}

export function delivery_day(valdate) {
  return valdate.substring(0, 10);
}

export function global_function_for_adding_localcart_to_database_and_counts_manager() {
  window.localStorage.setItem("RELOAD", 1);
  Helper.project_script_css_manager("partties");

  let user = window.localStorage.getItem("LOGGEDUSER");

  return new Promise((resolve, reject) => {
    if (
      user != "" &&
      user !== null &&
      user !== undefined &&
      window.localStorage.getItem("ONETIMEADDBULK") == 1
    ) {
      window.localStorage.setItem("ONETIMEADDBULK", 0);
      Helper.update_localstorage_to_database_on_login().then((res) => {
        let api = Url.cart_wish_count;
        Api.cart_wish_count(api).then((res) => {
          let response = JSON.parse(res);
          let data = response;
          console.log(data);
          if (data.code == 200) {
            Helper.cart_item_assign_after_login(data.data.cart);
            Helper.add_to_wishlist_value(data.data.wishlist);
            resolve(true);
          }
        });
      });
    } else {
      resolve(true);
    }
  });
}

export function admin_login_validation(data) {
  let errobj = {
    admin_login: false,
    admin_password: false,
    continue: true,
  };

  if (data.admin_login === undefined || data.admin_login.trim() === "") {
    errobj.admin_login = "Please Enter E-mail or Mobile No";
    errobj.continue = false;
  }
  if (data.admin_password === undefined || data.admin_password.trim() === "") {
    errobj.admin_password = "Please Enter Password";
    errobj.continue = false;
  }

  return errobj;
}

export function total_cart_price(total_amount, gst) {
  let total = parseFloat(total_amount) + parseFloat(gst);
  return parseInt(Math.round(total));
}

export function get_review_date_second(del_date) {
  var date = new Date(del_date);

  var year = date.getFullYear();
  var month = ("0" + (date.getMonth() + 1)).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);
  var hours = ("0" + date.getHours()).slice(-2);
  var minutes = ("0" + date.getMinutes()).slice(-2);
  var seconds = date.getSeconds();

  return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":00";
}

export function get_review_date_with_time_slab(del_date, time_slab) {
  var date = new Date(del_date);

  var year = date.getFullYear();
  var month = ("0" + (date.getMonth() + 1)).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);
  var hours = ("0" + date.getHours()).slice(-2);
  var minutes = ("0" + date.getMinutes()).slice(-2);
  var seconds = date.getSeconds();

  if (time_slab == "10am-2pm"){
    return year + "-" + month + "-" + day + " " + "10" + ":" + "00" + ":00";
  }else if (time_slab == "2pm-6pm"){
    return year + "-" + month + "-" + day + " " + "14" + ":" + "00" + ":00";
  }else {
    return year + "-" + month + "-" + day + " " + "18" + ":" + "00" + ":00";
  }
}

export function get_today_date() {
  var d = new Date(),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  return [year, month, day].join("-");
}

export function delivery_time_calculator(deliver_time) {
  var today = Helper.get_today_date();
  var office_start_time = new Date(today + " 6:0:0");
  var office_end_time = new Date(today + " 18:0:0");
  var delivery_start_time = new Date(today + " 10:0:0");
  var delivery_end_time = new Date(today + " 22:0:0");

  var current_time = new Date();
  var present_time = new Date();

  var delivery_time = new Date(
    current_time.setTime(current_time.getTime() + deliver_time * 60 * 60 * 1000)
  );

  if (delivery_time.getTime() <= delivery_start_time.getTime()) {
    deliver_time = parseInt(
      Math.round(Math.abs(present_time - delivery_start_time) / 36e5)
    );
  }

  if (delivery_time.getTime() >= delivery_end_time.getTime()) {
    return "By Tommorow ";
  }

  return deliver_time + " hours";
}

export function product_delivery_date_on_adding_cart(deliver_time) {
  var today = Helper.get_today_date();
  var office_start_time = new Date(today + " 6:0:0");
  var office_end_time = new Date(today + " 18:0:0");
  var delivery_start_time = new Date(today + " 10:0:0");
  var delivery_end_time = new Date(today + " 22:0:0");

  var current_time = new Date();
  var present_time = new Date();

  var delivery_time = new Date(
    current_time.setTime(current_time.getTime() + deliver_time * 60 * 60 * 1000)
  );
  if (delivery_time.getTime() <= delivery_start_time.getTime()) {
    deliver_time = parseInt(
      Math.round(Math.abs(present_time - delivery_start_time) / 36e5)
    );
  }

  if (delivery_time.getTime() >= delivery_end_time.getTime()) {
    var tomorrow = new Date();
    deliver_time = tomorrow.setDate(new Date().getDate() + 1);
    deliver_time = Helper.convert_YMD(deliver_time);
    delivery_time = new Date(deliver_time + " 10:0:0");
  }
  return Helper.get_review_date_second(delivery_time);
}

export function approx_delivery_time(local_minimum_delivery_time) {
  if (
    local_minimum_delivery_time.getMinutes() > 0 &&
    local_minimum_delivery_time.getMinutes() < 30
  ) {
    local_minimum_delivery_time.setMinutes(30);
  } else {
    local_minimum_delivery_time.setMinutes(60);
  }
  return local_minimum_delivery_time;
}

export function attribute_validation(data) {
  let errobj = {
    attribute_name: false,
    continue: true,
  };

  if (data.attribute_name === undefined || data.attribute_name.trim() === "") {
    errobj.attribute_name = "Please Enter Attribute name";
    errobj.continue = false;
  }

  return errobj;
}

export function get_attributes(data) {
  console.log(data);

  let local_attribute_list = "";
  data.forEach((attr) => {
    local_attribute_list = local_attribute_list + "," + attr.name;
  });

  return local_attribute_list.substring(1);
}

export function vendor_validation(data) {
  let errobj = {
    vendor_name: false,
    vendor_email: false,
    vendor_phone: false,
    continue: true,
  };

  if (data.vendor_name === undefined || data.vendor_name.trim() === "") {
    errobj.vendor_name = "Please enter  Name";
    errobj.continue = false;
  }

  if (data.vendor_email === undefined || data.vendor_email.trim() === "") {
    errobj.vendor_email = "Please enter Email";
    errobj.continue = false;
  }

  if (data.vendor_phone === undefined || data.vendor_phone.trim() === "") {
    errobj.vendor_phone = "Please enter Phone";
    errobj.continue = false;
  }

  return errobj;
}

export function productAddValidation(data) {
  let errobj = {
    product_name: false,
    category_id: false,
    vendor_id: false,
    tax_id: false,
    description: false,
    additional_description: false,
    type_id: false,
    delivery_time: false,
    product_feature_image_db: false,
    weight: false,
    unit: false,
    price: false,
    product_slider_image_db: true,
    attribute_id: false,
    continue: true,
  };

  if (data.product_name === undefined || data.product_name.trim() === "") {
    errobj.product_name = "Please Enter Product Name";
    errobj.continue = false;
  }
  if (data.category_id == "0" || data.category_id === "") {
    errobj.category_id = "Please Select Category";
    errobj.continue = false;
  }
  if (data.vendor_id == "0" || data.vendor_id === "") {
    errobj.vendor_id = "Please Select Vendor";
    errobj.continue = false;
  }

  if (data.tax_id == "0" || data.tax_id === "") {
    errobj.tax_id = "Please Select Tax";
    errobj.continue = false;
  }

  if (data.description === undefined || data.description.trim() === "") {
    errobj.description = "Please Enter Product Description";
    errobj.continue = false;
  }

  if (
    data.additional_description === undefined ||
    data.additional_description.trim() === ""
  ) {
    errobj.additional_description =
      "Please Enter Product Additional Description";
    errobj.continue = false;
  }
  if (data.type_id == "0" || data.type_id === "") {
    errobj.type_id = "Please Select Type";
    errobj.continue = false;
  }

  if (data.delivery_time === "") {
    errobj.delivery_time = "Please Enter Delivery Time";
    errobj.continue = false;
  }

  if (data.weight === "") {
    errobj.weight = "Please Enter Weight";
    errobj.continue = false;
  }

  if (data.price === "") {
    errobj.price = "Please Enter Price";
    errobj.continue = false;
  }

  if (data.unit == "0" || data.unit === "") {
    errobj.unit = "Please Select Unit";
    errobj.continue = false;
  }

  if (data.attribute_id.length <= 0) {
    errobj.attribute_id = "Please Select attribute";
    errobj.continue = false;
  }

  return errobj;
}

export function productAddValidationedit(data) {
  let errobj = {
    product_name: false,
    category_id: false,
    vendor_id: false,
    tax_id: false,
    description: false,
    additional_description: false,
    type_id: false,
    delivery_time: false,
    product_feature_image_db: false,
    product_slider_image_db: true,
    attribute_id: false,
    continue: true,
  };

  if (data.product_name === undefined || data.product_name.trim() === "") {
    errobj.product_name = "Please Enter Product Name";
    errobj.continue = false;
  }
  if (data.category_id == "0" || data.category_id === "") {
    errobj.category_id = "Please Select Category";
    errobj.continue = false;
  }
  if (data.vendor_id == "0" || data.vendor_id === "") {
    errobj.vendor_id = "Please Select Vendor";
    errobj.continue = false;
  }

  if (data.tax_id == "0" || data.tax_id === "") {
    errobj.tax_id = "Please Select Tax";
    errobj.continue = false;
  }

  if (data.description === undefined || data.description.trim() === "") {
    errobj.description = "Please Enter Product Description";
    errobj.continue = false;
  }

  if (
    data.additional_description === undefined ||
    data.additional_description.trim() === ""
  ) {
    errobj.additional_description =
      "Please Enter Product Additional Description";
    errobj.continue = false;
  }
  if (data.type_id == "0" || data.type_id === "") {
    errobj.type_id = "Please Select Type";
    errobj.continue = false;
  }

  if (data.delivery_time === "") {
    errobj.delivery_time = "Please Enter Delivery Time";
    errobj.continue = false;
  }

  if (data.attribute_id.length <= 0) {
    errobj.attribute_id = "Please Select attribute";
    errobj.continue = false;
  }

  return errobj;
}

export function categoryAddValidation(data) {
  let errobj = {
    name: false,
    continue: true,
  };

  if (data.name === undefined || data.name.trim() === "") {
    errobj.name = "Please Enter Category Name";
    errobj.continue = false;
  }
  return errobj;
}

export function VariationAddValidation(data) {
  let errobj = {
    product_id: false,
    name: false,
    weight: false,
    unit: false,
    price: false,
    continue: true,
  };

  if (data.name === undefined || data.name.trim() === "") {
    errobj.name = "Please Enter Variation Name";
    errobj.continue = false;
  }

  if (data.weight === "") {
    errobj.weight = "Please Enter Weight";
    errobj.continue = false;
  }

  if (data.price === "") {
    errobj.price = "Please Enter Price";
    errobj.continue = false;
  }

  if (data.unit == "0" || data.unit === "") {
    errobj.unit = "Please Select Unit";
    errobj.continue = false;
  }

  if (data.product_id == "0" || data.product_id === "") {
    errobj.product_id = "Please Select Product";
    errobj.continue = false;
  }

  return errobj;
}
