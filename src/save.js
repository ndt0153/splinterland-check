import { User } from "./model";

const saveData = {
  uploadUser: function (users) {
    User.insertMany(users, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log("Da upload" + docs.length + "user");
      }
    });
  },
};

export default saveData;
