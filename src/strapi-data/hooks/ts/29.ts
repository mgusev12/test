export function canDelete(props) {
   const { item, user } = props;
   let flag_p = false;
   const user_ID = user.id;
   console.log(item);
   if (item.data.responsible.user) {
         if (user_ID.includes(item.data.responsible.user)) {
            flag_p = true;
         }
    }
  
   return flag_p;
}