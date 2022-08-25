import { useState } from "react";
import Navbar from "./components/Navbar";
import Rank from "./components/Rank";
import ImageLinkForm from "./components/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition";
import "./App.css";
import SignIn from "./components/SignIn";
import Register from "./components/Register";

//face  https://as2.ftcdn.net/v2/jpg/02/85/89/71/1000_F_285897164_Jj30xWSzaWVDktLZ2vqYU5fhu7HYWTrg.jpg
//face2 https://as2.ftcdn.net/v2/jpg/02/97/28/87/1000_F_297288719_dMUUuJK6lRgdNzRuQE5ESEUojANdNqSq.jpg
//face3 https://as2.ftcdn.net/v2/jpg/03/66/29/01/1000_F_366290175_iKEmBkPoGL5ufO4ilec4jUoE1GM7pTiO.jpg
//noface  https://as1.ftcdn.net/v2/jpg/03/13/66/06/1000_F_313660620_pUpwqVjSikokA9zOt9kvVJKZtnQif1QK.jpg

function App() {
  const [inputURL, setInputURL] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [box, setBox] = useState({});
  const [route, setRoute] = useState("signin");
  const [currentRoute, setCurrentRoute] = useState("signin");
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    entries: 0,
    joined: "",
  });

  const onInputChange = (event) => {
    setInputURL(event.target.value);
  };

  const onButtonSubmit = () => {
    setImageURL(inputURL);

    const raw = JSON.stringify({
      user_app_id: {
        user_id: "zain",
        app_id: "my-first-application",
      },
      inputs: [
        {
          data: {
            image: {
              url: inputURL,
            },
          },
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key d5d4bea106964073b8055b5ea0c8e230",
      },
      body: raw,
    };

    fetch(
      "https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs",
      requestOptions
    )
      .then((response) => response.json())
      .then((faceData) => {
        if (faceData) {
          if (faceData.status.description === "Ok") {
            fetch("https://damp-ocean-77297.herokuapp.com/image", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                id: user.id,
              }),
            })
              .then((response) => response.json())
              .then((count) => {
                setUser({ ...user, entries: count });
              })
              .catch(console.log);
          }
          displayBoundingBox(calculateFaceLocation(faceData));
        }
      })
      .catch((error) => console.log("error"));
  };

  const calculateFaceLocation = (data) => {
    const faceLocation =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: faceLocation.left_col * width,
      topRow: faceLocation.top_row * height,
      rightCol: width - faceLocation.right_col * width,
      bottomRow: height - faceLocation.bottom_row * height,
    };
  };

  const displayBoundingBox = (box) => {
    setBox(box);
  };

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    });
  };

  const changeRoute = (route) => {
    if (route === "signin") {
      setCurrentRoute("signin");
    } else if (route === "register") {
      setCurrentRoute("register");
    } else if (route === "home") {
      setInputURL("");
      setImageURL("");
      setCurrentRoute("home");
    }
    setRoute(route);
  };

  return (
    <div>
      <Navbar currentRoute={currentRoute} changeRoute={changeRoute} />
      {route === "home" ? (
        <div>
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          <FaceRecognition box={box} imageURL={imageURL} />
        </div>
      ) : route === "signin" ? (
        <SignIn loadUser={loadUser} changeRoute={changeRoute} />
      ) : (
        <Register loadUser={loadUser} changeRoute={changeRoute} />
      )}
    </div>
  );
}

export default App;
