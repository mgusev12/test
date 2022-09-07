export function onChange(props) {
    const { item, user } = props;
    const response = Object.assign(Object.create(Object.getPrototypeOf(item)), item);
    const { inspectionRequest, formInstance } = response;
    let date = ""
    let time = ""
  
  
  if (Object.keys(response.data).length != 0){
  if (response.data.responsible && response.data.responsible.user && response.data.responsible.user.length != 0 && response.data.info.dateTime != 0 && response.data.info.mtp && response.data.info.mtp != "" && response.data.info.count && response.data.info.organization && response.data.info.organization != "" && response.data.info.supDocs && response.data.info.supDocs.length != 0 && response.data.info.area && response.data.info.area.length != 0 && response.data.engineer && response.data.engineer.user && response.data.engineer.user.length != 0){
          
      }
      else {
          delete response.data.responsible.selectOne
          response.data.responsible.selectOne = "notReady"
      }
  
  if(response.data.engineer && !response.data.engineer.user){
    delete response.data.engineer.selectOne
  }
  
  if (response.data.info.count < 0){
    response.data.info.count = 0
  }  
    
  if (response.data.info.mtp){
    response.data.info.units = [response.data.info.mtp[0].units_id]
  }
  else{
    delete response.data.info.units  
  }
    
    
  if(response.data.supervision && !response.data.supervision.user){
    delete response.data.supervision.selectOne
  }
    
  if(response.data.subcontractor && !response.data.subcontractor.user){
    delete response.data.subcontractor.selectOne
  }
    
  if (response.data.inControlStatus && response.data.result && (response.data.inControlStatus === "accepted" && response.data.crCheck === "1" && response.data.result.selectOne || response.data.crCheck === "2" && (response.data.result.selectOne) && response.data.result.selectOne === "rejected" || response.data.crCheck === "3" && (response.data.result.selectOne) && response.data.result.selectOne === "accept")){
       date = new Date().toLocaleDateString("ru-Ru",{day: 'numeric', month: 'long', year: 'numeric'})
       time = new Date().toLocaleTimeString("ru-Ru",{hour:"numeric",minute: 'numeric'})
       response.data.nowTime = "Дата проведения " + date + " в " + time
      }

   if (!response.data.checklistView && response.data.checklistObject) {
//debugger;
        delete response.data.checklistObject;
    }

  }
  return response;
}