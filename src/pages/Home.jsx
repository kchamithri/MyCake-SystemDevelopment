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
        
          <h1 style={{color:"pink"}}>Most Popular</h1>
        
      <div class="row row-cols-1 row-cols-md-4 g-4">
        <div class="col">
          <div class="card h-100">
            <img src="Assets/cake2.jpg" class="card-img-top" alt="..." style={{height:"250px"}}/>
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <img src="Assets/cake3.jpg" class="card-img-top" alt="..." style={{height:"250px"}}/>
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">This is a short card.</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <img src="Assets/cake4.jpg" class="card-img-top" alt="..." style={{height:"250px"}}/>
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content.
              </p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <img src="Assets/kids.jpg" class="card-img-top" alt="..." style={{height:"250px"}}/>
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Home;
