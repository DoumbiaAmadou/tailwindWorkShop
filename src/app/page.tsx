import Film from "@/components/films";
import { MovieType } from "../../type";

interface ResponseType {
  data: {
    results: MovieType[];
  };
}

export const revalidate = 0;

const Home = async () => {
  const response = await fetch("http://localhost:3000/api/films", {
    cache: "no-store",
  });
  let data: ResponseType;
  if (!response.ok) data = { data: { results: [] } };
  else data = await response.json();
  const { results } = data.data;

  return <Film films={results} />;
};
export default Home;
