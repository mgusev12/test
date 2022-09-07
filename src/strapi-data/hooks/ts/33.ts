export function onSave(props) {
    const { item, user } = props;
    const formInstance = {...item};
    const { data } = formInstance;
    if (formInstance.data.testViewDisplay) {
	delete formInstance.data.testViewDisplay;
    }
    console.warn("onSave", formInstance.data);
    return formInstance;
}