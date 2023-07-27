"use client";
import { store } from "@/store/store";
import { Provider } from "react-redux";
type Props = {
  children: React.ReactNode;
};

function App({ children }: Props) {
  return (
    <>
      <Provider store={store}>{children}</Provider>
    </>
  );
}
export default App;
