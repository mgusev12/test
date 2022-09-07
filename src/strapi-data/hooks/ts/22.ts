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
    : false
  
  const user_ID = user.id
  const requestStatus_draft = "draft";
  const requestStatus_review = "review";
  const requestStatus_confirmed = "confirmed";
  const requestStatus_rejected = "rejected";
  const requestStatus_accepted = "accepted";
  const requestStatus_notAccepted = "notAccepted";
  
  const descFields = ["info"];

  const createFields = [
    "numberObject",
    "responsible",
    "info",
    "engineer"
  ]

  const inspectionFields = [
    "responsible",
    "engineer",
    "subcontractor",
    "supervision"
  ];

  const testFields = ["selectTest"];

  const checklistFields = ["checklistObject", "checklistView"];
  
  const resultFields = ["result"];

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
  
  let checklistCheck = true
  
  if (!(isCreation) && formInstance.data.checklistView) {
   if (formInstance.data.checklistObject){
       const checklistGroup = formInstance.data.chelistObject
       for (const fildName in checklistGroup){
          if (checklistGroup[fildName] === null){
            checklistCheck = false;
            break
          }
       }
   }
     else {
     checklistCheck = false
   }
  }
  else {
     checklistCheck = false
 }
  
  formCopy.scheme.properties.responsible.required = ["user"]
  
  formCopy.scheme.order = ["numberObject", "selectTab", "info", "engineer", "responsible"]
  
  if (formInstance.data && formInstance.data.selectTab === "description") {
    hideFields(formCopy.scheme.properties, descFields);
  }

  if (formInstance.data && formInstance.data.selectTab === "inspection") {
    hideFields(formCopy.scheme.properties, inspectionFields);
    formCopy.scheme.order = ["selectTab","responsible","engineer", "subcontractor","supervision"]
    if (formInstance.data.engineer && formInstance.data.engineer.user && formInstance.data.engineer.user.length != 0){
      formCopy.scheme.properties.engineer.properties.selectOne.hidden = false
      if (formInstance.data.engineer.selectOne && formInstance.data.engineer.selectOne === "notAccept"){
          formCopy.scheme.properties.engineer.properties.rejectReason.hidden = false
        }
        else {
          formCopy.scheme.properties.engineer.properties.rejectReason.hidden = true
        }
    }
    else {
      formCopy.scheme.properties.engineer.properties.selectOne.hidden = true
    }
    
    if (formInstance.data.subcontractor && formInstance.data.subcontractor.user && formInstance.data.subcontractor.user.length != 0){
      formCopy.scheme.properties.subcontractor.properties.selectOne.hidden = false
      if (formInstance.data.subcontractor.selectOne && formInstance.data.subcontractor.selectOne === "notAccept"){
          formCopy.scheme.properties.subcontractor.properties.rejectReason.hidden = false
        }
        else {
          formCopy.scheme.properties.subcontractor.properties.rejectReason.hidden = true
        }
    }
    else {
      formCopy.scheme.properties.subcontractor.properties.selectOne.hidden = true
    }
    
    if (formInstance.data.supervision && formInstance.data.supervision.user && formInstance.data.supervision.user.length != 0){
      formCopy.scheme.properties.supervision.properties.selectOne.hidden = false
      if (formInstance.data.supervision.selectOne && formInstance.data.supervision.selectOne === "notAccept"){
          formCopy.scheme.properties.supervision.properties.rejectReason.hidden = false
        }
        else {
          formCopy.scheme.properties.supervision.properties.rejectReason.hidden = true
        }
    }
    else {
      formCopy.scheme.properties.supervision.properties.selectOne.hidden = true
    }
  }
  
  if (formInstance.data && formInstance.data.selectTab === "result") {
    hideFields(formCopy.scheme.properties, resultFields);
    if (formInstance.data.result && formInstance.data.result.selectOne === "rejected"){
      formCopy.scheme.properties.result.properties.rejectReason.hidden = false
    }
    else {
      formCopy.scheme.properties.result.properties.rejectReason.hidden = true
    }
    if (formInstance.data.result && (formInstance.data.result.selectOne)){
      formCopy.scheme.properties.result.properties.selectOne.helperText = formInstance.data.nowTime   
    }
  }

  if (formInstance.data && formInstance.data.selectTab === "checklist") { 
    hideFields(formCopy.scheme.properties, checklistFields);
  }

  if (formInstance.data && formInstance.data.selectTab === "test") { 
    hideFields(formCopy.scheme.properties, testFields);
  }

  if (isCreation) {
    formCopy.scheme.properties.selectTab.hidden = true;
    hideFields(formCopy.scheme.properties, [...createFields]);
    formCopy.scheme.properties.engineer.properties.selectOne.hidden = true
    formCopy.scheme.properties.numberObject.required = ["number"]
  } else {
    formCopy.scheme.properties.selectTab.hidden = false;
    formCopy.scheme.properties.selectTab.default = "description";
  }
  
  if (!(isCreation)){
         blockFields(formCopy.scheme.properties);
         formCopy.scheme.properties.checklistObject.readOnly = true
         formCopy.scheme.properties.checklistView.readOnly = true
    //Материально-ответственное лицо
    if (item.data.responsible.check && user_ID.includes(item.data.responsible.check)){
      if (formInstance.data.inControlStatus.includes(requestStatus_review) || formInstance.data.inControlStatus.includes(requestStatus_confirmed)){
         formCopy.scheme.properties.info.properties.dateTime.readOnly = false
         formCopy.scheme.properties.responsible.properties.user.readOnly = false
         formCopy.scheme.properties.responsible.properties.selectOne.readOnly = false
      }
     else if (formInstance.data.inControlStatus.includes(requestStatus_draft) || formInstance.data.inControlStatus.includes(requestStatus_rejected)){
         formCopy.scheme.properties.info.properties.dateTime.readOnly = false 
         formCopy.scheme.properties.info.properties.mtp.readOnly = false 
         formCopy.scheme.properties.info.properties.count.readOnly = false 
         formCopy.scheme.properties.info.properties.organization.readOnly = false 
         formCopy.scheme.properties.info.properties.supDocs.readOnly = false 
         formCopy.scheme.properties.info.properties.area.readOnly = false
         formCopy.scheme.properties.engineer.properties.user.readOnly = false
         formCopy.scheme.properties.responsible.properties.user.readOnly = false
         formCopy.scheme.properties.responsible.properties.selectOne.readOnly = false
     }
   }
   //Инженер ОВиСК  
   if (item.data.engineer.check && user_ID.includes(item.data.engineer.check)){
      if (formInstance.data.inControlStatus.includes(requestStatus_review) || formInstance.data.inControlStatus.includes(requestStatus_confirmed) || formInstance.data.inControlStatus.includes(requestStatus_rejected)){
         formCopy.scheme.properties.info.properties.dateTime.readOnly = false
         formCopy.scheme.properties.engineer.properties.selectOne.readOnly = false
         formCopy.scheme.properties.engineer.properties.rejectReason.readOnly = false
         formCopy.scheme.properties.engineer.properties.user.readOnly = false
         formCopy.scheme.properties.selectTest.properties.test.readOnly = false
         formCopy.scheme.properties.checklistObject.readOnly = false
         formCopy.scheme.properties.checklistView.readOnly = false
         if (formInstance.data.inControlStatus.includes(requestStatus_confirmed)){
             formCopy.scheme.properties.supervision.properties.user.readOnly = false
             formCopy.scheme.properties.subcontractor.properties.user.readOnly = false
             if (checklistCheck){    
                 formCopy.scheme.properties.result.properties.selectOne.readOnly = false
                 formCopy.scheme.properties.result.properties.rejectReason.readOnly = false
                 if (formInstance.data.result && formInstance.data.result.selectOne) {
                    formCopy.scheme.properties.result.properties.close.readOnly = false
                 }
                 else {
                    formCopy.scheme.properties.result.properties.close.readOnly = true
                 }
             }
           }
         }
     }
   
    if  (item.data.subcontractor && item.data.subcontractor.check && user_ID.includes(item.data.subcontractor.check)){
      if (formInstance.data.inControlStatus.includes(requestStatus_review) || formInstance.data.inControlStatus.includes(requestStatus_confirmed) || formInstance.data.inControlStatus.includes(requestStatus_rejected)){
        formCopy.scheme.properties.info.properties.dateTime.readOnly = false
        formCopy.scheme.properties.subcontractor.properties.user.readOnly = false
        formCopy.scheme.properties.subcontractor.properties.selectOne.readOnly = false
        formCopy.scheme.properties.subcontractor.properties.rejectReason.readOnly = false
      }
    }  
    
    if  (item.data.supervision && item.data.supervision.check && user_ID.includes(item.data.supervision.check)){
      if (formInstance.data.inControlStatus.includes(requestStatus_review) || formInstance.data.inControlStatus.includes(requestStatus_confirmed) || formInstance.data.inControlStatus.includes(requestStatus_rejected)){
        formCopy.scheme.properties.info.properties.dateTime.readOnly = false
        formCopy.scheme.properties.supervision.properties.user.readOnly = false
        formCopy.scheme.properties.supervision.properties.selectOne.readOnly = false
        formCopy.scheme.properties.supervision.properties.rejectReason.readOnly = false
      }
    }
   } 
  
  if (formInstance.data.responsible && formInstance.data.responsible.user && formInstance.data.responsible.user.length != 0 && formInstance.data.info.dateTime != 0 && formInstance.data.info.mtp && formInstance.data.info.mtp != "" && formInstance.data.info.count && formInstance.data.info.organization != "" && formInstance.data.info.supDocs && formInstance.data.info.supDocs.length != 0 && formInstance.data.info.area && formInstance.data.info.area.length != 0 && formInstance.data.engineer && formInstance.data.engineer.user && formInstance.data.engineer.user.length != 0 && user_ID.includes(item.data.responsible.user)){
          formCopy.scheme.properties.responsible.properties.selectOne.readOnly = false
          formCopy.scheme.properties.responsible.properties.selectOne.helperText = ""
      }
      else {
          formCopy.scheme.properties.responsible.properties.selectOne.readOnly = true
          formCopy.scheme.properties.responsible.properties.selectOne.helperText = "Чтобы ваша заявка на входной контроль отправилась на рассмотрение, измените статус на «Готов к входному контролю». Для этого нужно заполнить все обязательные поля. Если вы пока не можете это сделать, сохраните заявку в статусе «Не готов к входному контролю» и завершите заполнение позже."
      } 
   
  
 if (formInstance.data && !formInstance.data.checklistView?.length && !formCopy.scheme.properties.checklistObject.hidden) {
        formCopy.scheme.properties.checklistObject.hidden = true;
        formCopy.scheme.properties.checklistObject.id = undefined;
        formCopy.scheme.properties.checklistObject.groups = [];
        formCopy.scheme.properties.checklistObject.variants = [];
    }

    if (formInstance.data && formInstance.data.selectTab === "checklist" && formInstance.data.checklistView &&
        formInstance.data.checklistView[0].id !== formCopy.scheme.properties.checklistObject?.id
    ) {
        const checklist = formInstance.data.checklistView[0];
        formCopy.scheme.properties.checklistObject = {
            ...formCopy.scheme.properties.checklistObject,
            id: checklist.id,
            groups: checklist.groups,
            variants: checklist.variants,
            hidden: false,
        };
    }
  
  if (formInstance.data && formInstance.data.info && formInstance.data.info.mtp){
    formInstance.data.info.units = [formInstance.data.info.mtp[0].units_id]
  }
  else {
    delete formInstance.data.info.units
  }
  console.log(formInstance);
  return formCopy
}