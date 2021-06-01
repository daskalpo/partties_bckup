import { Global, Url, Helper } from "../config";

export function RegisterApi(url, data) {
  let dataObj = {
    fullname: data.name,
    password: data.password,
    password_confirmation: data.confirmPassword,
    security_key: data.securityKey,
    dob: data.dob,
    anniversary: data.aniversary,
    email: data.email,
    phone: data.mobile,
    phone_type: data.mobileType,
  };

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataObj),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          resolve(error);
        }
      );
  });
}

export function ResetPasswordApi(url, data) {
  let dataObj = {
    token: data.token,
    username: data.username,
    password: data.password,
    password_confirmation: data.confirm_password,
  };

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataObj),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          resolve(error);
        }
      );
  });
}

export function ForgetPassword(url, data) {
  let dataObj = {
    username: data.email,
  };
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataObj),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          resolve(error);
        }
      );
  });
}

export function LoginApi(url, data) {
  let dataObj = {
    username: data.loginEmailOrPhone,
    password: data.loginPassword,
  };

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataObj),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          resolve(error);
        }
      );
  });
}

export function product_size(url) {
  let user_logged_details = Helper.fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          user_logged_details.token_type + user_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          resolve(JSON.stringify(result));
        },
        (error) => {
          resolve(error);
        }
      );
  });
}

export function NewProductsApi(url) {
  let user_logged_details = Helper.fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          user_logged_details.token_type + user_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          resolve(JSON.stringify(result));
        },
        (error) => {
          resolve(error);
        }
      );
  });
}

export function NewGiftssApi(url) {
  let user_logged_details = Helper.fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          user_logged_details.token_type + user_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          resolve(JSON.stringify(result));
        },
        (error) => {
          resolve(error);
        }
      );
  });
}

export function WishlistApi(url, page) {
  let Url = url + "?page=" + page;
  console.log(Url);
  let user_logged_details = Helper.fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(Url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          user_logged_details.token_type + user_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function RecommendationApi(url, page) {
  let Url = url + "?page=" + page;
  console.log(Url);
  let user_logged_details = Helper.fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(Url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          user_logged_details.token_type + user_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function recentlyViewedItemApi(url, page) {
  let Url = url + "?page=" + page;
  console.log(Url);
  let user_logged_details = Helper.fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(Url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          user_logged_details.token_type + user_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function SearchProductsApi(url, searchObj) {
  let user_logged_details = Helper.fetch_logged_user_detail();

  console.log(user_logged_details);
  let Url =
    url +
    "?attribuites=" +
    searchObj.type +
    "&searchkey=" +
    searchObj.search +
    "&pricerange=" +
    searchObj.price +
    "&shorting=" +
    searchObj.order +
    "&page=" +
    searchObj.page;
  console.log(Url);

  return new Promise((resolve, reject) => {
    fetch(Url, {
      method: "GET",
      headers: {
        Authorization:
          user_logged_details.token_type + user_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function vendor_list(Url, searchObj) {
  let user_logged_details = Helper.fetch_logged_user_detail();

  return new Promise((resolve, reject) => {
    fetch(Url, {
      method: "GET",
      headers: {
        Authorization:
          user_logged_details.token_type + user_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function SearchGiftssApi(url, searchObj) {
  let user_logged_details = Helper.fetch_logged_user_detail();

  console.log(user_logged_details);
  let Url =
    url +
    "?attribuites=" +
    searchObj.type +
    "&searchkey=" +
    searchObj.search +
    "&pricerange=" +
    searchObj.price +
    "&shorting=" +
    searchObj.order +
    "&page=" +
    searchObj.page;
  console.log(Url);

  return new Promise((resolve, reject) => {
    fetch(Url, {
      method: "GET",
      headers: {
        Authorization:
          user_logged_details.token_type + user_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function SearchPartItemApi(url, searchObj) {
  let user_logged_details = Helper.fetch_logged_user_detail();

  console.log(user_logged_details);
  let Url =
    url +
    "?attribuites=" +
    searchObj.type +
    "&searchkey=" +
    searchObj.search +
    "&pricerange=" +
    searchObj.price +
    "&shorting=" +
    searchObj.order +
    "&page=" +
    searchObj.page;
  console.log(Url);

  return new Promise((resolve, reject) => {
    fetch(Url, {
      method: "GET",
      headers: {
        Authorization:
          user_logged_details.token_type + user_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function ProductDetails(url) {
  let user_logged_details = Helper.fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        Authorization:
          user_logged_details.token_type + user_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          resolve(error);
        }
      );
  });
}

export function token_details(url) {
  let user_logged_details = Helper.fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        Authorization:
          user_logged_details.token_type + user_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          resolve(error);
        }
      );
  });
}

export function productVariations(url) {
  return new Promise((resolve, reject) => {
    fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          resolve(error);
        }
      );
  });
}

export function user_cart_update_database(url) {
  let dataObj = [];
  let temp_dataObj = [];
  let user_logged_details = Helper.fetch_logged_user_detail();

  JSON.parse(window.localStorage.getItem("CART")) === null
    ? (dataObj = [])
    : (dataObj = JSON.parse(window.localStorage.getItem("CART")));

  dataObj.map((each_product) => {
    if (each_product.delivery_set_by_customer === false) {
      let del_time = each_product.delivery_time;
      each_product.delivery_time = Helper.product_delivery_date_on_adding_cart(
        del_time
      );
    }
    temp_dataObj.push(each_product);
  });
  dataObj = [];
  dataObj = temp_dataObj;

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          user_logged_details.token_type + user_logged_details.token,
      },
      body: JSON.stringify(dataObj),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function add_user_cart_update_database(dataObj, url) {
  let user_logged_details = Helper.fetch_logged_user_detail();

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          user_logged_details.token_type +" "+ user_logged_details.token,
      },
      body: JSON.stringify(dataObj),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("AddToCartResponse: ", result);
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function online_user_cart_add_database(dataObj, url) {
  let data = [];
  let local_cart = {
    product_id: dataObj.product_id,
    product_variation_id: dataObj.product_variation_id,
    name: dataObj.name,
    price: dataObj.price,
    vendor: "????",
    quantity: 1,
    image: dataObj.image,
    message: dataObj.message,
  };

  data.push(local_cart);
  let user_logged_details = Helper.fetch_logged_user_detail();
  console.log(data);
  console.log(url);

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          user_logged_details.token_type + user_logged_details.token,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function cart_details_for_user(url) {
  let user_logged_details = Helper.fetch_logged_user_detail();

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          user_logged_details.token_type + user_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          resolve(error);
        }
      );
  });
}

export function cart_wish_count(url) {
  let user_logged_details = Helper.fetch_logged_user_detail();

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          user_logged_details.token_type + user_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          resolve(error);
        }
      );
  });
}

export function online___remove_cart(data, url) {
  let dataObj = {
    product_id: data.product_id,
    product_variation_id: data.product_variation_id,
    cart_item_id: data.cart_item_id,
  };
  console.log(dataObj);
  let user_logged_details = Helper.fetch_logged_user_detail();

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          user_logged_details.token_type + user_logged_details.token,
      },
      body: JSON.stringify(dataObj),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          resolve(JSON.stringify(result));
        },
        (error) => {
          resolve(error);
        }
      );
  });
}

export function cart_modify_online(dataObj, url) {
  let user_logged_details = Helper.fetch_logged_user_detail();

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          user_logged_details.token_type + user_logged_details.token,
      },
      body: JSON.stringify(dataObj),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          resolve(JSON.stringify(result));
        },
        (error) => {
          resolve(error);
        }
      );
  });
}

export function get_user_address(url) {
  let user_logged_details = Helper.fetch_logged_user_detail();

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          user_logged_details.token_type + user_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          resolve(error);
        }
      );
  });
}

export function fetch_state(url) {
  let user_logged_details = Helper.fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          user_logged_details.token_type + user_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          resolve(error);
        }
      );
  });
}

export function fetch_city(url) {
  let user_logged_details = Helper.fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          user_logged_details.token_type + user_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          resolve(error);
        }
      );
  });
}

export function user_add_address(url, data) {
  let user_logged_details = Helper.fetch_logged_user_detail();
  let dataObj = {
    address_type: data.address_type,
    address: data.address,
    phone: data.phone,
    country: 101,
    state: data.state,
    city: data.city,
    pincode: data.pincode,
  };
  console.log(user_logged_details);
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          user_logged_details.token_type + user_logged_details.token,
      },
      body: JSON.stringify(dataObj),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          resolve(error);
        }
      );
  });
}

export function add_to_wishlist(url, data) {
  console.log(data);
  let user_logged_details = Helper.fetch_logged_user_detail();
  let dataObj = {
    product_id: data.variation.product_id,
    product_variation_id: data.variation.id,
  };
  console.log(dataObj);

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          user_logged_details.token_type + user_logged_details.token,
      },
      body: JSON.stringify(dataObj),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          resolve(error);
        }
      );
  });
}

export function add_to_wishlist_slug(url, data, variation) {
  console.log(data);
  let user_logged_details = Helper.fetch_logged_user_detail();
  let dataObj = {
    product_id: data.variations[0].product_id,
    product_variation_id: variation,
  };
  console.log(dataObj);

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          user_logged_details.token_type + user_logged_details.token,
      },
      body: JSON.stringify(dataObj),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function remove_to_wishlist_slug(url, data, variation) {
  console.log(data);
  let user_logged_details = Helper.fetch_logged_user_detail();
  let dataObj = {
    product_id: data.variations[0].product_id,
    product_variation_id: variation,
  };
  console.log(dataObj);

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          user_logged_details.token_type + user_logged_details.token,
      },
      body: JSON.stringify(dataObj),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function add_to_wishlist_cart(url, data) {
  console.log(data);
  let user_logged_details = Helper.fetch_logged_user_detail();
  let dataObj = {
    product_id: data.product_id,
    product_variation_id: data.product_variation_id,
  };
  console.log(dataObj);

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          user_logged_details.token_type + user_logged_details.token,
      },
      body: JSON.stringify(dataObj),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          resolve(error);
        }
      );
  });
}

export function remove_to_wishlist(url, data) {
  console.log(data);
  let user_logged_details = Helper.fetch_logged_user_detail();
  let dataObj = {
    product_id: data.variation.product_id,
    product_variation_id: data.variation.id,
  };
  console.log(dataObj);

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          user_logged_details.token_type + user_logged_details.token,
      },
      body: JSON.stringify(dataObj),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          resolve(error);
        }
      );
  });
}

export function get_product_attributes(url) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          resolve(error);
        }
      );
  });
}

export function add_customer_review(url, dataObj) {
  let user_logged_details = Helper.fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          user_logged_details.token_type + user_logged_details.token,
      },
      body: JSON.stringify(dataObj),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          resolve(error);
        }
      );
  });
}

export function custom_cake(url, customisedCake) {
  let user_logged_details = Helper.fetch_logged_user_detail();

  const formData = new FormData();
  formData.append("name", customisedCake.name);
  formData.append("cake_image", customisedCake.cake_image);
  formData.append("custom_image", customisedCake.custom_image);
  formData.append("description", customisedCake.description);
  formData.append("addintional_info", customisedCake.addintional_info);

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        Authorization:
          user_logged_details.token_type + user_logged_details.token,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          resolve(error);
        }
      );
  });
}

export function order_confirmation_details(url) {
  let user_logged_details = Helper.fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          user_logged_details.token_type + user_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function order_history_details(url) {
  let user_logged_details = Helper.fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          user_logged_details.token_type + user_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function order_details(url) {
  let user_logged_details = Helper.fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          user_logged_details.token_type + user_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function user_profile_data(url) {
  let user_logged_details = Helper.fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          user_logged_details.token_type + user_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function user_address_delete(url, address_id) {
  let user_logged_details = Helper.fetch_logged_user_detail();
  let dataObj = {
    address_id: address_id,
  };
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          user_logged_details.token_type + user_logged_details.token,
      },
      body: JSON.stringify(dataObj),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          resolve(error);
        }
      );
  });
}

export function user_profile_update(url, data) {
  let user_logged_details = Helper.fetch_logged_user_detail();
  let dataObj = {
    fullname: data.name,
    password: data.password,
    password_confirmation: data.confirmPassword,
    security_key: data.securityKey,
    dob: data.dob,
    anniversary: data.aniversary,
    email: data.email,
    phone: data.mobile,
    phone_type: data.mobileType,
    profile_picture: "data.profile_picture",
  };

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          user_logged_details.token_type + user_logged_details.token,
      },
      body: JSON.stringify(dataObj),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          resolve(error);
        }
      );
  });
}

export function party_enquiry(url, dataObj) {
  let user_logged_details = Helper.fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          user_logged_details.token_type + user_logged_details.token,
      },
      body: JSON.stringify(dataObj),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          resolve(error);
        }
      );
  });
}

export function user_change_password(url, data) {
  let user_logged_details = Helper.fetch_logged_user_detail();

  let dataObj = {
    old_password: data.current_password,
    password: data.new_password,
    confirm_password: data.confirm_new_password,
  };

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          user_logged_details.token_type + user_logged_details.token,
      },
      body: JSON.stringify(dataObj),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          resolve(JSON.stringify(result));
        },
        (error) => {
          resolve(error);
        }
      );
  });
}

// ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN  ADMIN ADMIN ADMIN ADMIN ADMIN
// ADMIN ADMINADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMINADMIN ADMIN ADMIN ADMIN
// ADMIN ADMIN ADMINADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN

export function admin_login_api(url, data) {
  let dataObj = {
    username: data.admin_login,
    password: data.admin_password,
  };
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataObj),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          resolve(error);
        }
      );
  });
}

export function fetch_customer_list(url) {
  let admin_logged_details = Helper.admin_fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          admin_logged_details.token_type + admin_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function fetch_pincode_list(url) {
  let admin_logged_details = Helper.admin_fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          admin_logged_details.token_type + admin_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function fetch_customer_ltransactions(url) {
  let admin_logged_details = Helper.admin_fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          admin_logged_details.token_type + admin_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function customer_transactions_details(url) {
  let admin_logged_details = Helper.admin_fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          admin_logged_details.token_type + admin_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function customer_details(url) {
  let admin_logged_details = Helper.admin_fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          admin_logged_details.token_type + admin_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function dashboard_details(url) {
  let admin_logged_details = Helper.admin_fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          admin_logged_details.token_type + admin_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function customer_activation(url) {
  let admin_logged_details = Helper.admin_fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          admin_logged_details.token_type + admin_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function fetch_product_attributes_list(url) {
  let admin_logged_details = Helper.admin_fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          admin_logged_details.token_type + admin_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function fetch_product_category_list(url) {
  let admin_logged_details = Helper.admin_fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          admin_logged_details.token_type + admin_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function fetch_product_lists_list(url) {
  let admin_logged_details = Helper.admin_fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          admin_logged_details.token_type + admin_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function fetch_product_variations_list(url) {
  let admin_logged_details = Helper.admin_fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          admin_logged_details.token_type + admin_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function complete_order_details(url) {
  let admin_logged_details = Helper.admin_fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          admin_logged_details.token_type + admin_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function admin_product_variation_add_edit(url, data) {
  let admin_logged_details = Helper.admin_fetch_logged_user_detail();

  let dataObj = {
    name: data.attribute_name,
    status: data.attribute_status,
  };
  console.log(dataObj);
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          admin_logged_details.token_type + admin_logged_details.token,
      },
      body: JSON.stringify(dataObj),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          resolve(error);
        }
      );
  });
}
export function fetch_order_list(url) {
  let admin_logged_details = Helper.admin_fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          admin_logged_details.token_type + admin_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}
export function admin_order_change_status(url) {
  let admin_logged_details = Helper.admin_fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          admin_logged_details.token_type + admin_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          resolve(error);
        }
      );
  });
}

export function admin_product_variation_delete(url, data) {
  console.log(data);
  let user_logged_details = Helper.admin_fetch_logged_user_detail();
  let dataObj = {
    id: data.id,
  };
  console.log(dataObj);

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          user_logged_details.token_type + user_logged_details.token,
      },
      body: JSON.stringify(dataObj),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function admin_product_delete(url, data) {
  let user_logged_details = Helper.admin_fetch_logged_user_detail();
  let dataObj = {
    id: data,
  };

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          user_logged_details.token_type + user_logged_details.token,
      },
      body: JSON.stringify(dataObj),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function admin_category_delete(url, data) {
  let user_logged_details = Helper.admin_fetch_logged_user_detail();
  let dataObj = {
    id: data,
  };

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          user_logged_details.token_type + user_logged_details.token,
      },
      body: JSON.stringify(dataObj),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function admin_variation_delete(url) {
  let user_logged_details = Helper.admin_fetch_logged_user_detail();

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          user_logged_details.token_type + user_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function fetch_vendor_list(url) {
  let admin_logged_details = Helper.admin_fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          admin_logged_details.token_type + admin_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function fetch_custom_cake_list(url) {
  let admin_logged_details = Helper.admin_fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          admin_logged_details.token_type + admin_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}
export function fetch_custom_party_enquiry_list(url) {
  let admin_logged_details = Helper.admin_fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          admin_logged_details.token_type + admin_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function fetch_custom_cake_details(url) {
  let admin_logged_details = Helper.admin_fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          admin_logged_details.token_type + admin_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function fetch_party_enquiry_details(url) {
  let admin_logged_details = Helper.admin_fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          admin_logged_details.token_type + admin_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function fetch_tax_list(url) {
  let admin_logged_details = Helper.admin_fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          admin_logged_details.token_type + admin_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function admin_vendor_add_edit(url, data) {
  let admin_logged_details = Helper.admin_fetch_logged_user_detail();
  let dataObj = {
    attribute_id: data.attribute_id,
    attribute_name: data.attribute_name,
    attribute_status: data.attribute_status,
  };
  console.log(dataObj);
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          admin_logged_details.token_type + admin_logged_details.token,
      },
      body: JSON.stringify(dataObj),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          resolve(error);
        }
      );
  });
}

export function admin_vendor_delete(url, data) {
  console.log(data);
  let user_logged_details = Helper.fetch_logged_user_detail();
  let dataObj = {
    id: data.id,
  };
  console.log(dataObj);

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          user_logged_details.token_type + user_logged_details.token,
      },
      body: JSON.stringify(dataObj),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function admin_import_product(url, data) {
  let admin_logged_details = Helper.admin_fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        Authorization:
          admin_logged_details.token_type + admin_logged_details.token,
      },
      body: data,
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          resolve(JSON.stringify(result));
        },
        (error) => {
          resolve(error);
        }
      );
  });
}

export function fetch_shipping_address(url) {
  let user_logged_details = Helper.fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          user_logged_details.token_type + user_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function save_shipping_address(url, data) {
  let user_logged_details = Helper.fetch_logged_user_detail();
  let dataObj = {
    contact_name: data.contact_name,
    address_type: data.address_type,
    address: data.address,
    phone: data.phone,
    country_id: 101,
    state_id: data.state,
    city_id: data.city,
    postal_code: data.pincode,
  };
  console.log(user_logged_details);
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          user_logged_details.token_type + user_logged_details.token,
      },
      body: JSON.stringify(dataObj),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
        }
      );
  });
}

export function admin_product_add(url, data) {
  console.log(url);
  let admin_logged_details = Helper.admin_fetch_logged_user_detail();
  console.log(data.product_slider_image_db);

  const formData = new FormData();
  formData.append("category_id", data.category_id);
  formData.append("tax_category_id", data.tax_id);
  formData.append("type", data.type_id);
  formData.append("vendor_id", data.vendor_id);
  formData.append("name", data.product_name);
  formData.append("description", data.description);
  formData.append("addintional_info", data.additional_description);
  formData.append("deliverable_hours", data.delivery_time);
  formData.append("feature_image", data.product_feature_image_db);
  formData.append("slider_images_length", data.product_slider_image_db.length);
  formData.append("weight", data.weight);
  formData.append("unit", data.unit);
  formData.append("price", data.price);
  formData.append("status", data.status);
  formData.append("attribuites", JSON.stringify(data.attribute_id));

  console.log(data.product_slider_image_db.length);
  data.product_slider_image_db.map((img, index) => {
    let postfix = index + 1;
    formData.append("slider_images" + postfix + "", img.image_path);
  });

  console.log(formData);

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        Authorization:
          admin_logged_details.token_type + admin_logged_details.token,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          resolve(error);
        }
      );
  });
}

export function admin_category_add(url, data) {
  let admin_logged_details = Helper.admin_fetch_logged_user_detail();
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("image", data.category_image_db);
  formData.append("status", data.status);
  console.log(formData);

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        Authorization:
          admin_logged_details.token_type + admin_logged_details.token,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          resolve(error);
        }
      );
  });
}

export function fetch_product_details(url) {
  let admin_logged_details = Helper.admin_fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          admin_logged_details.token_type + admin_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function fetch_category_details(url) {
  let admin_logged_details = Helper.admin_fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          admin_logged_details.token_type + admin_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function slider_delete_api(url) {
  let admin_logged_details = Helper.admin_fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          admin_logged_details.token_type + admin_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function fetch_variation_details(url) {
  let admin_logged_details = Helper.admin_fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          admin_logged_details.token_type + admin_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}
export function admin_variation_add_edit(url, dataObj) {
  let admin_logged_details = Helper.admin_fetch_logged_user_detail();
  console.log(dataObj);
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          admin_logged_details.token_type + admin_logged_details.token,
      },
      body: JSON.stringify(dataObj),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          resolve(error);
        }
      );
  });
}


export function fetch_csv(url) {
  let admin_logged_details = Helper.admin_fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          admin_logged_details.token_type + admin_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function fetch_top_menus(url) {
  let admin_logged_details = Helper.admin_fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          admin_logged_details.token_type + admin_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}



export function fetch_admin_top_menus(url) {
  let admin_logged_details = Helper.admin_fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          admin_logged_details.token_type + admin_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function edit_admin_top_menus(url, bodyParams) {
  let admin_logged_details = Helper.admin_fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        Authorization:
          admin_logged_details.token_type +" "+ admin_logged_details.token,
      },
      body: bodyParams,
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function add_admin_top_menus(url, bodyParams) {
  let admin_logged_details = Helper.admin_fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        Authorization:
          admin_logged_details.token_type +" "+ admin_logged_details.token,
      },
      body: bodyParams,
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function get_banners(url) {
  let admin_logged_details = Helper.admin_fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          admin_logged_details.token_type + " " +admin_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function save_top_menu_order_changes(url, bodyRequest) {
  let admin_logged_details = Helper.admin_fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          admin_logged_details.token_type + " " + admin_logged_details.token,
      },
      body: JSON.stringify(bodyRequest),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}



export function add_edit_admin_banner(url, bodyParams) {
  let admin_logged_details = Helper.admin_fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        Authorization:
          admin_logged_details.token_type + admin_logged_details.token,
      },
      body: bodyParams,
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function delete_admin_banner(url) {
  let admin_logged_details = Helper.admin_fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          admin_logged_details.token_type + admin_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function admin_add_widget(url, widgetName) {
  let admin_logged_details = Helper.admin_fetch_logged_user_detail();
  console.log(widgetName);
  let requestPayload = {
    "name": widgetName,
  };
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          admin_logged_details.token_type + admin_logged_details.token,
      },
      body: JSON.stringify(requestPayload),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          resolve(error);
        }
      );
  });
}

export function add_edit_admin_slider(url, bodyParams) {
  let admin_logged_details = Helper.admin_fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        Authorization:
          admin_logged_details.token_type + admin_logged_details.token,
      },
      body: bodyParams,
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function fetch_widget_list(url) {
  let admin_logged_details = Helper.admin_fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          admin_logged_details.token_type + admin_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function admin_widget_order_save(url, requestPayload) {
  let admin_logged_details = Helper.admin_fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          admin_logged_details.token_type + admin_logged_details.token,
      },
      body: JSON.stringify(requestPayload),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          resolve(error);
        }
      );
  });
}

export function fetch_widget_details(url) {
  let admin_logged_details = Helper.admin_fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          admin_logged_details.token_type + admin_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function delete_widget(url) {
  let admin_logged_details = Helper.admin_fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          admin_logged_details.token_type + admin_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function edit_widget(url, requestPayload) {
  let admin_logged_details = Helper.admin_fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          admin_logged_details.token_type + admin_logged_details.token,
      },

      body: JSON.stringify(requestPayload),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log(error);
          resolve(error);
        }
      );
  });
}

export function get_widget_list(url) {
  let user_logged_details = Helper.fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          user_logged_details.token_type + user_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          resolve(JSON.stringify(result));
        },
        (error) => {
          resolve(error);
        }
      );
  });
}


export function get_mobile_banner_list(url) {
  let user_logged_details = Helper.fetch_logged_user_detail();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          user_logged_details.token_type + user_logged_details.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          resolve(JSON.stringify(result));
        },
        (error) => {
          resolve(error);
        }
      );
  });
}