import React from 'react';

const RestarentCards = ({ restaurent }) => {
  return (
    <div className="card bg-base-100 image-full w-96 shadow-xl">
        <figure>
            <img
                src={restaurent.image || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
                alt={restaurent.name || "Restaurant"}
            />
        </figure>
        <div className="card-body">
            <h2 className="card-title">{restaurent.name}</h2>
            <p>Category: {restaurent.category}</p>
            <p>Location: {restaurent.place}</p>
            <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
            </div>
        </div>
    </div>
  );
}

export default RestarentCards;
