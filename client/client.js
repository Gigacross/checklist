      var input = $("<li><input></li>");


  Template.maindocument.events({
    'click #createList' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
      createList();
    },
    'keypress input' : function (enterKey) {
      //console.log(enterKey);
    },
    'keydown input' : function (keyTrigger) {
      console.log(keyTrigger);
      if (keyTrigger.keyIdentifier == "Enter") {
        console.log(keyTrigger.srcElement.parentNode);
        console.log(keyTrigger);

        //enterKey.srcElement.parentNode.createElement("li");
        //this.srcElement.parentNode.createElement("li");
        //$(enterKey.srcElement.parentNode).append("<li><input></li>");
        var input = $("<li><input></li>");
        //$('<li><input></li>').appendTo($(enterKey.srcElement.parentNode.nextSibling.)).focus();
        $(keyTrigger.srcElement.parentNode.parentNode).append(input);
        input.children().focus();

        }
      if (keyTrigger.keyCode == 9) {
        console.log("you pressed the tab key");
      }
      if (keyTrigger.shiftKey && keyTrigger.keyCode == 9) {
        console.log("you pressed the shift tab");
      }
    }
  });

  function createList(){
    document.getElementById('chkList').innerHTML = '<ul id="listmaster"><li><input></li> </ul>';
  }
  function newItem() {
    this.createTextNode("li");
  }
        $(function(){
  $('#listmaster').sortable();
  $('#listmasterÍ').disableSelection();
 })
