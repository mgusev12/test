export function onChange(props) {
    const { item, user } = props;
    const formInstance = Object.assign(Object.create(Object.getPrototypeOf(item)), item);
    const { data } = formInstance;

    if (data.numberOfContract) {
        formInstance.title = data.numberOfContract;
    }
    if (data.rdCode) {
        formInstance.description = data.rdCode;
    }
    
    return formInstance;
}
