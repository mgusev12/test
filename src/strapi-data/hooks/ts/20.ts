export function onCreate(props) {
    const { item, user } = props;
    const response = Object.assign(Object.create(Object.getPrototypeOf(item)), item);
    const { inspectionRequest, formInstance } = response;
    let author = []

    response.data.subcontractor = {user:[user.id], selectOne: 'notReady', check: 'subcontractor'};
    response.data.dateTimeDuration = {dateTime: 0, duration: []};
    response.data.areaObject = {area: []};
    response.data.actAndTypeOfWorkObject = {act: '', rdCode: [], typeOfWork: [], rdAttachments: []};
    response.data.customerRepresentative = {user:[], check: 'customerRepresentative'};
    response.data.representativeDesignerSupervisor = {user:[],check: 'representativeDesignerSupervisor'};
    response.data.result = {}
    response.data.crCheck = "1"
    return response;
}