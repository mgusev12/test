export function viewUpdate(props) {
  const { user, item, form, isCreation = false } = props;
  const formInstance = item;
  const formCopy = Object.assign(Object.create(Object.getPrototypeOf(form)), form);

  /*if (formCopy.scheme.properties.testViewDisplay.variables.number !== formInstance.data.number) {     
    formCopy.scheme.properties.testViewDisplay.variables.number = Math.max(formInstance.data.number) +1
        }
  //let num = Math.max(formCopy.scheme.properties.testViewDisplay.variables.number)

  console.warn("viewUpdate", formCopy.scheme.properties.testViewDisplay);*/
  console.log(formCopy);
  return formCopy;
}

