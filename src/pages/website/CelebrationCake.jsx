import React from "react";
import Card from "../../Components/Card";

const CelebrationCake = () => {
  return (
    <div className="pageStyle container my-4">
      <div className="d-flex justify-content-center align-items-center flex-md-column mb-4">
        <h2>Celebration Cakes</h2>
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
                Milk Chocolate
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
                Strawberry
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
                Cheesecake
              </label>
            </div>
          </div>
          <div className="d-flex flex-column mt-4">
            <h4>Price (LKR)</h4>
            <div class="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="defaultCheck1"
              />
              <label class="form-check-label" for="defaultCheck1">
                900 - 1500
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
                1500 - 2000
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
                2000 - 2500
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
            <Card image="Assets/cake3.jpg" name="card title" price="Rs.5000" />
            <Card
              image="Assets/cake4.jpg"
              altName="cake image"
              name="card title"
              price="Rs.5000"
            />
            <Card image="Assets/cake2.jpg" name="card title" price="Rs.5000" />
            <Card image="Assets/cake2.jpg" name="card title" price="Rs.5000" />
            <Card image="Assets/cake3.jpg" name="card title" price="Rs.5000" />
            <Card
              image="Assets/cake4.jpg"
              altName="cake image"
              name="card title"
              price="Rs.5000"
            />
            <Card image="Assets/cake2.jpg" name="card title" price="Rs.5000" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CelebrationCake;
