'use strict';

window.addEventListener('DOMContentLoaded', () => {
  //Календарь
  let nowDate = new Date(),
    nowDateNumber = nowDate.getDate(),
    nowMonth = nowDate.getMonth(),
    nowYear = nowDate.getFullYear(),
    containerCalendar = document.querySelector('.month-calendar'),
    monthContainer = containerCalendar.querySelector('.month-name'),
    yearContainer = containerCalendar.querySelector('.year-name'),
    daysContainer = containerCalendar.querySelector('.days'),
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

  //Работа с календарем
  const departDay = document.querySelector('[data-departingDay]');
  departDay.textContent = `${nowDateNumber} ${monthContainer.textContent.slice('' , 3)}`;

  let dateField = document.querySelector('.booking__dates');

  dateField.addEventListener('click', (e) => {
    if (e.target && !e.target.matches('div.booking__dates')) {
      containerCalendar.classList.remove('hide');
      containerCalendar.classList.add('show');
      containerCalendar.classList.add('animated');
    }
  });

  daysContainer.addEventListener('click', (e) => {
    if (e.target && !e.target.matches('ul.days')) {
      console.log(e.target);
      departDay.textContent = `${e.target.textContent} ${monthContainer.textContent.slice('' , 3)}`;
    }
  });

});