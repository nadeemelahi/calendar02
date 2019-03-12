"use strict";


function emptyNode($){
   while($.firstChild) 
      $.removeChild($.firstChild);
}

var Cal = new function(){

   var i,tmp,
      days = ["sun","mon","tue","wed","thu","fri","sat"],

      months = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","sep","nov","dec"],

      today = new Date(),
      //todayBkup = new Date(today.getTime()),
      tmpDate,

      // timestamp = today.getTime();
      // day = today.getDay(); // [0-6] 0 is sun
      // date = today.getDate(); // [1-31] 
      // month = today.getMonth(); // [0-11]
      // year = today.getFullYear(); // yyyy
      // hr = today.getHours(); // [0-23]
      // min = today.getMinutes(); // [0-59]

      theMonth = today.getMonth(),
      $theMonth = document.getElementById("theMonth"),

      theDate = today.getDate(),
      $theDate = document.getElementById("theDate"),

      theYear = today.getFullYear(),
      $theYear = document.getElementById("theYear"),

      $$eachDay = document.querySelectorAll("#eachDayInTheMonth > div"); // 7cols x 6rows = 42 days


   this.setMonth = function(){
      emptyNode($theMonth);
      tmp = days[theMonth].toString();
      tmp = document.createTextNode(tmp);
      $theMonth.appendChild(tmp);
   };
   this.setDate = function(){
      emptyNode($theDate);
      tmp = document.createTextNode(theDate);
      $theDate.appendChild(tmp);
   };
   this.setYear = function(){
      emptyNode($theYear);
      tmp = document.createTextNode(theYear);
      $theYear.appendChild(tmp);
   };

   var firstDayOfMonth, firstDayOffset;
   function setFirstDayOfMonth(){
      firstDayOfMonth = new Date(
	 ((theMonth + 1).toString())
	 + "/01/"
	 + theYear
      );
      firstDayOffset = firstDayOfMonth.getDay();
      console.log("first day of month and offset: " 
	 + firstDayOfMonth + ", " + firstDayOffset);
   }

   var lastDayOfMonth;
   function setLastDayOfMonth(){
      tmpDate = new Date( today.getTime() );
      tmpDate.setMonth( tmpDate.getMonth() + 1, 0); 
      // entering 0 for option param of day from [1-31]
      // allows you to minus a day
      // to get the last day of the prev month
      // and so to get the last day of the current month
      // we first advance to the next month
      lastDayOfMonth = tmpDate.getDate(); //[1-31]
      console.log("lastDayOfMonth: " + lastDayOfMonth);
   }

   var lastDayOfPrevMonth;
   function setLastDayOfPrevMonth(){
      tmpDate = new Date( today.getTime() );
      tmpDate.setMonth( tmpDate.getMonth(), 0);
      lastDayOfPrevMonth = tmpDate.getDate();
      console.log("lastDayOfPrevMonth: " + lastDayOfPrevMonth);
   }

   this.fill42dates = function(){
      setFirstDayOfMonth();
      setLastDayOfMonth();
      setLastDayOfPrevMonth();

      tmp = 0;
      for(i=firstDayOffset-1;i>=0;i--){
	 emptyNode($$eachDay[i]);
	 $$eachDay[i].appendChild(
	    document.createTextNode(lastDayOfPrevMonth - tmp)
	 );
	 tmp++;
	 $$eachDay[i].className += " disabledDayOfMonth";
      }

      for(i=0;i<lastDayOfMonth;i++){
	 tmp = firstDayOffset + i;
	 emptyNode( $$eachDay[tmp] );
	 $$eachDay[tmp].appendChild(
	    document.createTextNode(i+1)
	 );
      }
      $$eachDay[theDate + firstDayOffset - 1].className += " todayDayOfMonth";

      tmp = 0;
      for(i = firstDayOffset + lastDayOfMonth; i<42;i++){
	 emptyNode( $$eachDay[i] );
	 tmp++;
	 $$eachDay[i].appendChild(
	    document.createTextNode(tmp)
	 );
	 $$eachDay[i].className += " disabledDayOfMonth";
      }

   };

}

window.addEventListener("click",clickH,false);
function clickH(e){
   if(!e) var e = window.event;

   if(e.target.id == "retreatPrevMonth"){
      console.log("retreatPrevMonth");

   }else if(e.target.id == "advanceNextMonth"){
      console.log("advanceNextMonth");

   }else if(e.target.id == "retreatPrevYear"){
      console.log("retreatPrevYear");

   }else if(e.target.id == "advanceNextYear"){
      console.log("advanceNextYear");

   }else if(e.target.parentNode.id == "eachDayInTheMonth"){
      console.log(e.target.textContent);

   } else {

   }

} // clickH(e)

window.addEventListener("load",app,false);

function app(){

   console.log("app()");

   Cal.setMonth();
   Cal.setDate();
   Cal.setYear();

   Cal.fill42dates();

} // app() 

