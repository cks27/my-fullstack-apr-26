function Person(props) {
    const personHandler = () => {
        console.log('person handler called');
    }
    const picture = props.picture ?? "https://plus.unsplash.com/premium_photo-1732757787074-0f95bf19cf73?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2FydG9vbiUyMGZhY2UlMjB1bmlzZXh8ZW58MHx8MHx8fDA%3D";
    return <figure onClick={personHandler} className="card">
        <img width={300} src={picture} alt="" />
        <figcaption>
            <h4>Name: {props.name}</h4>
            <h5>Age: {props.age}</h5>
            <p>Some description</p>
        </figcaption>
    </figure>
}

export default Person;