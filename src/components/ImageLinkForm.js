import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div className="center">
      <div>
        <p>This app will detect faces in your images. Try it out.</p>
        <div className="ma3 link-container">
          <input
            type="text"
            className="link-input"
            placeholder="Paste the image URL"
            onChange={onInputChange}
          />
          <button
            className="detect-button f5 ph3 pv2 white bg-black"
            onClick={onButtonSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

//className="detect-button f5 hover-bg-gray bg-animate ph3 pv2 white bg-black"

export default ImageLinkForm;
