import Alchohol from "./component/alcohol/Alchohol";
import { WineData } from "./types/wine";
import useFetch from "./hooks/fetch";
import Gamma from "./component/Gamma/Gamma";

function App() {
  const { data } = useFetch<WineData[]>("./db.json");

  if (!data) {
    return <></>;
  }
  return (
    <>
      <div>
        <h1>Wine Dataset Statistics</h1>
        {data.length > 0 ? <Alchohol data={data} /> : <p>Loading data...</p>}
      </div>
      <div>
        <h1>Gamma Dataset Statistics</h1>
        {data.length > 0 ? <Gamma data={data} /> : <p>Loading data...</p>}
      </div>
    </>
  );
}

export default App;
