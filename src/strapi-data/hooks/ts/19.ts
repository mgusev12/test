export function onSave(props) {
    const { item, user } = props;
    //formInstance = Object.assign(Object.create(Object.getPrototypeOf(item)), item);
    const formInstance = { ...item };
    const { data } = formInstance;
    const fields = ["subcontractor.user", "customerRepresentative.user", "representativeDesignerSupervisor.user"];
    const requestStatus_draft = "draft";
    const requestStatus_review = "review";
    const requestStatus_confirmed = "confirmed";
    const requestStatus_rejected = "rejected";
    const requestStatus_accepted = "accepted";
   const requestStatus_notAccepted = "notAccepted";
    const memberStatus = [];
    let reviewers = new Set();
  
    delete formInstance.data.selectTab;
  
  formInstance.data.subcontractor.check = "subcontractor"
  formInstance.data.customerRepresentative.check = "customerRepresentative"
  formInstance.data.representativeDesignerSupervisor.check  = "representativeDesignerSupervisor"
  
  if ((formInstance.data.subcontractor) && (formInstance.data.subcontractor.user) && formInstance.data.subcontractor.user != 0) {
    formInstance.data.subcontractor.check  = formInstance.data.subcontractor.user[0]
  }
  if ((formInstance.data.customerRepresentative) && (formInstance.data.customerRepresentative.user) && formInstance.data.customerRepresentative.user != 0){
    formInstance.data.customerRepresentative.check  = formInstance.data.customerRepresentative.user[0]
  }
  if ((formInstance.data.representativeDesignerSupervisor) && (formInstance.data.representativeDesignerSupervisor.user) && formInstance.data.representativeDesignerSupervisor.user != 0){
    formInstance.data.representativeDesignerSupervisor.check  = formInstance.data.representativeDesignerSupervisor.user[0]
  }
  
  
    fields.forEach((field) => {
      const val = field.split(".").reduce((p, c) => p && p[c], data);
      if (val) {
        val.forEach((userId) => reviewers.add(userId));
      }
    });
    formInstance.reviewers = Array.from(reviewers);
  
    if (formInstance.data.subcontractor.selectOne === "notReady") {
      formInstance.data.requestStatus = ["draft"];
    } 
  
    if ((!(formInstance.data.requestStatus) || formInstance.data.requestStatus && formInstance.data.requestStatus[0] != "review") && formInstance.data.subcontractor.selectOne === "ready") {
      formInstance.data.requestStatus = ["review"];
    } 
  
    if (formInstance.data.requestStatus && formInstance.data.requestStatus.length != 0 && formInstance.data.requestStatus[0] === "review" && formInstance.data.customerRepresentative.selectOne === "accept") {
      formInstance.data.requestStatus = ["confirmed"];
    } 
  
    if (formInstance.data.requestStatus && formInstance.data.requestStatus.length != 0 && formInstance.data.requestStatus[0] === "review" && formInstance.data.customerRepresentative.selectOne === "rejected") {
      formInstance.data.requestStatus = ["rejected"];
    }
  
    if (typeof(formInstance.data.result) != "undefined" && formInstance.data.requestStatus && formInstance.data.requestStatus.length != 0 &&  formInstance.data.requestStatus[0] === "confirmed"){
      if (typeof(formInstance.data.result.selectOne) != "undefined" && typeof(formInstance.data.result.close) != "undefined" && formInstance.data.result.selectOne === "accept" && formInstance.data.result.close == 1) {
      formInstance.data.requestStatus = ["accepted"];
    }
    else if (typeof(formInstance.data.result.selectOne) != "undefined" && typeof(formInstance.data.result.close) != "undefined" && formInstance.data.result.selectOne === "rejected" && formInstance.data.result.close == 1){ 
        formInstance.data.requestStatus = ["notAccepted"];
    }
    }
    console.log(formInstance.data)
    return formInstance;
  }
  