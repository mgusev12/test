export function canChange(props) {
   const { item, user, changes } = props;  
   console.log(props);   
   const user_ID = user.id;
   let flag_p = false;
   if (item.data.members) {
     if (user_ID.includes(item.data.members.applicant) || user_ID.includes(item.data.members.executor)) {
           flag_p = true;
        }
     }
   
   return flag_p;
}