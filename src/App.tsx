import { useEffect } from "react";
import "./App.css";

// const BASE_URL = "https://api.genius.com/songs/378195";
const accessToken = import.meta.env.VITE_GENIUS_ACCESS_TOKEN;
const query = "i want you to lead me on";

function App() {
  async function fetchApi() {
    const res = await fetch(
      "https://api.genius.com/search?access_token=" +
        accessToken +
        "&q=" +
        encodeURIComponent(query),
    );

    console.log(res.json());
  }

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <>
      <div></div>
    </>
  );
}

export default App;
