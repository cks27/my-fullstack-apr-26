import { useState } from "react";
function Card(props) {
  const [emailStatus, setEmailStatus] = useState(true);
  const age = props.email > 18 ? "Adult" : "Minor";
  const toggleEmail = () => {
    setEmailStatus(!emailStatus);
  };
  // consider using figure and figcaption
  return (
    <>
      <section className="card">
        <div>
          <img src={props.picture} alt="{}" />
        </div>
        <div>Name: {props.name}</div>
        {emailStatus && <div>Email: {props.email}</div>}

        <div>Age: {age}</div>
        <div>Location: {props.location}</div>

        <div>
          <button onClick={toggleEmail}>Toggle Email</button>
        </div>
      </section>
    </>
  );
}

export default Card;
