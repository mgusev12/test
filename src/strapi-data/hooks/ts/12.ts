export function onChange(props) {
    const { item, user } = props;
    const response = Object.assign(Object.create(Object.getPrototypeOf(item)), item);
    const { inspectionRequest, formInstance } = response;


 if (Object.keys(response.data).length != 0 ){
    if (response.data.members && response.data.members.applicant && response.data.dateTime.dateTimeStart != 0 && response.data.dateTime.dateTimeEnd != 0 && ((response.data.info.testType === "laboratory" && response.data.info.laboratory && response.data.info.laboratory.length != 0  && response.data.info.typeOfLaboratory && response.data.info.typeOfLaboratory.length != 0) || (response.data.info.testType === "geodetic" )) && response.data.members.applicant.length != 0 && response.data.members.executor && response.data.members.executor.length != 0 && response.data.areaObject && response.data.areaObject.area && response.data.areaObject.area.length != 0 ){
         
   }
   else{
        delete response.data.checkStatus.applicantStatus
        response.data.checkStatus.applicantStatus = "notReady"
   }
 }
  
  return response;
  
}