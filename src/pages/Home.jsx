import React from "react";
import Card from "../Components/Card";

const Home = () => {
  return (
    <div>
      <section id="home">
        <div className="container">
          <div className="col-3">
            <form className="form-inline pt-2">
              <input
                className="form-control mr-sm-2 rounded-pill"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </form>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-8 mt-5">
              <h1 className="display-4 fw-bolder mb-4 text-center text-white">
                Bake with Love
              </h1>
              <p className="lead text-center fs-4 mb-5 text-white">
                "Cakes are special. Every birthday, every celebration ends with
                something sweet, a cake, and people remember. It's all about the
                memories."
              </p>

              <div className="buttons d-flex justify-content-center">
                <button className="btn btn-light rounded-pill px-4 py-2">
                  View
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container mt-2">
        <h1 style={{ color: "pink" }}>Most Popular</h1>

        <div className="row row-cols-1 row-cols-md-4 g-4">
          <Card
            image="Assets/cake2.jpg"
            name="card title"
            description="This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer."
          />
          <Card
            image="Assets/cake3.jpg"
            name="card title"
            description="This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer."
          />
          <Card
            image="Assets/cake4.jpg"
            altName="cake image"
            name="card title"
            description="This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer."
          />
          <Card
            image="Assets/kids.jpg"
            name="card title"
            description="This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer."
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
