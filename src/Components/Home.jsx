import React from "react";

const Home = () => {
  return (
    <div>
      <section id="home">
        <div className="container">
          <div className="col-3">
            <form class="form-inline pt-2">
              <input
                class="form-control mr-sm-2 rounded-pill"
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
                loream is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
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
    </div>
  );
};

export default Home;
