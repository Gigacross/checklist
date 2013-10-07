appDB = new Meteor.Collection("checklistDB");
Meteor.subscribe("listRepository");
Meteor.subscribe("userItems");

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
        listMasterId = $('h1').attr('id');
        newItemId = newItem(listMasterId);
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
      $('#slidepane').remove();
      $('#main').append(Meteor.render(Template.slidepane));
      $('#slidepane').append(Meteor.render(Template.ListMasterRender));
      var listMasterId = createListTitle();
      createList(listMasterId);
      

      /*$("#slidepane").delegate("#close", "click", function slideLeft() {
          console.log("slideleft()");
          $("#slidepane").animate({
            left: '-=600'
        })
      })*/
    },
    'click #repository' : function () {
      $('#slidepane').remove();
      $('#main').append(Meteor.render(Template.slidepane));
      $('#slidepane').append(Meteor.render(Template.listrepo));
      console.log("repo pressed");
    }
  });
  Template.slidepane.events({
    'click #close' : function(){
      console.log("clicked close");
      $("#slidepane").animate({
        left: '-=600'
      })
    }
  });
  function listInit() {
    //initialise an empty title and an empty first input field.


  }
  Template.renderExistingList.title = function () {
    var titlePtr = appDB.findOne({_id : Session.get("currMasterListId")}, {fields : { title:1 }});
    return titlePtr.title;
  }
  Template.renderExistingList.listItems = function () {
    //determine selected list
    return appDB.find({content:{$exists:true},listmaster:Session.get("currMasterListId")}).fetch();
  }
  Template.listrepo.listsCollection = function (){
    //return "collection lists repo";
    return appDB.find( {title : {$exists : true }}, {fields : {title:1}}).fetch();
    //return Meteor.Collection("checklistDB").find({},{title:1})
  }
  Template.listrepo.events({
    'click' : function () {
      console.log($(this));
      Session.set("currMasterListId" ,$(this).attr('_id'));  
      if ($(this).attr('_id') != "" ) {
        //generate list with listmaster list
        $('#slidepane').remove();
        $('#main').append(Meteor.render(Template.slidepane));
        $('#slidepane').append(Meteor.render(Template.renderExistingList()));
      }
    }
  })
  function getCurrentMasterId () {

  }
  function createListTitle() {
    var newTitleId = appDB.insert({
      title : "Untitled Checklist"
    });
    document.getElementsByName('listtitle')[0].id = newTitleId;
    document.getElementsByName('listtitle')[0].value = "untitled document";
    return newTitleId;
  }
  function createList(listMasterId){
    //1st item is created, update database with 1st item
    var itemId = newItem(listMasterId);
    document.getElementById('chkList').innerHTML = '<ul id="listmaster"><li id='+itemId+' ><input></li></ul>';
  }
  function newItem(listMasterId) {
    var itemId = appDB.insert({
      userid : Meteor.userId(),
      listmaster : listMasterId, //the title of this list item
      position : {
        x : "",
        y : ""
      },
      content : "",
      comments : "",
      shareIds : ""
    })
    return itemId;
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
  function selectedList(listMasterId) {
    return appDB.find({content:{$exists:true},listMaster:listMasterId})
  }
  function selectList(listMasterId) {
    appDB.find({_id:listMasterId}).fetch();
    appDB.find({listMaster : listMasterId});
  }
$(function(){
  $('#listmaster').sortable();
  $('#listmasterÍ').disableSelection();
})