// Wrap code to make sure DOM is loaded before js is run
$(function () {
  let currentHour;
  const todayObj = dayjs();
  const timeBlocks = $('.time-block');
  const status = $('#status');

  function updateCurrentHour() {
    currentHour = dayjs().hour();

    //Update block colour as the clock runs
    updateBlockColour();
  }

  // console.log(currentHour);

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  timeBlocks.on('click', '.saveBtn', function () {
    //Parent ID
    let btnParentId = $(this).parent().attr('id');
    console.log(btnParentId);
    //Event Description
    let eventDesc = $(this).prev().val();
    addNewEvents(btnParentId, eventDesc);
  });

  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  function updateBlockColour() {
    timeBlocks.each(function () {
      //grab id from the each block, remove hour- and convert to a number
      let hourId = parseInt($(this).attr('id').replace('hour-', ''));

      //Reset all time block classes
      $(this).removeClass('past present future');

      if (hourId < currentHour) {
        $(this).addClass('past');
        return;
      }
      if (hourId === currentHour) {
        $(this).addClass('present');
        return;
      }
      //Else do this
      $(this).addClass('future');
    });
  }

  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  // TODO: Add code to display the current date in the header of the page.
  $('#currentDay').text(todayObj.format('dddd - MMM  D, YYYY'));

  ///////// add maybe
  //  if the time is passed disable the storage btn and text input

  //Confirmation of saved message
  function eventSaved() {
    const saved = `<h3 class="h6 bg-secondary text-white px-3 py-2 d-inline-block">
    Appointment added to local storage.
    </h3>`;
    status.html(saved);
  }

  function displayEvents() {
    let events = JSON.parse(localStorage.getItem('eventsList')) || [];

    events.forEach((e) => {
      $(`#${e.id}`).find('.description').text(e.event);
    });
  }

  function addNewEvents(id, event) {
    //if there is something in the eventsList add that else add empty arrays
    let storedEvents = JSON.parse(localStorage.getItem('eventsList')) || [];

    let newEvent = {
      id,
      event,
    };
    //add new events to storedEvents array
    storedEvents.push(newEvent);
    //Update localStorage eventsList to storedEvents
    localStorage.setItem('eventsList', JSON.stringify(storedEvents));
    eventSaved();
    displayEvents();
  }

  function init() {
    setInterval(updateCurrentHour, 1000);
    displayEvents();
  }
  init();
});
