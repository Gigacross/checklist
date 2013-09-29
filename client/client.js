appDB = new Meteor.Collection("checklistDB");

var input = $("<li><input></li>");


  Template.maindocument.events({
    'click #createList' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    },
    'keypress input' : function (enterKey) {
      //console.log(enterKey);
    }
  });
  Template.ListMasterRender.events({
    'click h1' : function () {
      var listTitle = prompt("Please enter a title","Untitled Checklist");
        if (listTitle != "") {
          document.getElementsByName('listtitle')[0].innerHTML = listTitle;
        }
        else {
          document.getElementsByName('listtitle')[0].innerHTML = "Untitled Checklist";
        }
     },
    'keydown input' : function (keyTrigger) {
      //console.log(keyTrigger);
      if (keyTrigger.keyIdentifier == "Enter") {
        console.log($(keyTrigger.srcElement.parentNode).index());
        newItemId = newItem();
        //xPos(keyTrigger);

        var input = $('<li id='+newItemId+'><input></li>');
        $(keyTrigger.srcElement.parentNode.parentNode).append(input);
        input.children().focus();
        console.log($(this).index());

        }
      if (keyTrigger.keyCode == 9) {
        console.log("you pressed the tab key");
      }
      if (keyTrigger.shiftKey && keyTrigger.keyCode == 9) {
        console.log("you pressed the shift tab");
      }
    }
  });
  Template.mainmenu.events({
    'click #slideme' : function () {
      $("#slidepane").animate({
        left: '+=600'
      })
    },
    'click #createlist' : function (){
      $('#main').append(Template.slidepane);
      $('#slidepane').append(Template.ListMasterRender);
      createList();
      createListTitle();
      ListMasterRenderEvents();
      $("#slidepane").delegate("#close", "click", function slideLeft() {
          console.log("slideleft()");
          $("#slidepane").animate({
          left: '-=600'
      })
  })
    }
  });
  /*Template.slidepane.events({
    'click #close' : function(){
      console.log("clicked close");
      $("#slidepane").animate({
        left: '-=600'
      })
    }
  });*/
  function ListMasterRenderEvents (){
    document.getElementById("close").onClick = function (e){
      console.log("closeme");
      $("#slidepane").animate({
        left: '-=600'
      })
    }
  }
  function listInit() {
    //initialise an empty title and an empty first input field.

  }

  function createListTitle() {
    var newTitleId = appDB.insert({
      title : "Untitled Checklist"
    });
    document.getElementsByName('listtitle')[0].id = newTitleId;
    document.getElementsByName('listtitle')[0].value = "untitled document";
  }
  function createList(){
    //1st item is created, update database with 1st item
    var idInit = newItem();
    document.getElementById('chkList').innerHTML = '<ul id="listmaster"><li id='+idInit+' ><input></li></ul>';
  }
  function newItem() {
    var idInit = appDB.insert({
      userid : "",
      listmaster : "", //the title of this list item
      position : {
        x : "",
        y : ""
      },
      content : "",
      comments : "",
      shareIds : ""
    })
    return idInit;
  }
  function saveItem() {

  }
  function xPosInit(eventHdlr) { //retrieve the x position
    var x = eventHdlr.srcElement.parentNode.index();
    return x;
  }
  function yPosInit(eventHdlr) { //retrieve the y position
    //check for the previous Y value and copies it, if previous Y value doesn't exists, the default is 0;
  }
function slideLeft() {
    console.log("slideleft()");
    $("#slidepane").animate({
      left: '-=600'
    })
  }
$(function(){
  $('#listmaster').sortable();
  $('#listmasterÍ').disableSelection(); 

})
