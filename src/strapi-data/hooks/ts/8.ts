export function viewUpdate(props) {
  const { user, item, form, isCreation = false } = props;
  const formInstance = item;
  //console.warn("formInstance", formInstance.data?.selectTab);
let formCopy = Object.assign(
    Object.create(Object.getPrototypeOf(form)),
    form
  );
    
  const isOwner = formInstance.owner === user.id;
  const isReviewer = formInstance.reviewers
    ? formInstance.reviewers.some((rev) => rev === user.id)
    : false;
  const user_ID = user.id

    const trialStatus_draft = "draft";
    const trialStatus_review = "review";
    const trialStatus_confirmed = "confirmed";
    const trialStatus_rejected = "rejected";
    const trialStatus_closed = "closed";
  
    const descFields = [
        "dateTime",
        "areaObject",
        "info",
        "members"
    ];
    const createFields = [
        "numberObject",
        "dateTime",
        "areaObject",
        "info",
        "members",
        "checkStatus",
        "requestObject",
        "issueObject",
        "inControlObject"
    ];
  
    const issueFields = ["issueObject"];
  
    const requestFields = ["requestObject"];

    const processFields = ["checkStatus"];
  
    const inControlFields = ["inControlObject"];
    
    const options = { day: 'numeric', month: 'short', year: 'numeric', hour: "numeric", minute: "numeric" };
    var dateTimeFormat = new Intl.DateTimeFormat('ru', options);
  
  const hideFields = (properties, excludeFields) => {
    for (const fieldName in properties) {
      properties[fieldName].hidden = excludeFields.every(
        (field) => field !== fieldName
      );
    }
  };
  
  const blockFields = (properties) => {
    for (const objName in properties) {
      for (const fieldName in properties[objName].properties){
        properties[objName].properties[fieldName].readOnly = true
      }
    }
  };
  
  if (formInstance.data && formInstance.data.selectTab === "issue") {
    hideFields(formCopy.scheme.properties, issueFields);
  }
  
  if (formInstance.data && formInstance.data.selectTab === "request") {
    hideFields(formCopy.scheme.properties, requestFields);
  }
  
formCopy.scheme.properties.members.required = ["applicant"]

  if (formInstance.data && formInstance.data.selectTab === "inControl"){
    hideFields(formCopy.scheme.properties, inControlFields);
  }
  
  if (formInstance.data && formInstance.data.selectTab === "description") {
    hideFields(formCopy.scheme.properties, descFields);
    formCopy.scheme.properties.info.properties.testType.helperText = ""
    formCopy.scheme.properties.info.properties.testType.readOnly = true
    if (formInstance.data.info.testType === "laboratory") {
        formCopy.scheme.properties.info.properties.comment.hidden = true
        formCopy.scheme.properties.info.properties.laboratory.hidden = false
        formCopy.scheme.properties.info.properties.typeOfLaboratory.hidden = false
        formCopy.scheme.properties.info.properties.volume.hidden = false
     }
      else {
        formCopy.scheme.properties.info.properties.comment.hidden = false
        formCopy.scheme.properties.info.properties.laboratory.hidden = true
        formCopy.scheme.properties.info.properties.typeOfLaboratory.hidden = true
        formCopy.scheme.properties.info.properties.volume.hidden = true
      }
  }
  
  if (formInstance.data && formInstance.data.selectTab === "process") {
    hideFields(formCopy.scheme.properties, processFields);
     formCopy.scheme.properties.checkStatus.properties.executorStatus.hidden = false;
     formCopy.scheme.properties.checkStatus.properties.trialResult.hidden = false;
     formCopy.scheme.properties.checkStatus.properties.exitCheck.hidden = false;
     delete formCopy.scheme.properties.checkStatus.properties.applicantStatus.default     
       if (formInstance.data.checkStatus.executorStatus === "notAccept"){
         formCopy.scheme.properties.checkStatus.properties.trialReason.hidden = false
       } 
        else{
         formCopy.scheme.properties.checkStatus.properties.trialReason.hidden = true
         }
       };
      
   if (isCreation) {
     formCopy.scheme.properties.selectTab.hidden = true; 
     hideFields(formCopy.scheme.properties, [...createFields]);
     formCopy.scheme.properties.checkStatus.properties.executorStatus.hidden = true;
     formCopy.scheme.properties.checkStatus.properties.trialResult.hidden = true;
     formCopy.scheme.properties.checkStatus.properties.trialReason.hidden = true;
     formCopy.scheme.properties.checkStatus.properties.exitCheck.hidden = true;
     formCopy.scheme.properties.issueObject.properties.issue.readOnly = false;
     formCopy.scheme.properties.requestObject.properties.request.readOnly = false;
    formCopy.scheme.properties.numberObject.required = ["number"]
     formCopy.scheme.properties.inControlObject.properties.inControl.readOnly = false;
     if (Object.keys(formInstance.data).length != 0 && formInstance.data.info.testType && formInstance.data.info.testType === "laboratory" ) {
        formCopy.scheme.properties.info.properties.comment.hidden = true
        formCopy.scheme.properties.info.properties.laboratory.hidden = false
        formCopy.scheme.properties.info.properties.typeOfLaboratory.hidden = false
        formCopy.scheme.properties.info.properties.volume.hidden = false
     }
      else if (Object.keys(formInstance.data).length != 0 && formInstance.data.info.testType && formInstance.data.info.testType === "geodetic"){
        formCopy.scheme.properties.info.properties.comment.hidden = false
        formCopy.scheme.properties.info.properties.laboratory.hidden = true
        formCopy.scheme.properties.info.properties.typeOfLaboratory.hidden = true
        formCopy.scheme.properties.info.properties.volume.hidden = true
      }
   } else {
     formCopy.scheme.properties.selectTab.hidden = false;
     formCopy.scheme.properties.selectTab.default = "description";
     formCopy.scheme.properties.numberObject.required = []
   }
 
  if (Object.keys(formInstance.data).length != 0 && formInstance.data.issueStatus && formInstance.data.issueStatus.length != 0 && formInstance.data.issueStatus.includes(trialStatus_review)){
    if (formInstance.data.checkStatus.executorStatus === "notAccept"){
      formCopy.scheme.properties.checkStatus.required = ["trialReason"]  
    }
    else{
      formCopy.scheme.properties.checkStatus.required = []  
    }
  } 
  
    if (formInstance.data.issueStatus && formInstance.data.issueStatus.length != 0 && (formInstance.data.issueStatus.includes(trialStatus_draft) || formInstance.data.issueStatus.includes(trialStatus_rejected))){
      
      blockFields(formCopy.scheme.properties);
      
      if (user_ID.includes(item.data.applicantCheck)){
        formCopy.scheme.properties.checkStatus.properties.applicantStatus.readOnly = false;
        formCopy.scheme.properties.dateTime.properties.dateTimeStart.readOnly = false;
        formCopy.scheme.properties.dateTime.properties.dateTimeEnd.readOnly = false;
        formCopy.scheme.properties.areaObject.properties.area.readOnly = false;
        formCopy.scheme.properties.info.properties.laboratory.readOnly = false;
        formCopy.scheme.properties.info.properties.typeOfLaboratory.readOnly = false;
        formCopy.scheme.properties.info.properties.comment.readOnly = false;
        formCopy.scheme.properties.info.properties.cafm.readOnly = false;
        formCopy.scheme.properties.info.properties.volume.readOnly = false;
        formCopy.scheme.properties.members.properties.applicant.readOnly = false;
        formCopy.scheme.properties.members.properties.executor.readOnly = false;
        formCopy.scheme.properties.issueObject.properties.issue.readOnly = false;
        formCopy.scheme.properties.requestObject.properties.request.readOnly = false;
        formCopy.scheme.properties.inControlObject.properties.inControl.readOnly = false;
      }
      
      if (user_ID.includes(item.data.executorCheck) && formInstance.data.issueStatus.includes(trialStatus_rejected)){
        formCopy.scheme.properties.members.properties.executor.readOnly = false;
        formCopy.scheme.properties.checkStatus.properties.executorStatus.readOnly = false;
        formCopy.scheme.properties.checkStatus.properties.trialReason.readOnly = false;
      }
    }
  
    if (formInstance.data.issueStatus && formInstance.data.issueStatus.length != 0 && formInstance.data.issueStatus.includes(trialStatus_review)){
      
      blockFields(formCopy.scheme.properties);
      
      if (user_ID.includes(item.data.executorCheck)){
        formCopy.scheme.properties.members.properties.executor.readOnly = false;
        formCopy.scheme.properties.checkStatus.properties.executorStatus.readOnly = false;
        formCopy.scheme.properties.checkStatus.properties.trialReason.readOnly = false;
      }
    }
  
    if (formInstance.data.issueStatus && formInstance.data.issueStatus.length != 0 && formInstance.data.issueStatus.includes(trialStatus_confirmed)){
      
      blockFields(formCopy.scheme.properties);
      
      if (user_ID.includes(item.data.applicantCheck)){
        formCopy.scheme.properties.checkStatus.properties.applicantStatus.readOnly = false;
        formCopy.scheme.properties.members.properties.applicant.readOnly = false;
        formCopy.scheme.properties.issueObject.properties.issue.readOnly = false;
        formCopy.scheme.properties.requestObject.properties.request.readOnly = false;
        formCopy.scheme.properties.inControlObject.properties.inControl.readOnly = false;
      }
      
      if (user_ID.includes(item.data.executorCheck)){
        formCopy.scheme.properties.members.properties.executor.readOnly = false;
        formCopy.scheme.properties.checkStatus.properties.executorStatus.readOnly = false;
        formCopy.scheme.properties.checkStatus.properties.trialReason.readOnly = false;
        formCopy.scheme.properties.checkStatus.properties.trialResult.readOnly = false;
        if (typeof(formInstance.data.checkStatus.trialResult) != "undefined"){
           formCopy.scheme.properties.checkStatus.properties.exitCheck.readOnly = false;
        } 
        else {
           formCopy.scheme.properties.checkStatus.properties.exitCheck.readOnly = true;
        }
      }
    }
    
    if (formInstance.data.issueStatus && formInstance.data.issueStatus.length != 0 && formInstance.data.issueStatus.includes(trialStatus_closed)){
      
      blockFields(formCopy.scheme.properties);
      
      if (user_ID.includes(item.data.applicantCheck)){
        formCopy.scheme.properties.issueObject.properties.issue.readOnly = false;
        formCopy.scheme.properties.requestObject.properties.request.readOnly = false;
        formCopy.scheme.properties.inControlObject.properties.inControl.readOnly = false;
      }
      
    }   

 if (Object.keys(formInstance.data).length != 0 ){
if (formInstance.data.members && formInstance.data.members.applicant &&  formInstance.data.dateTime.dateTimeStart != 0 && formInstance.data.dateTime.dateTimeEnd != 0 && ((formInstance.data.info.testType === "laboratory" && formInstance.data.info.laboratory && formInstance.data.info.typeOfLaboratory) || (formInstance.data.info.testType === "geodetic" )) && formInstance.data.members.executor && formInstance.data.areaObject && formInstance.data.areaObject.area && user_ID.includes(item.data.members.applicant) &&(!(formInstance.data.issueStatus) || formInstance.data.issueStatus && !(formInstance.data.issueStatus.includes(trialStatus_closed)))){
         formCopy.scheme.properties.checkStatus.properties.applicantStatus.readOnly = false
         formCopy.scheme.properties.checkStatus.properties.applicantStatus.helperText = ""
   }
   else{
         formCopy.scheme.properties.checkStatus.properties.applicantStatus.readOnly = true
         formCopy.scheme.properties.checkStatus.properties.applicantStatus.helperText = "Чтобы ваше испытание отправилась на рассмотрение, измените статус на «Готов к испытанию». Для этого нужно заполнить все обязательные поля. Если вы пока не можете это сделать, сохраните испытание в статусе «Не готов к испытанию» и завершите заполнение позже."
   }
} 

  if (Object.keys(formInstance.data).length != 0 ){
if (formInstance.data.members && formInstance.data.members.applicant &&  formInstance.data.dateTime.dateTimeStart != 0 && formInstance.data.dateTime.dateTimeEnd != 0 && ((formInstance.data.info.testType === "laboratory" && formInstance.data.info.laboratory && formInstance.data.info.typeOfLaboratory) || (formInstance.data.info.testType === "geodetic" )) && formInstance.data.members.executor && formInstance.data.areaObject && formInstance.data.areaObject.area && user_ID.includes(item.data.members.executor) &&(!(formInstance.data.issueStatus) || formInstance.data.issueStatus && !(formInstance.data.issueStatus.includes(trialStatus_closed)))){
        formCopy.scheme.properties.checkStatus.properties.executorStatus.readOnly = false
         formCopy.scheme.properties.checkStatus.properties.trialReason.readOnly = false
   }
   else{
         formCopy.scheme.properties.checkStatus.properties.executorStatus.readOnly = true
         formCopy.scheme.properties.checkStatus.properties.trialReason.readOnly = true
   }
} 
  
   console.log(formInstance);
  return formCopy;
}
