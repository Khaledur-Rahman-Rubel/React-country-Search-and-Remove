import style from "./countries.module.css";
import { v4 as uuidv4 } from "uuid";

import Country from "./Country";

const Countries = (props) => {
  return (
    <section className={style.countries}>
      {props.countries.map((countryData) => {
        const countryNew = { countryData, id: uuidv4() };
        return (
          <Country
            {...countryNew}
            key={countryNew.id}
            onRemoveCountry={props.onRemoveCountry}
          />
        );
      })}
    </section>
  );
};

export default Countries;
