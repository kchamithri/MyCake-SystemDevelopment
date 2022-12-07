import React, { useEffect } from "react";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import Card from "../../Components/Website/Card";
import ProductViewCard from "../../Components/Website/ZoomProduct/ProductViewCard";
import ProductViewModal from "../../Components/Website/ZoomProduct/ProductViewModal";
import { ReactNotifications, Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import swal from "@sweetalert/with-react";

const CelebrationCake = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [addToCart, setAddToCart] = useState([]);
  const [filter, setFilter] = useState([]);
  const [products, setProducts] = useState([]);
  const [modalData, setModalData] = useState({});

  useEffect(() => {
    fetch("/celebrationCakes", {
      method: "POST",
      content: "application/json",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setProducts(data.products);
      })
      .catch((error) => {
        console.log("error fetching:", error);
      });
    // localStorage.clear();
  }, []);

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

  const handleAddToCart = async (productId, price) => {
    const ID = productId;
    console.log(ID);
    console.log(localStorage.getItem("userId"));

    if (localStorage.getItem("userId")) {
      try {
        const res = await fetch("/cart/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: localStorage.getItem("userId"),
            product: productId,
            quantity: "1",
            total: price,
          }),
        });
        if (res.status === 400 || !res) {
          window.alert("Invalid Credentials");
        } else {
          Store.addNotification({
            title: "Successfully Added!",

            type: "info",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "animate__fadeIn"],
            animationOut: ["animated", "animate__fadeOut"],
            dismiss: {
              duration: 2000,
            },
          });
        }
      } catch (error) {
        console.log("ERROR IS", error);
      }
    } else {
      swal("Error", "You must Log In to the system!", "warning", {
        button: false,
        timer: 1500,
      }).then((value) => {
        navigate("/login");
      });
    }

    // setAddToCart([...addToCart, { id }]);
    // console.log(addToCart);
  };

  const openModal = (item) => {
    console.log(item);
    setModalData(item);

    setModalOpen(true);
  };

  useEffect(() => {
    console.log(modalData);
  }, [modalData]);

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div>
      <ReactNotifications />

      <div className="pageStyle container mt-4">
        <ProductViewModal show={modalOpen} close={closeModal}>
          <ProductViewCard
            mainImage={modalData.mainImage}
            optionalImage1={modalData.optionalImage1}
            optionalImage2={modalData.optionalImage2}
            name={modalData.name}
            price={modalData.price}
            description={modalData.description}
            weight={modalData.weight}
          />
        </ProductViewModal>
        <div className="d-flex justify-content-center align-items-center flex-md-column mb-4">
          <h2>Celebration Cakes</h2>
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
                    id={item._id}
                    image={item.mainImage}
                    name={item.name}
                    price={item.price}
                    handleModal={() => openModal(item)}
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
