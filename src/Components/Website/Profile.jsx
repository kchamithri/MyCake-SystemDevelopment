import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Profile = () => {
  const [showPendingOrders, setShowPendingOrders] = useState(true);
  const [showDeliveredOrders, setShowDeliveredOrders] = useState(false);

  return (
    <div>
      <div className="container mt-4">
        <div className="row">
          <div className="col-lg-1 col-sm-6">
            <i class="fa fa-user-circle-o fa-5x" aria-hidden="true"></i>
          </div>
          <div className="col-lg-4 col-sm-6">
            <ul style={{ listStyleType: "none" }}>
              <li>Kosala Chamithri</li>
              <li>kosala@gmail.com</li>
              <li>0785643567</li>
            </ul>
          </div>
          <div className="col-lg-3 col-sm-6 ">
            <ul style={{ listStyleType: "none", textAlign: "center" }}>
              <li className="h4"> Pending Orders</li>
              <li className="h4">1</li>
            </ul>
          </div>
          <div className="col-lg-3 col-sm-6">
            <ul style={{ listStyleType: "none", textAlign: "center" }}>
              <li className="h4"> Delivered Orders</li>
              <li className="h4">2</li>
            </ul>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-lg-4 col-sm-6">
            <div class="list-group">
              <button
                type="button"
                className={
                  showPendingOrders
                    ? "list-group-item list-group-item-action active"
                    : "list-group-item list-group-item-action"
                }
                aria-current="true"
                onClick={() => {
                  setShowPendingOrders(true);
                  setShowDeliveredOrders(false);
                }}
              >
                Pending Orders
              </button>
              <button
                type="button"
                className={
                  showDeliveredOrders
                    ? "list-group-item list-group-item-action active"
                    : "list-group-item list-group-item-action"
                }
                onClick={() => {
                  setShowDeliveredOrders(true);
                  setShowPendingOrders(false);
                }}
              >
                Delivered Orders
              </button>
            </div>
          </div>
          {showPendingOrders ? (
            <div className="col-lg-8 col-sm-6">
              <div className="row">
                <div className="col-lg-3">
                  <ul style={{ listStyleType: "none", fontSize: "18px" }}>
                    <li className="mb-2"> Order Placed On: </li>
                    <li className="mb-2">Order Number:</li>
                    <li className="mb-2">Recepient:</li>
                    <li className="mb-2">Recepient Contact:</li>
                    <li className="mb-2">Delivery Date:</li>
                    <li className="mb-2">Delivery Address:</li>
                    <li className="mb-2">Delivery Message:</li>
                    <li className="mb-2">Total(Rs):</li>
                  </ul>
                </div>
                <div className="col-lg-6">
                  <ul style={{ listStyleType: "none", fontSize: "18px" }}>
                    <li className="mb-2">23/11/2022 </li>
                    <li className="mb-2">12</li>
                    <li className="mb-2">Imasha Nanayakkara</li>
                    <li className="mb-2">0763456789</li>
                    <li className="mb-2">23/11/2022</li>
                    <li className="mb-2">Horana, Kalutara</li>
                    <li className="mb-2">Happy Birthday Imasha!!</li>
                    <li className="mb-2">4000</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {showDeliveredOrders ? (
            <div className="col-lg-8 col-sm-6">
              <div className="row">
                <div className="col-lg-3">
                  <ul style={{ listStyleType: "none", fontSize: "18px" }}>
                    <li className="mb-2"> Order Placed On: </li>
                    <li className="mb-2">Order Number:</li>
                    <li className="mb-2">Recepient:</li>
                    <li className="mb-2">Recepient Contact:</li>
                    <li className="mb-2">Delivery Date:</li>
                    <li className="mb-2">Delivery Address:</li>
                    <li className="mb-2">Delivery Message:</li>
                    <li className="mb-2">Total(Rs):</li>
                  </ul>
                </div>
                <div className="col-lg-6">
                  <ul style={{ listStyleType: "none", fontSize: "18px" }}>
                    <li className="mb-2">23/11/2022 </li>
                    <li className="mb-2">12</li>
                    <li className="mb-2">Imasha Nanayakkara</li>
                    <li className="mb-2">0763456789</li>
                    <li className="mb-2">23/11/2022</li>
                    <li className="mb-2">Horana, Kalutara</li>
                    <li className="mb-2">Happy Birthday Imashasss!!</li>
                    <li className="mb-2">4000</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
