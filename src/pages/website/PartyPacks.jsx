import React from "react";
import { NavLink } from "react-router-dom";
import Card from "../../Components/Website/Card";

const PartyPacks = () => {
  return (
    <div>
      <div className="d-flex justify-content-end align-items-center mr-2">
        <NavLink to="/cart">
          <i
            class="fa fa-shopping-cart fa-2x mx-2"
            aria-hidden="true"
            style={{ color: "black" }}
          ></i>
        </NavLink>
      </div>
      <div className="pageStyle container">
        <div className="d-flex justify-content-center align-items-center flex-md-column mb-4">
          <h2>Party Packs</h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab,
            voluptatem!
          </p>
        </div>
        <div className="row">
          <div className="col-md-2">
            <div className="d-flex flex-column">
              <h4>Type</h4>
              <div class="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="defaultCheck1"
                />
                <label class="form-check-label" for="defaultCheck1">
                  Sandwiches
                </label>
              </div>
              <div class="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="defaultCheck1"
                />
                <label class="form-check-label" for="defaultCheck1">
                  Cutlet
                </label>
              </div>
              <div class="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="defaultCheck1"
                />
                <label class="form-check-label" for="defaultCheck1">
                  Buns
                </label>
              </div>
            </div>
            <div className="d-flex flex-column mt-4">
              <h4>Price</h4>
              <div class="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="defaultCheck1"
                />
                <label class="form-check-label" for="defaultCheck1">
                  Default checkbox
                </label>
              </div>
              <div class="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="defaultCheck1"
                />
                <label class="form-check-label" for="defaultCheck1">
                  Default checkbox
                </label>
              </div>
              <div class="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="defaultCheck1"
                />
                <label class="form-check-label" for="defaultCheck1">
                  Default checkbox
                </label>
              </div>
            </div>
          </div>
          <div className="col-md-10">
            <div className="row row-cols-1 row-cols-md-4 g-4">
              <Card
                image="Assets/cake2.jpg"
                name="Swan Chocolate Cake"
                price="Rs.5000"
              />
              <Card
                image="Assets/cake3.jpg"
                name="card title"
                price="Rs.5000"
              />
              <Card
                image="Assets/cake4.jpg"
                altName="cake image"
                name="card title"
                price="Rs.5000"
              />
              <Card
                image="Assets/cake2.jpg"
                name="card title"
                price="Rs.5000"
              />
              <Card
                image="Assets/cake2.jpg"
                name="card title"
                price="Rs.5000"
              />
              <Card
                image="Assets/cake3.jpg"
                name="card title"
                price="Rs.5000"
              />
              <Card
                image="Assets/cake4.jpg"
                altName="cake image"
                name="card title"
                price="Rs.5000"
              />
              <Card
                image="Assets/cake2.jpg"
                name="card title"
                price="Rs.5000"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartyPacks;
