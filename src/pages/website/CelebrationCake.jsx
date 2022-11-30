import React from "react";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Card from "../../Components/Website/Card";
import ProductViewCard from "../../Components/Website/ZoomProduct/ProductViewCard";
import ProductViewModal from "../../Components/Website/ZoomProduct/ProductViewModal";
import products from "../../Data/products";

const CelebrationCake = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [addToCart, setAddToCart] = useState([]);
  const [filter, setFilter] = useState([]);
  const [showAlert, setShowAlert] = useState("none");
  let modalInfo = [];

  const handleChecked = (e) => {
    let updatedList = [...filter];
    if (e.target.checked) {
      updatedList = [...filter, e.target.value];
    } else {
      updatedList.splice(filter.indexOf(e.target.value), 1);
    }
    setFilter(updatedList);
    console.log(filter);
  };

  const handleAddToCart = (id) => {
    const ID = id;
    console.log(ID);
    setShowAlert(true);
    setAddToCart([...addToCart, { id }]);
    console.log(addToCart);
    setTimeout(() => {
      setShowAlert("none");
    }, 1000);
  };

  const openModal = (id) => {
    console.log(id);
    modalInfo = products.filter((item) => item.id === id);

    console.log(modalInfo[0].mainImage);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
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
        <Alert key="info" variant="info" style={{ display: showAlert }}>
          Added to the cart
        </Alert>

        <ProductViewModal show={modalOpen} close={closeModal}>
          <ProductViewCard
            image={modalInfo.mainImage}
            optionalImages={["Assets/cake3.jpg", "Assets/cake4.jpg"]}
            name="Swan Chocolate Cake"
            price="Rs.5000"
            description="lorem10"
            weight="3kg"
          />
        </ProductViewModal>
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
                  value="Milk Chocolate"
                  onChange={handleChecked}
                />
                <label class="form-check-label" for="defaultCheck1">
                  Birthday Cakes
                </label>
              </div>
              <div class="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="Strawberry"
                  id="defaultCheck2"
                  onChange={handleChecked}
                />
                <label class="form-check-label" for="defaultCheck2">
                  Wedding Cakes
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
                  Kids Birthday Cakes
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
                  Anniversary Cakes
                </label>
              </div>
            </div>
            <div className="d-flex flex-column mt-4">
              <h4>Flavor</h4>
              <div class="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="Milk Chocolate"
                  onChange={handleChecked}
                />
                <label class="form-check-label" for="defaultCheck1">
                  Milk Chocolate
                </label>
              </div>
              <div class="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="Strawberry"
                  id="defaultCheck2"
                  onChange={handleChecked}
                />
                <label class="form-check-label" for="defaultCheck2">
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
              {products.map((item) => {
                return (
                  <Card
                    id={item.id}
                    image={item.mainImage}
                    name={item.name}
                    price={item.price}
                    handleModal={openModal}
                    handleAddToCart={handleAddToCart}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CelebrationCake;
