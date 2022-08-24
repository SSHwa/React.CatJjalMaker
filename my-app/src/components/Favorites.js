function Favorites({ favorites }) {
  if (favorites.length === 0) {
    //조건부 렌더링
    return <div>사진 위 하트를 눌러 고양이 사진을 저장해봐요!</div>;
  }

  return (
    <ul className="favorites">
      {favorites.map((cat) => (
        <CatItem img={cat} key={cat} />
      ))}
    </ul>
  );
}

function CatItem(props) {
  return (
    <li>
      {props.title}
      <img
        src={props.img}
        style={{ width: "150px", border: "1px solid red" }}
      />
    </li>
  );
}
export default Favorites;
