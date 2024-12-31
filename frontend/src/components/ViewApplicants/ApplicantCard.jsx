import React, { useState } from "react";
import "./ApplicantCard.css";
import { useNavigate } from "react-router-dom";

const ApplicantCard = ({ name, email, _id, handleRecruit, handleReject }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedAction, setClickedAction] = useState(""); // Track which button was clicked
  const navigate = useNavigate();

  const handleViewProfile = () => {
    if (_id) {
      navigate(`/view_profile/${_id}`);
    }
  };

  const handleCancelStatus = () => {
    setIsModalOpen(false);
    setClickedAction(""); // Reset action when modal is canceled
  };

  const handleConfirmStatus = async () => {
    if (clickedAction === "recruit") {
      handleRecruit?.(_id); // Call the recruit handler
    } else if (clickedAction === "reject") {
      handleReject?.(_id); // Call the reject handler
    }
    setIsModalOpen(false); // Close the modal after confirming
    setClickedAction(""); // Reset action
  };

  const handleRecruitClick = () => {
    setClickedAction("recruit"); // Set action as recruit
    setIsModalOpen(true); // Open the modal
  };

  const handleRejectClick = () => {
    setClickedAction("reject"); // Set action as reject
    setIsModalOpen(true); // Open the modal
  };

  return (
    <div className="card">
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Are You Sure?</h2>
            <div className="mt-4 flex justify-between">
              <button
                onClick={handleConfirmStatus}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Yes
              </button>
              <button
                onClick={handleCancelStatus}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {name && email ? (
        <div className="text-left">
          <p className="name">{name}</p>
          <p className="email">{email}</p>
          <div className="mt-6 flex gap-6">
            <button className="view-button" onClick={handleViewProfile}>
              View Profile
            </button>
            <button className="recruit-button" onClick={handleRecruitClick}>
              RECRUIT
            </button>
            <button className="reject-button" onClick={handleRejectClick}>
              REJECT
            </button>
          </div>
        </div>
      ) : (
        <div className="text-left">No Applicant</div>
      )}
    </div>
  );
};

export default ApplicantCard;
