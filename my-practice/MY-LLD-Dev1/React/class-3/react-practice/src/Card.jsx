import { useState } from "react";
function Card(props) {
  const [emailStatus, setEmailStatus] = useState(true);
  const age = props.age > 18 ? "Adult" : "Minor";
  const toggleEmail = () => {
    setEmailStatus(!emailStatus);
  };
  // consider using figure and figcaption
  return (
    <>
      <figure className="card">
        <img src={props.picture} alt="{}" />
        <figcaption>
          <h4>Name: {props.name}</h4>
          {emailStatus && <h4>Email: {props.email}</h4>}

          <h4>Age: {age}</h4>
          <h4>Location: {props.location}</h4>

          <button onClick={toggleEmail}>Toggle Email</button>
        </figcaption>
        
      </figure>
    </>
  );
}

export default Card;
