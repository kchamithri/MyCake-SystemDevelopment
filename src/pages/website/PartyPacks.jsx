import React from "react";
import { NavLink } from "react-router-dom";
import Card from "../../Components/Website/Card";

const PartyPacks = () => {
  return (
    <div>
      <div className="pageStyle container mt-4">
        <div className="d-flex justify-content-center align-items-center flex-md-column mb-4">
          <h2>Party Packs</h2>
          {/* <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab,
            voluptatem!
          </p> */}
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
              <h4>Flavor</h4>
              <div class="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="defaultCheck1"
                />
                <label class="form-check-label" for="defaultCheck1">
                  Chicken
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
                  Egg
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
                  Fish
                </label>
              </div>
            </div>
          </div>
          <div className="col-md-10">
            <div className="row row-cols-1 row-cols-md-4 g-4">
              <Card
                image="Assets/sandwich.jpg"
                name="Chicken Sandwich"
                price="500"
              />

              <Card
                image="Assets/cutlet.jpg"
                altName="Fish Cutlet"
                name="Fish Cutlet"
                price="100"
              />
              <Card
                image="Assets/dinner_rolls.jpg"
                name="Dinner Rolls"
                price="50"
              />
              <Card
                image="Assets/puff_pastry.jpg"
                name="Puff Pastry"
                price="150"
              />
              <Card image="Assets/burger.jpg" name="Hamburger" price="300" />
              <Card
                image="Assets/eggsandwich.jpg"
                name="Egg Sandwich"
                price="350"
              />
              <Card
                image="Assets/rolls.jpg"
                altName="Rolls"
                name="Vegetable Rolls"
                price="100"
              />
              <Card
                image="Assets/burgerBun.jpg"
                name="Chicken Burger"
                price="500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartyPacks;
