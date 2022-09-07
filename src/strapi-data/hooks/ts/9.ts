export function onSave(props) {
    const { item, user } = props;
    //formInstance = Object.assign(Object.create(Object.getPrototypeOf(item)), item);
    const formInstance = { ...item };
    const { data } = formInstance;
    const fields = ["members.applicant", "members.executor"];
    const trialStatus_draft = "draft";
    const trialStatus_review = "review";
    const trialStatus_confirmed = "confirmed";
    const trialStatus_rejected = "rejected";
    const trialStatus_closed = "closed";
    const memberStatus = [];
    let reviewers = new Set();


    delete formInstance.data.selectTab;
  
    formInstance.data.applicantCheck = ""
    formInstance.data.executorCheck = ""
  
    if (formInstance.data.members && formInstance.data.members.applicant && formInstance.data.members.applicant.length != 0){
      formInstance.data.applicantCheck = formInstance.data.members.applicant[0]
    }
  
    if (formInstance.data.members && formInstance.data.members.executor && formInstance.data.members.executor.length != 0){
      formInstance.data.executorCheck = formInstance.data.members.executor[0]
    }
  

    fields.forEach((field) => {
        const val = field.split(".").reduce((p, c) => p && p[c], data);
        if (val) {
            val.forEach((userId) => reviewers.add(userId));
        }
    });
    formInstance.reviewers = Array.from(reviewers);

    if (formInstance.data.checkStatus && formInstance.data.checkStatus.applicantStatus === "notReady") {
        formInstance.data.issueStatus = ["draft"];
    }

    if (formInstance.data.checkStatus && formInstance.data.checkStatus.applicantStatus === "ready") {
        if (! (formInstance.data.issueStatus) || formInstance.data.issueStatus[0] === "rejected" || formInstance.data.issueStatus[0] === "draft") {
            delete formInstance.data.checkStatus.executorStatus;
            delete formInstance.data.checkStatus.trialReason;
        }
        formInstance.data.issueStatus = ["review"];
    }

    if (formInstance.data.checkStatus.applicantStatus === "ready" && formInstance.data.checkStatus && formInstance.data.checkStatus.executorStatus && formInstance.data.checkStatus.executorStatus === "accept" || formInstance.data.checkStatus.trialReason && formInstance.data.checkStatus.executorStatus === "accept") {
        formInstance.data.issueStatus = ["confirmed"];
        formInstance.data.checkStatus.applicantStatus = "ready";
        delete formInstance.data.checkStatus.trialReason;
    }
  
    if (formInstance.data.checkStatus.applicantStatus === "ready" && formInstance.data.checkStatus && formInstance.data.checkStatus.executorStatus && formInstance.data.checkStatus.executorStatus === "notAccept") {
        formInstance.data.issueStatus = ["rejected"];
        formInstance.data.checkStatus.applicantStatus = "notReady"
    }

    if (formInstance.data.checkStatus.applicantStatus === "ready" && formInstance.data.checkStatus && formInstance.data.checkStatus.executorStatus && formInstance.data.checkStatus.executorStatus === "accept" && formInstance.data.checkStatus.exitCheck && formInstance.data.checkStatus.exitCheck == 1) {
        formInstance.data.issueStatus = ["closed"];
    }

    console.log(formInstance);
    return formInstance;
}

