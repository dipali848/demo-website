import React, { useState, useEffect } from "react";
import "../styles.css";
import axios from "axios";
import ViewImage from "./viewImage";
import Pagination from "../common/pagination";

export default function Home() {
  const [photo, setPhoto] = useState();
  const [clientId, setClientId] = useState(
    "QFfQnoujdpW0BMYVj-5X2aWNfiruqv2k4hNagUWyhK0"
  );
  const [result, setResult] = useState([]);
  const [showImage, setImageUrl] = useState();
  const [modalIsOpen, setIsOpen] = useState(false);

  const [post, setPost] = useState();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [imagePerPage] = useState(5);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      //https://jsonplaceholder.typicode.com/posts
      const url =    "https://api.unsplash.com/search/photos?page=1&per_page=40&query=" +
      photo +
      "&client_id=" +
      clientId;
      const res = await axios.get(url);
      setResult(res.data.results);
      //console.log("***", res);
      setPost(res.data);
      setLoading(false);
    };
    fetchPost();
  },[]);

  console.log(post)

  function handleChange(e) {
    setPhoto(e.target.value);
  }
  function handleSubmit(e) {
    const url =
      "https://api.unsplash.com/search/photos?page=1&per_page=40&query=" +
      photo +
      "&client_id=" +
      clientId;
    axios.get(url).then((res) => {
      setResult(res.data.results);
      console.log("***", res);
    });
  }
  function handleImageClick(imageurl) {
    setImageUrl(imageurl);
    console.log(showImage);
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
    console.log(modalIsOpen);
  }

  //get current image
const indexOfLastImage = currentPage * imagePerPage;
const indexOfFirstIamge = indexOfLastImage - imagePerPage;
const currentImage = result.slice(indexOfFirstIamge,indexOfLastImage)
//chnage page
const paginate = pageNumber => setCurrentPage(pageNumber)
  return (
    <div className="App">
      <h1>Image Search engine</h1>
      <h2>Lets search!</h2>
      <div>
        <input
          className="InputSearch"
          type="text"
          onChange={handleChange}
          placeholder="Search for image here..."
        />
        <button className="SubmitButton" type="submit" onClick={handleSubmit}>
          Search
        </button>
      </div>
      <br />
      <div>
        {currentImage.map((photo, i) => (
          <img
            className="imageApp"
            src={photo.urls.small}
            key={i}
            width="200"
            height="200"
            onClick={() => handleImageClick(photo.urls.small)}
          />
        ))}
        {showImage ? (
          <ViewImage
            downloadImage={() => downloadImage()}
            imageUrl={showImage}
            modalIsOpen={modalIsOpen}
            closeModal={closeModal}
          />
        ) : null}
       <Pagination imagePerPage={imagePerPage} totalImage={result.length}  paginate={paginate}/>
      </div>
    </div>
  );
}
