function MainCard({ img, onHeartClick, alreadyFavorite }) {
  console.log(alreadyFavorite);
  const heartIcon = alreadyFavorite ? "💖" : "🤍";

  return (
    <div className="main-card">
      <img src={img} alt="냥" width="400" />
      <button onClick={onHeartClick}>{heartIcon}</button>
    </div>
  );
}

export default MainCard;
