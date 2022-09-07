export function onChange(props) {
    const { item, user } = props;
    const response = Object.assign(Object.create(Object.getPrototypeOf(item)), item);
    const { inspectionRequest, formInstance } = response;
    
  if (Object.keys(response.data).length != 0){  
  if (response.data.members && response.data.members.responsible && response.data.members.responsible.length != 0 && response.data.members.executor && response.data.members.executor.length != 0 && response.data.info.typeOfWork && response.data.info.typeOfWork.length != 0 && response.data.info.dateTime != 0 && response.data.info.area && response.data.info.area.length != 0 ){
     
  }
  else {
     delete response.data.memberStatus.responsibleStatus ;
     response.data.memberStatus.responsibleStatus = "notIssued"
  };
   
  if (response.data.info.criticality === "notCritical"){
    response.data.info.stopWork = "no"
  }
 }    
   return response;
}