export function canSave(props) {
    console.log("canSave", props);
    const { item, user } = props;
    const data = item.data;
    
    const attachmentFields = ["trialResult"];
    
    const isLoadedAttachments = attachmentFields.some(field => {
        const values = data[field];
        return !!values && !!values.includes("uploaded");
    })

    return !isLoadedAttachments;
}