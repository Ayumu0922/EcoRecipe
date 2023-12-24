import CustomImage from "./CustomImage";
import "../styles/partials/_hero-section.scss";
import { Link } from "react-router-dom";
export default function HeroSection() {
  const images = [
    "/img/gallery/img1.jpg",
    "/img/gallery/img2.jpg",
    "/img/gallery/img3.jpg",
    "/img/gallery/img4.jpg",
    "/img/gallery/img5.jpg",
    "/img/gallery/img6.jpg",
    "/img/gallery/img7.jpg",
    "/img/gallery/img8.jpg",
    "/img/gallery/img9.jpg",
  ];

  return (
    <div className="section hero">
      <div className="col typography">
        <h1 className="title">エコフレンドリー</h1>
        <p className="info">
          エコフレンドリーとは、「ecology（生態・環境）」を短縮した「eco」と、「friendly（友好的な・やさしい）」を合わせた造語で、「地球にやさしい」「環境に配慮した」といった意味があるよ。
        </p>
        <button className="btn">
          <Link to="recipes">検索する</Link>
        </button>
      </div>
      <div className="col gallery">
        {images.map((src, index) => (
          <CustomImage key={index} imgSrc={src} pt={"90%"} />
        ))}
      </div>
    </div>
  );
}
