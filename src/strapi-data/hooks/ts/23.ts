export function onSave(props) {
    const { item, user } = props;
    console.log("onSave", props);
    //const formInstance = Object.assign(Object.create(Object.getPrototypeOf(item)), item);
    const formInstance = {...item};
    const { data } = formInstance;
    const fields = [ "responsible.user", "supervision.user", "engineer.user", "subcontractor.user"];
	let reviewers = new Set();

  fields.forEach((field) => {
      const val = field.split(".").reduce((p, c) => p && p[c], data);
      if (val) {
        val.forEach((userId) => reviewers.add(userId));
      }
    });
    formInstance.reviewers = Array.from(reviewers);

  delete formInstance.data.selectTab;
  
  if (formInstance.data.subcontractor){
  formInstance.data.subcontractor.check = "subcontractor"
  }
  
  if (formInstance.data.supervision){
  formInstance.data.supervision.check = "supervision"
  }
  
  if (formInstance.data.engineer){
  formInstance.data.engineer.check  = "engineer"
  }
  
  if (formInstance.data.responsible){
  formInstance.data.responsible.check  = "responsible"
  }
  
  if ((formInstance.data.subcontractor) && (formInstance.data.subcontractor.user) && formInstance.data.subcontractor.user != 0) {
    formInstance.data.subcontractor.check  = formInstance.data.subcontractor.user[0]
  }
  
  if ((formInstance.data.supervision) && (formInstance.data.supervision.user) && formInstance.data.supervision.user != 0) {
    formInstance.data.supervision.check  = formInstance.data.supervision.user[0]
  }
  
  if ((formInstance.data.engineer) && (formInstance.data.engineer.user) && formInstance.data.engineer.user != 0) {
    formInstance.data.engineer.check  = formInstance.data.engineer.user[0]
  }
  
  if ((formInstance.data.responsible) && (formInstance.data.responsible.user) && formInstance.data.responsible.user != 0) {
    formInstance.data.responsible.check  = formInstance.data.responsible.user[0]
  }
  
  if (formInstance.data.responsible && formInstance.data.responsible.selectOne && formInstance.data.responsible.selectOne === "notReady") {
      formInstance.data.inControlStatus = ["draft"]
  }
  
  if (formInstance.data.responsible && formInstance.data.responsible.selectOne && formInstance.data.responsible.selectOne === "ready") {
      formInstance.data.inControlStatus = ["review"]
  }
  
  if (formInstance.data.responsible && formInstance.data.responsible.selectOne && formInstance.data.responsible.selectOne === "ready" && formInstance.data.engineer && formInstance.data.engineer.selectOne === "accept" && (!(formInstance.data.supervision) || (formInstance.data.supervision) && (formInstance.data.supervision.user) && formInstance.data.supervision.selectOne === "accept") && (!(formInstance.data.subcontractor) || (formInstance.data.subcontractor) && (formInstance.data.subcontractor.user) && formInstance.data.subcontractor.selectOne === "accept")){
      formInstance.data.inControlStatus = ["confirmed"]
  }
  
  if (formInstance.data.responsible.selectOne === "ready" && (formInstance.data.engineer.selectOne === "notAccept" || (formInstance.data.supervision) && (formInstance.data.supervision.user) && formInstance.data.supervision.selectOne === "notAccept" || (formInstance.data.subcontractor) && (formInstance.data.subcontractor.user) && formInstance.data.subcontractor.selectOne === "notAccept")){
      formInstance.data.inControlStatus = ["rejected"]
  }

  if (formInstance.data.inControlStatus && formInstance.data.inControlStatus[0] === "confirmed" && (formInstance.data.result) && formInstance.data.result.selectOne && formInstance.data.result.selectOne === "accept" && (formInstance.data.result.close) && formInstance.data.result.close[0] === 1){
      formInstance.data.inControlStatus = ["accepted"]
  }
  
  if (formInstance.data.inControlStatus && formInstance.data.inControlStatus[0] === "confirmed" && (formInstance.data.result) && formInstance.data.result.selectOne && formInstance.data.result.selectOne === "rejected" && (formInstance.data.result.close) && formInstance.data.result.close[0] === 1){
      formInstance.data.inControlStatus = ["notAccepted"]
  }
  
  if (formInstance.data.inControlStatus && formInstance.data.inControlStatus[0] === "confirmed" && (formInstance.data.result) && formInstance.data.result.selectOne && formInstance.data.result.selectOne === "accept"){
      formInstance.data.crCheck = "2"
  }
  
  if (formInstance.data.inControlStatus && formInstance.data.inControlStatus[0] === "confirmed" && (formInstance.data.result) && formInstance.data.result.selectOne && formInstance.data.result.selectOne === "rejected"){
      formInstance.data.crCheck = "3"
  }
    
    return formInstance;
}