import React from "react";
import Title from "./components/Title";
import Form from "./components/Form";
import MainCard from "./components/MainCard";
import Favorites from "./components/Favorites";
import "./App.css";

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/

const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
};

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
  const [counter, setCounter] = React.useState(() => {
    return jsonLocalStorage.getItem("count");
  });
  const [favorites, setFavorites] = React.useState(() => {
    return jsonLocalStorage.getItem("favorites") || [];
  });

  const alreadyFavorite = favorites.includes(catimg);

  React.useEffect(() => {
    initialCat();
  }, []); //맨 처음에만

  React.useEffect(() => {
    console.log(counter);
  }, [counter]); //카운터 바뀔때마다(렌더링 될때마다) 불림.

  ///상태 끌어올리기 (lifting state up) : 상태를 다른 컴포넌트에서 선언하도록 변경, 자식 컴포넌트에게 프롭스props 로 넘겨주기
  ///Form의 함수를 App의 함수로 이동
  async function updateMainCat(value) {
    console.log(value);

    const newCat = await fetchCat(value);
    setCounter((prev) => {
      const nxtCount = prev + 1;
      jsonLocalStorage.setItem("count", nxtCount);
      return nxtCount;
    });
    setCatImg(newCat);
  }

  function handleHeartClick() {
    const nxtFavorites = [...favorites, catimg];
    setFavorites(nxtFavorites); //배열에 추가  ES6+스프레드(전개) 오퍼레이터(연산자) 문법
    jsonLocalStorage.setItem("favorites", nxtFavorites);
  }

  const counterTitle = counter == null ? counter : counter + "번째";

  return (
    <div>
      <Title>{counterTitle} 고양이 가라사대 </Title>
      <Form updateMainCat={updateMainCat} />
      <MainCard
        img={catimg}
        title="냥1"
        onHeartClick={handleHeartClick}
        alreadyFavorite={alreadyFavorite}
      />
      <Favorites favorites={favorites} />
    </div>
  );
};

export default App;
