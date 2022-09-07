export function onCreate(props) {
    const { item, user } = props;
    const response = Object.assign(Object.create(Object.getPrototypeOf(item)), item);
    const { inspectionRequest, formInstance } = response;

    response.data.members = {responsible:[user.id],executor:[]}
    response.data.memberStatus = {responsibleStatus: 'notIssued'} 
    response.data.info = {dateTime: 0, typeOfWork: [], criticality: 'notCritical', contraventionObject: 'work', area:[], stopWork: 'no'}
    response.data.attachmentsAndComment = {}
    response.data.crCheck = "1"
    response.data.dateCheck = {oldDate: 0, dateCount: 0}
  
    return response;
}