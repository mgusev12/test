export function onSave(props) {
    const { item, user } = props;
    console.log("onSave", props);
    //const formInstance = Object.assign(Object.create(Object.getPrototypeOf(item)), item);
    const formInstance = {...item};
    const { data } = formInstance;
    const fields = ["authorSupervision.user", "contractor.user", "customer.user", "generalContractor.user", "subcontractor.user"];
	let reviewers = new Set();

    delete formInstance.data.selectTab;

    fields.forEach(field => {
        const val = field.split('.').reduce((p,c) => p && p[c], data);
        if (val) {
			val.forEach((userId) => reviewers.add(userId));
        }
    });
    formInstance.reviewers = Array.from(reviewers);
    
    return formInstance;
}