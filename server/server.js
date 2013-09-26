
if (Meteor.isServer) {
  Meteor.startup(function () {
  	appDB = new Meteor.Collection("checklistDB");

    // code to run on server at startup
  });
}
