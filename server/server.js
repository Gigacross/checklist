
if (Meteor.isServer) {
  Meteor.startup(function () {
  	appDB = new Meteor.Collection("checklistDB");

    // code to run on server at startup
    Meteor.publish("listRepository", function (){
/*    	return appDB.find({}, {
    		fields : 
    			{
    				title:1,
    				_id:0
    			}
    		}
    	);*/
    	return appDB.find( {title : {$exists : true }}, {fields : {title:1}})
    })
    Meteor.publish("userItems", function (){
    	return appDB.find( {content : {$exists : true}, userid: Meteor.userId } )
    })


  });
}
