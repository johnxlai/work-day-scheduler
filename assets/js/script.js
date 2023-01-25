// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  const todayObj = dayjs();
  const currentTime = todayObj.format('H');
  console.log(currentTime);

  console.log(todayObj);
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  const timeBlocks = $('.time-block');

  timeBlocks.on('click', '.saveBtn', function () {
    //Parent ID
    let btnParentId = $(this).parent().attr('id');
    //Event Description
    let eventDesc = $(this).prev().val();
    console.log(eventDesc);
  });
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  $.each(timeBlocks, function (key, value) {
    if ($(this).attr('id') === `hour-${currentTime}`) {
      console.log(`this is the tiime`);
      $(this).addClass('present');
    }
  });
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
  $('#currentDay').text(todayObj.format('dddd - MMM  D, YYYY'));

  ///////// add maybe
  //  if the time is passed disable the storage btn and text input
});
