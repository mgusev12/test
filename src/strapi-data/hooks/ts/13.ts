export function viewUpdate(props) {
    const { user, item, form, isCreation = false } = props;
    const formInstance = item;
    //console.warn("formInstance", formInstance.data?.selectTab);
    const formCopy = Object.assign(Object.create(Object.getPrototypeOf(form)), form);

    const isOwner = formInstance.owner === user.id;
    const isReviewer = formInstance.reviewers ? formInstance.reviewers.some(rev => rev === user.id) : false;

    const descFields =  [
        "instances",
        "numberOfContract",
        "constractionObject",
        "rdCode",
        "jobCategory",
        "dateTime",
        "duration",
        "typeOfWorkPresented",
        "structuralElement",
        "description",
        "volume",
        "selectVariantsB",
        "measurementUnits",
        "reasonForRejection",
        "comment",
        "selectAny",
        "hierarchicalDirectory"
    ];

    const inspectionFields =  ["customer", "subcontractor", "contractor", "generalContractor", "authorSupervision"];

    const docFields =  ["executiveDocumentations", "workingDocumentations", "forge"];

    const hideFields = (properties, excludeFields) => {
        for (const fieldName in properties) {
            properties[fieldName].hidden = excludeFields.every(field => field !== fieldName);
        }
    };

    const objectFields = ["authorSupervision", "contractor", "customer", "generalContractor", "subcontractor"];

    if (!isOwner && !isReviewer) {
        for (const fieldName in formCopy.scheme.properties) {
            formCopy.scheme.properties[fieldName].readOnly = true;
        }
        objectFields.forEach(objectField => {
            if (formCopy.scheme.properties[objectField] && formCopy.scheme.properties[objectField].properties){
                for (const objField in formCopy.scheme.properties[objectField].properties) {
                    formCopy.scheme.properties[objectField].properties[objField].readOnly = true;
                }
            }
        });
    }

    if (formInstance.data && formInstance.data.selectTab === "description") {
        hideFields(formCopy.scheme.properties, descFields);
    }
    if (formInstance.data && formInstance.data.selectTab === "documentation") {
        hideFields(formCopy.scheme.properties, docFields);
    }
    if (formInstance.data && formInstance.data.selectTab === "inspection") {
        hideFields(formCopy.scheme.properties, inspectionFields);
    }
    if (formInstance.data && formInstance.data.selectTab === "result") {
        hideFields(formCopy.scheme.properties, []);
    }

    if (isCreation) {
        formCopy.scheme.properties.selectTab.hidden = true;
        hideFields(formCopy.scheme.properties, [...descFields, ...inspectionFields.filter(el => el === "subcontractor")]);
    } else {
        formCopy.scheme.properties.selectTab.hidden = false;
        formCopy.scheme.properties.selectTab.default = "description";
    }

    if (formCopy.scheme.properties.reasonForRejection.hidden === false) {
        formCopy.scheme.properties.comment.hidden = !formInstance.data.reasonForRejection;
    }
    //console.warn("formCopy", formCopy.scheme.properties);
    return formCopy;
}

