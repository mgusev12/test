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
  
  const requestStatus_draft = "draft";
  const requestStatus_review = "review";
  const requestStatus_confirmed = "confirmed";
  const requestStatus_rejected = "rejected";
  const requestStatus_accepted = "accepted";
  const requestStatus_notAccepted = "notAccepted";
  
  const descFields = [
    "dateTimeDuration",
    "areaObject",
    "actAndTypeOfWorkObject",
    "attachmentsAndComment"
  ];

  const creationFields = [
    "numberObject",
    "dateTimeDuration",
    "areaObject",
    "actAndTypeOfWorkObject",
    "subcontractor",
    "customerRepresentative",
    "representativeDesignerSupervisor",
    "attachmentsAndComment",
    "selectTest"
  ];

  const inspectionFields = ["subcontractor","customerRepresentative","representativeDesignerSupervisor"];

  const testFields = ["selectTest"];

  const issueFields = ["selectIssue"];

  const resultFields = ["result"];

  const otherResonId = "e41d020b-af12-448d-9a4e-c0a5e5161651"
  
  const user_ID = user.id

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
  
  formCopy.scheme.order = [ "numberObject",
    "selectTab",
    "dateTimeDuration",
    "areaObject",
    "actAndTypeOfWorkObject",
    "customerRepresentative",
    "representativeDesignerSupervisor",
    "attachmentsAndComment",
    "result",
    "selectTest",
    "subcontractor"]
  
  if (formInstance.data && formInstance.data.selectTab === "description") {
    hideFields(formCopy.scheme.properties, descFields);
  }

  if (formInstance.data && formInstance.data.selectTab === "inspection") {
    hideFields(formCopy.scheme.properties, inspectionFields);
    formCopy.scheme.order = ["selectTab", "subcontractor", "customerRepresentative", "representativeDesignerSupervisor"]
     if (formInstance.data.customerRepresentative.user && formInstance.data.customerRepresentative.user.length != 0 && formInstance.data.customerRepresentative.selectOne && formInstance.data.customerRepresentative.selectOne === "rejected"){
        formCopy.scheme.properties.customerRepresentative.properties.rejectReason.hidden = false;
        formCopy.scheme.properties.customerRepresentative.required = ["rejectReason"];
        if (item.data.customerRepresentative.rejectReason && item.data.customerRepresentative.rejectReason.length != 0 && otherResonId.includes(item.data.customerRepresentative.rejectReason)) {
            formCopy.scheme.properties.customerRepresentative.properties.otherReason.hidden = false;
            formCopy.scheme.properties.customerRepresentative.required = ["rejectReason","otherReason"];
        }
        else{
            formCopy.scheme.properties.customerRepresentative.properties.otherReason.hidden = true;
            formCopy.scheme.properties.customerRepresentative.required = ["rejectReason"];
        }
      }
      else if (formInstance.data.customerRepresentative.selectOne === "accept"){
        formCopy.scheme.properties.customerRepresentative.properties.rejectReason.hidden = true;
        formCopy.scheme.properties.customerRepresentative.properties.otherReason.hidden = true;
        formCopy.scheme.properties.customerRepresentative.required = []
      }
      if (formInstance.data.representativeDesignerSupervisor.user && formInstance.data.representativeDesignerSupervisor.user.length != 0  && formInstance.data.representativeDesignerSupervisor.selectOne && formInstance.data.representativeDesignerSupervisor.selectOne === "rejected"){
        formCopy.scheme.properties.representativeDesignerSupervisor.properties.rejectReason.hidden = false;
        formCopy.scheme.properties.representativeDesignerSupervisor.required = ["rejectReason"];
        if (item.data.representativeDesignerSupervisor.rejectReason && item.data.representativeDesignerSupervisor.rejectReason.length != 0 && otherResonId.includes(item.data.representativeDesignerSupervisor.rejectReason)){
            formCopy.scheme.properties.representativeDesignerSupervisor.properties.otherReason.hidden = false;
            formCopy.scheme.properties.representativeDesignerSupervisor.required = ["rejectReason","otherReason"];
        }
        else{
            formCopy.scheme.properties.representativeDesignerSupervisor.properties.otherReason.hidden = true;
            formCopy.scheme.properties.representativeDesignerSupervisor.required = ["rejectReason"];
        }
      }
      else if (formInstance.data.representativeDesignerSupervisor.selectOne === "accept") {
        formCopy.scheme.properties.representativeDesignerSupervisor.properties.rejectReason.hidden = true;
        formCopy.scheme.properties.representativeDesignerSupervisor.properties.otherReason.hidden = true;
        formCopy.scheme.properties.representativeDesignerSupervisor.required = []
      }
  }
 
  if (formInstance.data && formInstance.data.selectTab === "issue") { 
    hideFields(formCopy.scheme.properties, issueFields);
  }

formCopy.scheme.properties.subcontractor.required = ["user"]

  if (formInstance.data && formInstance.data.selectTab === "test") { 
    hideFields(formCopy.scheme.properties, testFields);
  }

  if (formInstance.data && formInstance.data.selectTab === "result") {
    hideFields(formCopy.scheme.properties, resultFields);
    if (formInstance.data.result && formInstance.data.result.selectOne === "rejected") {
        formCopy.scheme.properties.result.properties.rejectReason.hidden = false;
        formCopy.scheme.properties.result.required = ["rejectReason"];
        if (item.data.result.rejectReason && item.data.result.rejectReason.length != 0 && otherResonId.includes(item.data.result.rejectReason)) {
            formCopy.scheme.properties.result.properties.otherReason.hidden = false;
            formCopy.scheme.properties.result.required = ["rejectReason","otherReason"];
        }
        else {
            formCopy.scheme.properties.result.properties.otherReason.hidden = true;
            formCopy.scheme.properties.result.required = ["rejectReason"];
        }
      }
    else {
      formCopy.scheme.properties.result.properties.rejectReason.hidden = true;
      formCopy.scheme.properties.result.properties.otherReason.hidden = true;
      formCopy.scheme.properties.result.required = []
    }
  }

  if (isCreation) {
    formCopy.scheme.properties.selectTab.hidden = true;
    hideFields(formCopy.scheme.properties, [...creationFields]);
    formCopy.scheme.properties.customerRepresentative.properties.selectOne.hidden = true;
    formCopy.scheme.properties.numberObject.required = ["number"] 
formCopy.scheme.properties.representativeDesignerSupervisor.properties.selectOne.hidden = true;
  } else {
    formCopy.scheme.properties.selectTab.hidden = false;
    formCopy.scheme.properties.numberObject.required = []
    formCopy.scheme.properties.selectTab.default = "description";
  }

  

  if (formInstance.data.requestStatus && formInstance.data.requestStatus.length != 0 && formInstance.data.requestStatus.includes(requestStatus_draft)){
    
    blockFields(formCopy.scheme.properties);
    
    if (user_ID.includes(item.data.subcontractor.check)) {
        formCopy.scheme.properties.dateTimeDuration.properties.dateTime.readOnly = false
        formCopy.scheme.properties.dateTimeDuration.properties.duration.readOnly = false
        formCopy.scheme.properties.areaObject.properties.area.readOnly = false
        formCopy.scheme.properties.actAndTypeOfWorkObject.properties.act.readOnly = false
        formCopy.scheme.properties.actAndTypeOfWorkObject.properties.typeOfWork.readOnly = false
        formCopy.scheme.properties.actAndTypeOfWorkObject.properties.rdCode.readOnly = false
        formCopy.scheme.properties.actAndTypeOfWorkObject.properties.rdAttachments.readOnly = false
        formCopy.scheme.properties.subcontractor.properties.user.readOnly = false
        formCopy.scheme.properties.subcontractor.properties.selectOne.readOnly = false
        formCopy.scheme.properties.customerRepresentative.properties.user.readOnly = false
        formCopy.scheme.properties.representativeDesignerSupervisor.properties.user.readOnly = false
        formCopy.scheme.properties.attachmentsAndComment.properties.attachments.readOnly = false
        formCopy.scheme.properties.attachmentsAndComment.properties.comment.readOnly = false
        formCopy.scheme.properties.selectTest.properties.test.readOnly = false
        }
    }
  
  if (formInstance.data.requestStatus && formInstance.data.requestStatus.length != 0 && formInstance.data.requestStatus.includes(requestStatus_review)){
    
    blockFields(formCopy.scheme.properties);
    
    if (user_ID.includes(item.data.subcontractor.check)) {
        formCopy.scheme.properties.dateTimeDuration.properties.dateTime.readOnly = false
        formCopy.scheme.properties.dateTimeDuration.properties.duration.readOnly = false
        formCopy.scheme.properties.subcontractor.properties.user.readOnly = false
        formCopy.scheme.properties.subcontractor.properties.selectOne.readOnly = false
    }
    
    if (user_ID.includes(item.data.customerRepresentative.check)) {
        formCopy.scheme.properties.dateTimeDuration.properties.dateTime.readOnly = false
        formCopy.scheme.properties.dateTimeDuration.properties.duration.readOnly = false
        formCopy.scheme.properties.customerRepresentative.properties.user.readOnly = false
        formCopy.scheme.properties.customerRepresentative.properties.selectOne.readOnly = false
        formCopy.scheme.properties.customerRepresentative.properties.rejectReason.readOnly = false
        formCopy.scheme.properties.customerRepresentative.properties.otherReason.readOnly = false
        formCopy.scheme.properties.selectTest.properties.test.readOnly = false
    }
    
    if (item.data.representativeDesignerSupervisor && item.data.representativeDesignerSupervisor.user && item.data.representativeDesignerSupervisor.user.length != 0 && user_ID.includes(item.data.representativeDesignerSupervisor.check)) {
        formCopy.scheme.properties.representativeDesignerSupervisor.properties.user.readOnly = false
        formCopy.scheme.properties.representativeDesignerSupervisor.properties.selectOne.readOnly = false
        formCopy.scheme.properties.representativeDesignerSupervisor.properties.rejectReason.readOnly = false
        formCopy.scheme.properties.representativeDesignerSupervisor.properties.otherReason.readOnly = false
    }
  }
  
  if (formInstance.data.requestStatus && formInstance.data.requestStatus.length != 0 && formInstance.data.requestStatus.includes(requestStatus_rejected)){
    
    blockFields(formCopy.scheme.properties);
    
    if (user_ID.includes(item.data.subcontractor.check)) {
        formCopy.scheme.properties.dateTimeDuration.properties.dateTime.readOnly = false
        formCopy.scheme.properties.dateTimeDuration.properties.duration.readOnly = false
        formCopy.scheme.properties.areaObject.properties.area.readOnly = false
        formCopy.scheme.properties.actAndTypeOfWorkObject.properties.act.readOnly = false
        formCopy.scheme.properties.actAndTypeOfWorkObject.properties.typeOfWork.readOnly = false
        formCopy.scheme.properties.actAndTypeOfWorkObject.properties.rdCode.readOnly = false
        formCopy.scheme.properties.actAndTypeOfWorkObject.properties.rdAttachments.readOnly = false
        formCopy.scheme.properties.subcontractor.properties.user.readOnly = false
        formCopy.scheme.properties.subcontractor.properties.selectOne.readOnly = false
        formCopy.scheme.properties.customerRepresentative.properties.user.readOnly = false
        formCopy.scheme.properties.representativeDesignerSupervisor.properties.user.readOnly = false
        formCopy.scheme.properties.attachmentsAndComment.properties.attachments.readOnly = false
        formCopy.scheme.properties.attachmentsAndComment.properties.comment.readOnly = false
        formCopy.scheme.properties.selectTest.properties.test.readOnly = false
        }
    
    if (user_ID.includes(item.data.customerRepresentative.check)) {
        formCopy.scheme.properties.dateTimeDuration.properties.dateTime.readOnly = false
        formCopy.scheme.properties.dateTimeDuration.properties.duration.readOnly = false
        formCopy.scheme.properties.customerRepresentative.properties.user.readOnly = false
        formCopy.scheme.properties.customerRepresentative.properties.selectOne.readOnly = false
        formCopy.scheme.properties.customerRepresentative.properties.rejectReason.readOnly = false
        formCopy.scheme.properties.customerRepresentative.properties.otherReason.readOnly = false
        formCopy.scheme.properties.selectTest.properties.test.readOnly = false
    }
  }

  if (formInstance.data.requestStatus && formInstance.data.requestStatus.length != 0 && formInstance.data.requestStatus.includes(requestStatus_confirmed)){
    
    blockFields(formCopy.scheme.properties);
    
    if (user_ID.includes(item.data.subcontractor.check)) {
        formCopy.scheme.properties.subcontractor.properties.user.readOnly = false
        formCopy.scheme.properties.subcontractor.properties.selectOne.readOnly = false
    }
    
    if (user_ID.includes(item.data.customerRepresentative.check)) {
        formCopy.scheme.properties.customerRepresentative.properties.user.readOnly = false
        formCopy.scheme.properties.customerRepresentative.properties.selectOne.readOnly = false
        formCopy.scheme.properties.customerRepresentative.properties.rejectReason.readOnly = false
        formCopy.scheme.properties.customerRepresentative.properties.otherReason.readOnly = false
        formCopy.scheme.properties.result.properties.selectOne.readOnly = false
        formCopy.scheme.properties.result.properties.rejectReason.readOnly = false
        formCopy.scheme.properties.result.properties.otherReason.readOnly = false
        formCopy.scheme.properties.selectIssue.properties.issue.readOnly = false
        formCopy.scheme.properties.selectTest.properties.test.readOnly = false
        if (item.data.result && item.data.result.selectOne && (item.data.result.selectOne = "accept" || (item.data.result.selectOne = "rejected" && item.data.result.rejectReason.length != 0 && item.data.result.otherReason))) {
           formCopy.scheme.properties.result.properties.close.readOnly = false
        }
    }
    
    if (item.data.representativeDesignerSupervisor && item.data.representativeDesignerSupervisor.user && item.data.representativeDesignerSupervisor.user.length != 0 && user_ID.includes(item.data.representativeDesignerSupervisor.check)) {
        formCopy.scheme.properties.representativeDesignerSupervisor.properties.user.readOnly = false
        formCopy.scheme.properties.representativeDesignerSupervisor.properties.selectOne.readOnly = false
        formCopy.scheme.properties.representativeDesignerSupervisor.properties.rejectReason.readOnly = false
        formCopy.scheme.properties.representativeDesignerSupervisor.properties.otherReason.readOnly = false
    }
  }

  if (formInstance.data.requestStatus && formInstance.data.requestStatus.length != 0 && (formInstance.data.requestStatus.includes(requestStatus_accepted) || formInstance.data.requestStatus.includes(requestStatus_notAccepted))){
    
    blockFields(formCopy.scheme.properties);
    
  }

  
   if (Object.keys(formInstance.data).length != 0 ){
    if (formInstance.data.subcontractor.user && formInstance.data.subcontractor.user.length != 0 && formInstance.data.dateTimeDuration.dateTime != 0 && formInstance.data.dateTimeDuration.duration != 0 && formInstance.data.actAndTypeOfWorkObject && formInstance.data.actAndTypeOfWorkObject.rdCode && formInstance.data.actAndTypeOfWorkObject.rdCode.length != 0 && formInstance.data.actAndTypeOfWorkObject.typeOfWork && formInstance.data.actAndTypeOfWorkObject.typeOfWork.length != 0 && formInstance.data.actAndTypeOfWorkObject.act && formInstance.data.customerRepresentative.user && formInstance.data.customerRepresentative.user.length != 0 && formInstance.data.actAndTypeOfWorkObject.rdAttachments && formInstance.data.actAndTypeOfWorkObject.rdAttachments.length != 0 && formInstance.data.areaObject && formInstance.data.areaObject.area && formInstance.data.areaObject.area.length != 0 && user_ID.includes(item.data.subcontractor.user) && (isCreation || formInstance.data.requestStatus.includes(requestStatus_draft) || formInstance.data.requestStatus.includes(requestStatus_confirmed) || formInstance.data.requestStatus.includes(requestStatus_rejected) || formInstance.data.requestStatus.includes(requestStatus_review))){
          formCopy.scheme.properties.subcontractor.properties.selectOne.readOnly = false
          formCopy.scheme.properties.subcontractor.properties.selectOne.helperText = ""
      }
      else {
          formCopy.scheme.properties.subcontractor.properties.selectOne.readOnly = true
          formCopy.scheme.properties.subcontractor.properties.selectOne.helperText = "Чтобы ваша заявка отправилась на рассмотрение, измените статус на «Готов к приёмке». Для этого нужно заполнить все обязательные поля. Если вы пока не можете это сделать, сохраните заявку в статусе «Не готов к приёмке» и завершите заполнение позже."
      }
  }

  return formCopy;
}
