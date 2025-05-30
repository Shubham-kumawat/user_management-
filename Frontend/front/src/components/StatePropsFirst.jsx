import { useState } from "react";
import StatePropsSecond from "./StatePropsSecond";

export default function StatePropsFirst() {
  const [data, setData] = useState([
    {
      title: "First Blog",
      description: "This is my first blog",
      button: "Show more",
    },
    {
      title: "Second Blog",
      description: "This is my second blog",
      button: "Show more",
    },
  ]);
  return (
    <>
      {data.map((singleData) => {
        return (
          <StatePropsSecond
            title={singleData.title}
            description={singleData.description}
            button={singleData.button}
          />
        );
      })}
    </>
  );
}
