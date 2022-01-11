import React from "react";
import { connect } from "react-redux";
import { wishList } from "../redux/Actions/wishListAction";

const WishList = () => {
  return (
    <div className="container mt-5">
      <p>wishlist</p>
      <p>BookTitle:</p>
      <p>rent for number of weeks:</p>
    </div>
  );
};
const mapDispatchToprops = (dispatch) => {
  return {
    register: (data) => dispatch(wishList(data)),
  };
};

export default connect(null, mapDispatchToprops)(WishList);
