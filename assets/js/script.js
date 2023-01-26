// Wrap code to make sure DOM is loaded before js is run
$(function () {
  let currentHour;
  const todayObj = dayjs();
  const timeBlocks = $('.time-block');
  const currentDayEl = $('#currentDay');
  const status = $('#status');

  // Add correct class according to the time
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

  function updateCurrentHour() {
    currentHour = dayjs().hour();

    //Update block colour as the clock runs
    updateBlockColour();
  }

  //Show Current Time in the header
  function updateCurrentDay() {
    currentDayEl.text(todayObj.format('dddd - MMM  D, YYYY'));
  }

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

    //Create new events
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

  //listener on btns
  timeBlocks.on('click', '.saveBtn', function () {
    //Parent ID
    let btnParentId = $(this).parent().attr('id');
    //Event Description
    let eventDesc = $(this).prev().val();
    addNewEvents(btnParentId, eventDesc);
  });

  function init() {
    //Check time every sec to update time block colours
    setInterval(updateCurrentHour, 1000);

    displayEvents();
    updateCurrentDay();
  }
  init();
});
