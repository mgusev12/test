export function viewUpdate(props) {
  const { user, item, form, isCreation = false } = props;
  const formInstance = item;
  //console.warn("formInstance", formInstance.data?.selectTab);
  const formCopy = Object.assign(
    Object.create(Object.getPrototypeOf(form)),
    form
  );

  const isOwner = formInstance.owner === user.id;
  const isReviewer = formInstance.reviewers
    ? formInstance.reviewers.some((rev) => rev === user.id)
    : false;
  
  const issueStatus_opened = "opened";
  const issueStatus_draft = "draft";
  const issueStatus_eliminated = "eliminated";
  const issueStatus_closed = "closed";
  const user_ID = user.id
  
  const descFields = [
    "attachmentsAndComment",
    "members",
    "info",
  ];

  const createFields = [
    "numberObject",
    "memberStatus",
    "attachmentsAndComment",
    "members",
    "info",
    "selectTest",
    "selectRequest"
  ]

  const processFields = ["memberStatus"];

  const testFields = ["selectTest"];

  const requestFields = ["selectRequest"];

  const formatter = new Intl.DateTimeFormat("ru", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  });

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

  if (formInstance.data && formInstance.data.selectTab === "description") {
    hideFields(formCopy.scheme.properties, descFields);
    if (formInstance.data.info.criticality === "critical"){
      formCopy.scheme.properties.info.properties.stopWork.hidden = false
    }
    else {
      formCopy.scheme.properties.info.properties.stopWork.hidden = true
    }
  }

  if (formInstance.data && formInstance.data.selectTab === "process") {
    hideFields(formCopy.scheme.properties, processFields);
    formCopy.scheme.properties.memberStatus.properties.executorStatus.hidden = false;
    formCopy.scheme.properties.memberStatus.properties.eliminationConfirmation.hidden = false;
    formCopy.scheme.properties.memberStatus.properties.close.hidden = false;
    if ((formInstance.data.memberStatus && formInstance.data.memberStatus.executorStatus && formInstance.data.memberStatus.executorStatus === "issued") || (formInstance.data.memberStatus.eliminationConfirmation)){
      formCopy.scheme.properties.memberStatus.properties.whatEliminate.hidden = false;
      if (formInstance.data.memberStatus.executorStatus === "issued"){
          formCopy.scheme.properties.memberStatus.required = ["whatEliminate"]
      }
    }
    
  }

  if (formInstance.data && formInstance.data.selectTab === "request") { 
    hideFields(formCopy.scheme.properties, requestFields);
  }

  if (formInstance.data){
    formCopy.scheme.properties.members.required = ["responsible"]
  }
  
  if (formInstance.data && formInstance.data.selectTab === "test") { 
    hideFields(formCopy.scheme.properties, testFields);
  }

  if (isCreation) {
    formCopy.scheme.properties.selectTab.hidden = true;
    hideFields(formCopy.scheme.properties, [...createFields]);
    formCopy.scheme.properties.members.properties.eliminationResponsible.readOnly = true
    formCopy.scheme.properties.numberObject.required = ["number"]
    if (formInstance.data.info.criticality === "critical"){
      formCopy.scheme.properties.info.properties.stopWork.hidden = false
    }
    else {
      formCopy.scheme.properties.info.properties.stopWork.hidden = true
    }
  } else {
    formCopy.scheme.properties.selectTab.hidden = false;
    formCopy.scheme.properties.selectTab.default = "description";
    formCopy.scheme.properties.numberObject.required = []
  }

  
  if (formInstance.data.issueStatus && formInstance.data.issueStatus.length != 0 && formInstance.data.issueStatus.includes(issueStatus_draft)){
    
    blockFields(formCopy.scheme.properties);
    
    if(user_ID.includes(item.data.responsibleCheck)){
      formCopy.scheme.properties.memberStatus.properties.responsibleStatus.readOnly = false
      formCopy.scheme.properties.attachmentsAndComment.properties.attachments.readOnly = false
      formCopy.scheme.properties.attachmentsAndComment.properties.comment.readOnly = false
      formCopy.scheme.properties.members.properties.responsible.readOnly = false
      formCopy.scheme.properties.members.properties.executor.readOnly = false
      formCopy.scheme.properties.info.properties.contraventionObject.readOnly = false
      formCopy.scheme.properties.info.properties.typeOfWork.readOnly = false
      formCopy.scheme.properties.info.properties.criticality.readOnly = false
      formCopy.scheme.properties.info.properties.dateTime.readOnly = false
      formCopy.scheme.properties.info.properties.area.readOnly = false
      formCopy.scheme.properties.info.properties.cafm.readOnly = false
      formCopy.scheme.properties.info.properties.disturbedPoint.readOnly = false
      formCopy.scheme.properties.selectTest.properties.test.readOnly = false
      formCopy.scheme.properties.selectRequest.properties.request.readOnly = false
      formCopy.scheme.properties.info.properties.stopWork.readOnly = false
      formCopy.scheme.properties.info.properties.remedialAction.readOnly = false      
    }
    
   if (item.data.executorCheck && user_ID.includes(item.data.executorCheck)){
      formCopy.scheme.properties.members.properties.eliminationResponsible.readOnly = false
   }
    
  }
  
  
  if (formInstance.data.issueStatus && formInstance.data.issueStatus.length != 0 && formInstance.data.issueStatus.includes(issueStatus_opened)){
    
    blockFields(formCopy.scheme.properties);
    
    if(user_ID.includes(item.data.responsibleCheck)){
      formCopy.scheme.properties.memberStatus.properties.responsibleStatus.readOnly = false
      formCopy.scheme.properties.attachmentsAndComment.properties.attachments.readOnly = false
      formCopy.scheme.properties.attachmentsAndComment.properties.comment.readOnly = false
      formCopy.scheme.properties.members.properties.responsible.readOnly = false
      formCopy.scheme.properties.members.properties.executor.readOnly = false
      formCopy.scheme.properties.info.properties.contraventionObject.readOnly = false
      formCopy.scheme.properties.info.properties.typeOfWork.readOnly = false
      formCopy.scheme.properties.info.properties.criticality.readOnly = false
      formCopy.scheme.properties.info.properties.dateTime.readOnly = false
      formCopy.scheme.properties.info.properties.area.readOnly = false
      formCopy.scheme.properties.info.properties.cafm.readOnly = false
      formCopy.scheme.properties.info.properties.disturbedPoint.readOnly = false
      formCopy.scheme.properties.selectTest.properties.test.readOnly = false
      formCopy.scheme.properties.selectRequest.properties.request.readOnly = false
      formCopy.scheme.properties.info.properties.stopWork.readOnly = false
      formCopy.scheme.properties.info.properties.remedialAction.readOnly = false 
    }
    if (user_ID.includes(item.data.executorCheck)){
      formCopy.scheme.properties.memberStatus.properties.executorStatus.readOnly = false
      formCopy.scheme.properties.attachmentsAndComment.properties.attachments.readOnly = false
      formCopy.scheme.properties.members.properties.executor.readOnly = false
      formCopy.scheme.properties.selectTest.properties.test.readOnly = false
      formCopy.scheme.properties.memberStatus.properties.whatEliminate.readOnly = false
      formCopy.scheme.properties.members.properties.eliminationResponsible.readOnly = false
    }
  }
  
  if (formInstance.data.issueStatus && formInstance.data.issueStatus.length != 0 && formInstance.data.issueStatus.includes(issueStatus_eliminated)){
    
    blockFields(formCopy.scheme.properties);
    
    if(user_ID.includes(item.data.responsibleCheck)){
      formCopy.scheme.properties.memberStatus.properties.eliminationConfirmation.readOnly = false
      formCopy.scheme.properties.selectTest.properties.test.readOnly = false
      formCopy.scheme.properties.selectRequest.properties.request.readOnly = false
      if (formInstance.data.memberStatus && formInstance.data.memberStatus.eliminationConfirmation && formInstance.data.memberStatus.eliminationConfirmation === "issued"){
          formCopy.scheme.properties.memberStatus.properties.close.readOnly = false
      }  
      else{
          formCopy.scheme.properties.memberStatus.properties.close.readOnly = true
      }
    }
    
    if (user_ID.includes(item.data.executorCheck)){
      formCopy.scheme.properties.memberStatus.properties.executorStatus.readOnly = false
      formCopy.scheme.properties.selectTest.properties.test.readOnly = false
      formCopy.scheme.properties.members.properties.eliminationResponsible.readOnly = false
    }
  }
  
  if (formInstance.data.issueStatus && formInstance.data.issueStatus.length != 0 && formInstance.data.issueStatus.includes(issueStatus_closed)){
    
    blockFields(formCopy.scheme.properties);
          
  }
  
  if (!isCreation && !(user_ID.includes(item.data.responsibleCheck)) && !(user_ID.includes(item.data.executorCheck))){
    
    blockFields(formCopy.scheme.properties);
    
  }
  
  if (formInstance.data.members && formInstance.data.members.responsible && formInstance.data.members.responsible.length != 0 && formInstance.data.members.executor && formInstance.data.members.executor.length != 0 && formInstance.data.info.typeOfWork && formInstance.data.info.typeOfWork.length != 0 && formInstance.data.info.dateTime && formInstance.data.info.dateTime != 0 && formInstance.data.info.area && formInstance.data.info.area.length != 0 && user_ID.includes(item.data.members.responsible) && ( !(formInstance.data.issueStatus) || formInstance.data.issueStatus.includes(issueStatus_draft) || formInstance.data.issueStatus.includes(issueStatus_opened))){
    formCopy.scheme.properties.memberStatus.properties.responsibleStatus.readOnly = false
    formCopy.scheme.properties.memberStatus.properties.responsibleStatus.helperText = ""
  }
  else{
    formCopy.scheme.properties.memberStatus.properties.responsibleStatus.readOnly = true
    formCopy.scheme.properties.memberStatus.properties.responsibleStatus.helperText = "Чтобы исполнителю пришло уведомление о вашем замечание, измените статус на «Выдано». Для этого нужно заполнить все обязательные поля(*). Если вы пока не можете это сделать, сохраните заявку в статусе «Не выдано» и завершите заполнение позже."
  }
  
  if (formInstance.data.dateCheck.dateCount === 2){
    formCopy.scheme.properties.info.properties.dateTime.readOnly = true
  }
  
  //let number = Math.max(formCopy.scheme.properties.testViewDisplay.variables.number);
  //formCopy.scheme.properties.testViewDisplay.variables.number  = number + 1;


  //console.warn("viewUpdate", formCopy.scheme.properties.testViewDisplay);
  //console.log(formInstance);
 // console.log(Math.max(formCopy.scheme.properties.testViewDisplay.variables.number));
  //console.log(number);

  return formCopy;
}
