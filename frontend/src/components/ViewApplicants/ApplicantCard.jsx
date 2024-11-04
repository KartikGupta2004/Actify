import React from "react";
import { useState } from "react";
import "./ApplicantCard.css";
// import dropdown from "../../../public/dropdown.png";
const ApplicantCard = (props) => {
  const [detail, setDetail] = useState(false);
  return (
    <div className={`card`}>
      {detail ? (
        <div className='text-left'>
          <p className='name'>{props.name}</p>
          <p className='email'>{props.email}</p>
          <p className='email'>{props.skills}</p>
          <p className='email'>{props.about}</p>
          <div className="mt-6 flex gap-6">
            <button class='recruit-button'>RECRUIT</button>
            <button class='reject-button'>REJECT</button>
          </div>
        </div>
      ) : (
        <div className='text-left'>
          <p className='name'>{props.name}</p>
          <p className='email'>{props.email}</p>
        </div>
      )}
      <div className='img-cont'>
        <img
          src='/dropdown.png'
          alt='dropdown'
          onClick={() => {
            setDetail(!detail);
          }}
          className={`dropdown-arrow ${detail ? "dropdown-arrow-clicked" : ""}`}
        />
      </div>
    </div>
  );
};

export default ApplicantCard;
