if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to checklist3.";
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}
	