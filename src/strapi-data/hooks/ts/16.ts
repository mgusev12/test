export function onCreate(props) {
    const { item, user } = props;
    const response = Object.assign(Object.create(Object.getPrototypeOf(item)), item);
    const { inspectionRequest, formInstance } = response;
    let author = []

    response.data.members = {applicant:[user.id], executor:[]};
    response.data.info = {testType: 'laboratory',laboratory: [], typeOfLaboratory: []};
    response.data.checkStatus = {applicantStatus: 'notReady'};
    response.data.dateTime = {dateTimeStart: 0, dateTimeEnd: 0};
    response.data.areaObject = {area: []};
    response.data.crCheck = "1"
    return response;
}