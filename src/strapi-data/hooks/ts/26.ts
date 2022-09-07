export function onCreate(props) {
    const { item, user } = props;
    const response = Object.assign(Object.create(Object.getPrototypeOf(item)), item);
    const { inspectionRequest, formInstance } = response;

    response.data.responsible = {user:[user.id],selectOne: 'notReady', check: 'responsible'}
    response.data.engineer = {user:[], check: 'engineer'}
    response.data.info = {dateTime: 0, mtp: '',  organization: '', area:[], supDocs: []}
    response.data.crCheck = "1"
  
    return response;
}