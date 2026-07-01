import MultiCounter from "./MultiCounter";

function ParentCounter() {
    return (
        <>
            <MultiCounter index={1} value={2} />
            <MultiCounter index={2} value={3} />
            <MultiCounter index={3} value={4} />
        </>
        
    )
}

export default ParentCounter;