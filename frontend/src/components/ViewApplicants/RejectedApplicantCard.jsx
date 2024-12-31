import React, { useState } from "react";
import "./RejectedApplicantCard.css";

const RejectedApplicantCard = ({ name, email}) => {

  return (
    <div className="card mb-4">
      {name && email ? (
        <div className="text-left">
              <p className="name">{name}</p>
              <p className="email">{email}</p>
        </div>
      ) : (
        <div className="text-left">No Applicant</div>
      )}
    </div>
  );
};


export default RejectedApplicantCard;
