export function onChange(props) {
  const { item, user } = props;
  const formCopy = Object.assign(
    Object.create(Object.getPrototypeOf(item)),
    item
  );
  const { inspectionRequest, formInstance } = formCopy;
  const { data } = formInstance;

  if (
    Object.keys(formInstance.data).length != 0 &&
    formInstance.data.memberStatus.responsibleStatus === "issued"
  ) {
    formCopy.scheme.properties.members.required = ["responsible", "executor"];
    formCopy.scheme.properties.info.required = ["typeOfWork", "dateTime"];
    formCopy.scheme.properties.memberStatus.properties.executorStatus.readOnly = false;
    if (
      Object.keys(formInstance.data).length != 0 &&
      formInstance.data.memberStatus.executorStatus === "issued"
    ) {
      formCopy.scheme.properties.memberStatus.properties.eliminationConfirmation.readOnly = false;
    } else if (
      Object.keys(formInstance.data).length != 0 &&
      formInstance.data.memberStatus.executorStatus === "notIssued"
    ) {
      formCopy.scheme.properties.memberStatus.properties.eliminationConfirmation.readOnly = true;
    }
  } else if (
    Object.keys(formInstance.data).length != 0 &&
    formInstance.data.memberStatus.responsibleStatus === "notIssued"
  ) {
    formCopy.scheme.properties.members.required = [];
    formCopy.scheme.properties.info.required = [];
    //formCopy.scheme.properties.memberStatus.properties.executorStatus.readOnly = true;
    //formCopy.scheme.properties.memberStatus.properties.eliminationConfirmation.readOnly = true;
    delete formInstance.data.memberStatus.executorStatus;
    delete formInstance.data.memberStatus.eliminationConfirmation;
  }

  return response;
}
