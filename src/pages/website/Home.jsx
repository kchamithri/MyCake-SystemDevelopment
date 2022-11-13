import React from "react";
import Card from "../../Components/Card";
import HomeCards from "../../Components/HomeCards";
import LongCard from "../../Components/LongCard";

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

        <div className="row row-cols-1 row-cols-md-4 g-3 ">
          <HomeCards
            image="Assets/cake2.jpg"
            name="card title"
            description="This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer."
          />
          <HomeCards
            image="Assets/cake3.jpg"
            name="card title"
            description="This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer."
          />
          <HomeCards
            image="Assets/cake4.jpg"
            altName="cake image"
            name="card title"
            description="This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer."
          />
          <HomeCards
            image="Assets/kids.jpg"
            name="card title"
            description="This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer."
          />
        </div>
      </div>
      <LongCard title={"On Your Special Day"} image={"Assets/cake2.jpg"} />
      <LongCard
        title={"Celebrate Your Loved Ones Big Day"}
        image={"Assets/cake2.jpg"}
      />
      <LongCard title={"On Your Companys Big Day"} image={"Assets/cake2.jpg"} />
      <LongCard title={"Customize Your Cake"} image={"Assets/cake2.jpg"} />
    </div>
  );
};

export default Home;
