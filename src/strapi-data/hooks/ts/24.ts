export function onChange(props) {
    const { item, user } = props;
    const response = Object.assign(Object.create(Object.getPrototypeOf(item)), item);
    const { inspectionRequest, formInstance } = response;
  
  if (Object.keys(response.data).length != 0){
  if (response.data.subcontractor.user && response.data.subcontractor.user.length != 0 && response.data.dateTimeDuration.dateTime != 0 && response.data.dateTimeDuration.duration != 0 && response.data.actAndTypeOfWorkObject && response.data.actAndTypeOfWorkObject.rdCode && response.data.actAndTypeOfWorkObject.rdCode.length != 0 && response.data.actAndTypeOfWorkObject.typeOfWork && response.data.actAndTypeOfWorkObject.typeOfWork.length != 0 && response.data.actAndTypeOfWorkObject.act != '' && response.data.customerRepresentative.user && response.data.customerRepresentative.user.length != 0 && response.data.actAndTypeOfWorkObject.rdAttachments && response.data.actAndTypeOfWorkObject.rdAttachments.length != 0 && response.data.areaObject && response.data.areaObject.area && response.data.areaObject.area.length != 0){
          
      }
      else {
          delete response.data.subcontractor.selectOne
          response.data.subcontractor.selectOne = "notReady"
      }
  }
  return response;
}