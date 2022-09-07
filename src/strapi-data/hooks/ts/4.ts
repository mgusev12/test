export function onSave(props) {
  const { item, user } = props;
  //formInstance = Object.assign(Object.create(Object.getPrototypeOf(item)), item);
  const formInstance = { ...item };
  const { data } = formInstance;
  const fields = ["members.responsible", "members.executor", "members.eliminationResponsible"];
  const issueStatus_opened = "opened";
  const issueStatus_draft = "draft";
  const issueStatus_eliminated = "eliminated";
  const issueStatus_closed = "closed";
  const memberStatus = [];
  let nowdate = new Date();
  let reviewers = new Set();

  delete formInstance.data.selectTab;

  formInstance.data.responsibleCheck = "responsible";
  formInstance.data.executorChek = "executor"
  
  if ((formInstance.data.members) && (formInstance.data.members.responsible) && formInstance.data.members.responsible.length != 0){
    formInstance.data.responsibleCheck = formInstance.data.members.responsible[0]
  }
  if ((formInstance.data.members) && (formInstance.data.members.executor) && formInstance.data.members.executor.length != 0){
    formInstance.data.executorCheck = formInstance.data.members.executor[0]
  }
  
  if (formInstance.data.dateCheck.oldDate != 0){
    if (formInstance.data.dateCheck.oldDate != formInstance.data.info.dateTime){
      formInstance.data.dateCheck.dateCount++
    }
  }
  
  formInstance.data.dateCheck.oldDate = formInstance.data.info.dateTime
  
  fields.forEach((field) => {
    const val = field.split(".").reduce((p, c) => p && p[c], data);
    if (val) {
      val.forEach((userId) => reviewers.add(userId));
    }
  });
  formInstance.reviewers = Array.from(reviewers);

  if (formInstance.data.memberStatus.responsibleStatus === "notIssued") {
    formInstance.data.issueStatus = ["draft"];
    if (formInstance.data.memberStatus.executorStatus && (formInstance.data.issueStatus[0] != issueStatus_draft)){
      delete formInstance.data.memberStatus.executorStatus
    }
    if (formInstance.data.memberStatus.eliminationConfirmation && (formInstance.data.issueStatus[0] != issueStatus_draft)){  
      delete formInstance.data.memberStatus.eliminationConfirmation
    }
  } 
  if (((formInstance.data.issueStatus && ((formInstance.data.issueStatus[0] === issueStatus_draft)) || !(formInstance.data.issueStatus )) && formInstance.data.memberStatus.responsibleStatus === "issued") || (formInstance.data.issueStatus &&  formInstance.data.issueStatus[0] === issueStatus_eliminated && formInstance.data.memberStatus.responsibleStatus === "issued" && formInstance.data.memberStatus.executorStatus === "issued" && formInstance.data.memberStatus.eliminationConfirmation === "notIssued") || (formInstance.data.issueStatus && formInstance.data.issueStatus[0] === issueStatus_eliminated) && formInstance.data.memberStatus.executorStatus === "notIssued") {
    formInstance.data.issueStatus = ["opened"];
    if (formInstance.data.memberStatus.executorStatus === "issued"){
      delete formInstance.data.memberStatus.executorStatus
    }
    formInstance.data.memberStatus.executorStatus = "notIssued"
  } 
  if (formInstance.data.issueStatus && formInstance.data.issueStatus[0] === issueStatus_opened && formInstance.data.memberStatus.responsibleStatus === "issued" && formInstance.data.memberStatus.executorStatus === "issued") {
    formInstance.data.issueStatus = ["eliminated"];
    if (formInstance.data.memberStatus.eliminationConfirmation){
      delete formInstance.data.memberStatus.eliminationConfirmation
    }
  } 
  if (formInstance.data.memberStatus.responsibleStatus === "issued" && formInstance.data.memberStatus.executorStatus === "issued" && formInstance.data.memberStatus.eliminationConfirmation === "issued" && formInstance.data.memberStatus.close == 1) {
    formInstance.data.issueStatus = ["closed"];
    if (!(formInstance.data.exitTime)){  
      formInstance.data.exitTime = new Date().setMonth(nowdate.getMonth());
    }
  }

  console.log(formInstance);
  return formInstance;
}


  
