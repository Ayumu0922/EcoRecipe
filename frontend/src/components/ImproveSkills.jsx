import { Link } from "react-router-dom";
import "../styles/partials/_improve-section.scss";

export default function ImproveSkills() {
  const list = [
    "新しいレシピを学ぶ",
    "食材から料理を検索する",
    "自分自身のレシピを書く",
  ];

  return (
    <div className="section improve-skills">
      <div className="col img">
        <img src="/img/gallery/img1.jpg" alt="" />
      </div>
      <div className="col typography">
        <h1 className="title">エコレシピを見つけよう！</h1>
        {list.map((item, index) => (
          <p className="skill-item" key={index}>
            {item}
          </p>
        ))}
        <button className="btn">
          <Link to="authentication/signin">今すぐ登録</Link>
        </button>
      </div>
    </div>
  );
}
