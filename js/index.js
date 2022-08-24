const app = document.querySelector("#app");
const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
};

const H1 = (props) => {
  return <h1>{props.children}</h1>;
};

function Form({ updateMainCat }) {
  const includesHangul = (text) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/i.test(text);
  const [value, setValue] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  function handleInputChange(e) {
    const userValue = e.target.value;
    setErrorMessage("");
    if (includesHangul(userValue)) {
      setErrorMessage("한글은 입력할 수 없습니다. ");
    }
    //console.log(userValue);

    setValue(userValue.toUpperCase());
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    setErrorMessage("");

    if (value === "") {
      setErrorMessage("빈 값은 입력할 수 없습니다");
      return;
    }

    updateMainCat(value);
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        name="name"
        placeholder="영어 대사를 입력해주세요"
        value={value}
        onChange={handleInputChange}
      />
      <button type="submit"> 생성 </button>
      <p style={{ color: "red" }}>{errorMessage}</p>
    </form>
  );
}

function MainCard({ img, onHeartClick }) {
  return (
    <div className="main-card">
      <img src={img} alt="냥" width="400" />
      <button onClick={onHeartClick}>🤍</button>
    </div>
  );
}

function Favorites({ favorites }) {
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

const App = () => {
  const CAT1 = "https://cataas.com/cat/60b73094e04e18001194a309/says/react";
  // const CAT2 = "https://cataas.com//cat/5e9970351b7a400011744233/says/inflearn";
  // const CAT3 =
  //   "https://cataas.com/cat/595f280b557291a9750ebf65/says/JavaScript";

  const fetchCat = async (text) => {
    const OPEN_API_DOMAIN = "https://cataas.com";
    const response = await fetch(
      `${OPEN_API_DOMAIN}/cat/says/${text}?json=true`
    );
    const responseJson = await response.json();
    return `${OPEN_API_DOMAIN}/${responseJson.url}`;
  };

  async function initialCat() {
    const newCat = await fetchCat("First cat");
    console.log(newCat);
    setCatImg(newCat);
  }

  const [catimg, setCatImg] = React.useState(CAT1);
  const [counter, setCounter] = React.useState(
    jsonLocalStorage.getItem("count")
  );
  const [favorites, setFavorites] = React.useState(
    jsonLocalStorage.getItem("favorites") || []
  );

  React.useEffect(() => {
    initialCat();
  }, []);

  //initialCat(); //계속 불러짐

  ///상태 끌어올리기 (lifting state up) : 상태를 다른 컴포넌트에서 선언하도록 변경, 자식 컴포넌트에게 프롭스props 로 넘겨주기
  ///Form의 함수를 App의 함수로 이동
  async function updateMainCat(value) {
    console.log(value);

    const nxtCount = counter + 1;
    const newCat = await fetchCat(value);
    setCounter(nxtCount);
    setCatImg(newCat);
    jsonLocalStorage.setItem("count", nxtCount);
  }

  function rtnCatImg(value) {
    //console.log(counter % 3 + 1);
    // switch ((counter % 3) + 1) {
    //   case 1:
    //     return CAT1;
    //   case 2:
    //     return CAT2;
    //   case 3:
    //     return CAT3;
    // }
    return "http://cataas.com/cat/says/" + value;
  }

  function handleHeartClick() {
    const nxtFavorites = [...favorites, catimg];
    setFavorites(nxtFavorites); //배열에 추가  ES6+스프레드(전개) 오퍼레이터(연산자) 문법
    jsonLocalStorage.setItem("favorites", nxtFavorites);
  }

  return (
    <div>
      <H1> {counter}번째 고양이 가라사대 </H1>
      <Form updateMainCat={updateMainCat} />
      <MainCard img={catimg} title="냥1" onHeartClick={handleHeartClick} />
      <Favorites favorites={favorites} />
    </div>
  );
};

ReactDOM.render(<App />, app);
