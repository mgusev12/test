export function canChange(props) {
        const { base, item, user, changes } = props;
        console.log("canChange");   
        console.log(props);      

        if (formInstance.data.memberStatus.responsibleStatus === "issued" && formInstance.data.memberStatus.executorStatus === "issued" && formInstance.data.memberStatus.eliminationConfirmation === "issued" && formInstance.data.memberStatus.close == 1) {
            return false; 
        } else {
            return true;
        }
}