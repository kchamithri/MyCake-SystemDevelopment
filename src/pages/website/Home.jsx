import React from "react";
import Footer from "../../Components/Website/Footer";
import HomeCards from "../../Components/Website/HomeCards";
import LongCard from "../../Components/Website/LongCard";

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
      <div className="container mt-4">
        <h2
          style={{
            color: "#863A6F",
            fontFamily: "sans-serif",
            fontWeight: "5px",
          }}
        >
          Most Popular
        </h2>

        <div className="row row-cols-1 row-cols-md-4 g-3">
          <HomeCards
            image="Assets/image6.webp"
            name="Chocolate Truffle Cake"
            description="This rich and super smooth chocolate cake is full of chocolate ganache and soft chocolate sponge. An authentic chocolate truffle cake melts as soon as it goes in your mouth, leaving the taste of pure chocolate."
          />
          <HomeCards
            image="Assets/cake3.jpg"
            name=" Strawberry-Rose Snack Cake"
            description="It's always wine o' clock with this easy strawberry cake. The pretty pink comes from the freeze-dried strawberries and a generous splash of rosé. "
          />
          <HomeCards
            image="Assets/cake6.jpg"
            altName="cake image"
            name="Classic Coffee Cake"
            description="A delicious all-in-one coffee sponge topped with smooth coffee buttercream. Simple to make and packed full of flavour."
          />
          <HomeCards
            image="Assets/image7.jpg"
            name="Chocolate Buttercream Cake"
            description="This kid-friendly cake recipe starts with a basic yellow cake, which is topped with the fudgiest buttercream made from semisweet chocolate, heavy cream, corn syrup, and unsalted butter."
          />
        </div>
      </div>
      <LongCard title={"On Your Special Day"} image={"Assets/wedding1.webp"} />
      <LongCard
        title={"Celebrate Your Loved Ones Big Day"}
        image={"Assets/birthday3.jpeg"}
      />
      <LongCard
        title={"On Your Companys Big Day"}
        image={"Assets/company.webp"}
      />
      <LongCard title={"Customize Your Cake"} image={"Assets/custom.jpg"} />

      <Footer />
    </div>
  );
};

export default Home;
