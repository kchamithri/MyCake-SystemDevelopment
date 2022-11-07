import React from "react";

const Cart = () => {
  return (
    <div className="container">
      <div className="row">
        <h3>Product Details</h3>
      </div>
      <div className="row">
        <div class="table-responsive">
          <table class="table table-borderless">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="w-25">
                  <img
                    className="rounded"
                    src="Assets/cake2.jpg"
                    alt="cake"
                    style={{ width: "70%" }}
                  ></img>
                </td>
                <td className="align-middle fs-4 w-25">
                  Chocolate Dripped Cake
                </td>
                <td className="align-middle fs-4 auto">Pricesssss</td>
                <td className="align-middle fs-4 w-25">quantity</td>
                <td className="align-middle fs-4 w-25">total</td>
                <td className="align-middle">
                  <i class="fa fa-times" aria-hidden="true"></i>
                </td>
              </tr>
              <tr>
                <th>2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th>3</th>
                <td colspan="2">Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Cart;
