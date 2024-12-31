import React, { useState } from "react";
import "./SelectedApplicantCard.css";
import { useNavigate } from "react-router-dom";

const SelectedApplicantCard = ({ name, email, _id, handleRecruit, handleReject }) => {
  const [detail, setDetail] = useState(false);
  const navigate = useNavigate();

  const handleViewProfile = () => {
    if (_id) {
      navigate(`/view_profile/${_id}`);
    }
  };

  return (
    <div className="card mb-4">
      {name && email ? (
        <div className="text-left">
              <p className="name">{name}</p>
              <p className="email">{email}</p>
              <div className="mt-6 flex gap-6">
                {detail ? <button className="view-button" onClick={handleViewProfile}>
                  View Profile
                </button> : <p></p>}
              </div>
        </div>
      ) : (
        <div className="text-left">No Applicant</div>
      )}
    </div>
  );
};


export default SelectedApplicantCard;
