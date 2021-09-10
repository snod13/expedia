'use strict';

window.addEventListener('DOMContentLoaded', () => {
  //Календарь
  const departDay = document.querySelector('[data-departingDay]'),
        returnDay = document.querySelector('[data-returningDay');

  function createCalendar(container, days) {
    let nowDate = new Date(),
      nowDateNumber = nowDate.getDate(),
      nowMonth = nowDate.getMonth(),
      nowYear = nowDate.getFullYear(),
      containerCalendar = document.querySelector(container),
      monthContainer = containerCalendar.querySelector('.month-name'),
      yearContainer = containerCalendar.querySelector('.year-name'),
      daysContainer = containerCalendar.querySelector(days),
      prev = containerCalendar.querySelector('.prev'),
      next = containerCalendar.querySelector('.next'),
      monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let curDate = nowDate.setMonth(nowDate.getMonth() - 1);

    function setMonthCalendar(year, month) {
      let monthDays = new Date(year, month + 1, 0).getDate(),
        monthPrefix = new Date(year, month, 0).getDay(),
        monthDaysText = '';

      monthContainer.textContent = monthName[month];
      yearContainer.textContent = year;
      daysContainer.innerHTML = '';

      if (monthPrefix > 0) {
        for (let i = 1; i <= monthPrefix; i++) {
          monthDaysText += '<li></li>';
        }
      }

      for (let i = 1; i <= monthDays; i++) {
        monthDaysText += '<li>' + i + '</li>';
      }

      daysContainer.innerHTML = monthDaysText;

      if (month == nowMonth && year == nowYear) {
        let days = daysContainer.getElementsByTagName('li');
        days[monthPrefix + nowDateNumber - 1].classList.add('date-now');
      }
    }

    setMonthCalendar(nowYear, nowMonth);

    prev.onclick = function () {
      let curDate = new Date(yearContainer.textContent, monthName.indexOf(monthContainer.textContent));

      curDate.setMonth(curDate.getMonth() - 1);

      let curYear = curDate.getFullYear(),
        curMonth = curDate.getMonth();

      setMonthCalendar(curYear, curMonth);
    };

    next.onclick = function () {
      let curDate = new Date(yearContainer.textContent, monthName.indexOf(monthContainer.textContent));

      curDate.setMonth(curDate.getMonth() + 1);

      let curYear = curDate.getFullYear(),
        curMonth = curDate.getMonth();

      setMonthCalendar(curYear, curMonth);
    };

    let today = new Date(curDate),
        retDate = new Date(today.setDate(today.getDate() + 14));

    departDay.textContent = `${nowDateNumber} ${monthContainer.textContent.slice('' , 3)}`;
    returnDay.textContent = `${retDate.getDate()} ${monthContainer.textContent.slice('' , 3)}`;
  }

  //Работа с календарем
  const nameElemDepart = '[data-calendar="departing"]',
        nameElemReturn = '[data-calendar="returning"',
        nameDaysDepart = '[data-days="departing"]',
        nameDaysReturn = '[data-days="returning"]',
        calendarDepart = document.querySelector(nameElemDepart),
        calendarReturn = document.querySelector(nameElemReturn),
        daysContainerDepart = document.querySelector(nameDaysDepart),
        daysContainerReturn = document.querySelector(nameDaysReturn),
        fieldDepart = document.querySelector('.booking__departing'),
        fieldReturn = document.querySelector('.booking__returning'),
        monthContainerDepart = document.querySelector('[data-month="depart"]'),
        monthContainerReturn = document.querySelector('[data-month="return"]');

  createCalendar(nameElemDepart, nameDaysDepart);
  createCalendar(nameElemReturn, nameDaysReturn);

  fieldDepart.addEventListener('click', (e) => {
    if (e.target) {
      changeVisibleCalendar(calendarReturn, calendarDepart);
    }
  });

  fieldReturn.addEventListener('click', (e) => {
    if (e.target) {
      changeVisibleCalendar(calendarDepart, calendarReturn);
    }
  });

  function changeVisibleCalendar(calendarHide, calendarShow) {
    calendarHide.classList.remove('animated');
    calendarShow.classList.add('animated');
    calendarHide.classList.remove('show');
    calendarHide.classList.add('hide');
    calendarShow.classList.remove('hide');
    calendarShow.classList.add('show');
  }

  daysContainerDepart.addEventListener('click', (e) => {
    if (e.target && !e.target.matches('ul.days')) {
      departDay.textContent = `${e.target.textContent} ${monthContainerDepart.textContent.slice('' , 3)}`;

      let curDay = daysContainerDepart.querySelector('.date-now');
      if(curDay) {
        curDay.classList.remove('date-now');
      }
      e.target.classList.add('date-now'); 
    }
  });

  daysContainerReturn.addEventListener('click', (e) => {
    if (e.target && !e.target.matches('ul.days')) {
      returnDay.textContent = `${e.target.textContent} ${monthContainerReturn.textContent.slice('' , 3)}`;

      let curDay = daysContainerReturn.querySelector('.date-now');
      if(curDay) {
        curDay.classList.remove('date-now');
      }
      e.target.classList.add('date-now');
    }
  });

  window.addEventListener('beforeunload', (e) => {
    e.preventDefault();
    e.returnValue = '';
    window.localStorage.clear();
  });
});