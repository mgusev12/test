export function demoHook(props) {
    const { fieldToUpdate } = props;
    if (fieldToUpdate === "input") {
        props.fieldToUpdate = "output";
    }
    return props;
}