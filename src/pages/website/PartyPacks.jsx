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

const PartyPacks = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [addToCart, setAddToCart] = useState([]);
  const [filterItems, setFilter] = useState({
    type: [],
    flavor: [],
    price: [],
  });
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [pastryTypes, setPastryTypes] = useState([]);
  const [pastryFlavors, setPastryFlavors] = useState([]);
  const [modalData, setModalData] = useState({});
  const [ranges, setRanges] = useState([]);

  useEffect(() => {
    fetch("/partyPacks", {
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
        let types = [];
        let flavors = [];
        let priceList = [];
        data.products.map((product) => {
          types.push(product.type);
          flavors.push(product.flavor);
          priceList.push(product.price);
        });

        const highest = Math.max(...priceList);
        const smallest = Math.min(...priceList);
        console.log(highest, smallest);
        let start = smallest;
        let end = start + 500;
        while (end <= highest) {
          ranges.push(`${start}-${end}`);
          start += 500;
          end += 500;
        }
        if (end >= highest) {
          ranges.push(`${start}-${end}`);
        }

        let uniqueTypes = [...new Set(types)];
        let uniqueFlavors = [...new Set(flavors)];
        setPastryTypes(uniqueTypes);
        setPastryFlavors(uniqueFlavors);
        setProducts(data.products);
        setFilteredProducts(data.products);
      })
      .catch((error) => {
        console.log("error fetching:", error);
      });
    // localStorage.clear();
  }, []);

  const handleTypeChecked = (e) => {
    let updatedList = { ...filterItems };
    if (e.target.checked) {
      updatedList.type.push(e.target.value);
    } else {
      let typeList = updatedList.type.filter((val) => val !== e.target.value);
      updatedList.type = typeList;
    }
    setFilter({ ...filterItems, type: updatedList.type });
  };

  const handleFalvorChecked = (e) => {
    let updatedList = { ...filterItems };
    if (e.target.checked) {
      updatedList.flavor.push(e.target.value);
    } else {
      let flavorList = updatedList.flavor.filter(
        (val) => val !== e.target.value
      );
      updatedList.flavor = flavorList;
    }
    setFilter({ ...filterItems, flavor: updatedList.flavor });
  };

  const handlePriceChecked = (e) => {
    let updatedList = { ...filterItems };
    if (e.target.checked) {
      updatedList.price.push(e.target.value);
    } else {
      let priceList = updatedList.price.filter((val) => val !== e.target.value);
      updatedList.price = priceList;
    }
    setFilter({ ...filterItems, price: updatedList.price });
  };

  useEffect(() => {
    console.log(filterItems);
  }, [filterItems]);

  useEffect(() => {
    const newFilteredArray = products.filter((product) => {
      // Check if all the values in the query match the corresponding values in the product
      return (
        filterItems.type.every((type) => product.type.includes(type)) &&
        filterItems.flavor.every((flavor) => product.flavor.includes(flavor)) &&
        filterItems.price.every((priceRange) => {
          const [min, max] = priceRange.split("-");
          const productPrice = parseFloat(product.price);
          return (
            productPrice >= parseFloat(min) && productPrice <= parseFloat(max)
          );
        })
      );
    });
    setFilteredProducts(newFilteredArray);

    if (filterItems.type.length === 0) {
      if (filterItems.flavor.length === 0) {
        if (filterItems.price.length === 0) {
          setFilteredProducts(products);
        }
      }
    }
  }, [filterItems]);

  const handleAddToCart = async (productId, price) => {
    const ID = productId;
    console.log(ID);
    console.log(localStorage.getItem("userId"));

    if (localStorage.getItem("userId")) {
      try {
        const res = await fetch("admin/cart/add", {
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
          <h2>Party Packs</h2>
        </div>
        <div className="row">
          <div className="col-md-2">
            <div className="d-flex flex-column">
              {pastryTypes.length !== 0 ? <h4>Type</h4> : ""}
              {pastryTypes.map((type) => {
                return (
                  <div class="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={type}
                      onChange={handleTypeChecked}
                    />
                    <label class="form-check-label" for="defaultCheck1">
                      {type}
                    </label>
                  </div>
                );
              })}
            </div>
            <div className="d-flex flex-column mt-4">
              {pastryFlavors.length !== 0 ? <h4>Flavor</h4> : ""}

              {pastryFlavors.map((flavor) => {
                return (
                  <div class="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={flavor}
                      onChange={handleFalvorChecked}
                    />
                    <label class="form-check-label" for="defaultCheck1">
                      {flavor}
                    </label>
                  </div>
                );
              })}
            </div>
            <div className="d-flex flex-column mt-4">
              {ranges.length !== 0 ? <h4>Price (LKR)</h4> : ""}
              {ranges.map((range) => {
                return (
                  <div class="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={range}
                      onChange={handlePriceChecked}
                    />
                    <label class="form-check-label" for="defaultCheck1">
                      {range}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-md-10">
            <div className="row row-cols-1 row-cols-md-4 g-4">
              {filteredProducts.map((item) => {
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

export default PartyPacks;
