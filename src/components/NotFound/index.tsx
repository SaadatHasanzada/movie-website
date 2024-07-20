import React from "react";
import style from "./style.module.scss";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className={style.notFound}>
      <div>
        <h1>Error</h1>
        <p className={style.error}>
          <span>40</span>
          <span className={style.four}>4</span>
        </p>
      </div>
      <p className={style.text}>Page Not Found</p>
      <Link to="/">
        <button>Return Home</button>
      </Link>
    </div>
  );
};

export default NotFound;
