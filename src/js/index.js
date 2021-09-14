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

      if (containerCalendar.getAttribute('data-calendar') == 'departing') {
        if (window.localStorage.getItem('departingMonth')) {
          if(monthContainer.textContent == window.localStorage.getItem('departingMonth')){
            let days = daysContainer.getElementsByTagName('li');
            days[monthPrefix + Number(window.localStorage.getItem('departingDay')) - 1].classList.add('date-now');
          }
        } else {
          if (month == nowMonth && year == nowYear) {
            let days = daysContainer.getElementsByTagName('li');
            days[monthPrefix + nowDateNumber - 1].classList.add('date-now');
          }
        }
      }
      if (containerCalendar.getAttribute('data-calendar') == 'returning') {
        if (window.localStorage.getItem('returningMonth')) {
          if(monthContainer.textContent == window.localStorage.getItem('returningMonth')){
            let days = daysContainer.getElementsByTagName('li');
            days[monthPrefix + Number(window.localStorage.getItem('returningDay')) - 1].classList.add('date-now');
          }
        } else {
          if (month == nowMonth && year == nowYear) {
            let days = daysContainer.getElementsByTagName('li');
            days[monthPrefix + nowDateNumber + 14 - 1].classList.add('date-now');
          }
        }
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
        nameElemReturn = '[data-calendar="returning"]',
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
    changeVisibleCalendar(e.target, calendarReturn, calendarDepart);
  });

  fieldReturn.addEventListener('click', (e) => {
    changeVisibleCalendar(e.target, calendarDepart, calendarReturn);
  });

  daysContainerDepart.addEventListener('click', (e) => {
    rewriteDate(departDay, e.target, monthContainerDepart, daysContainerDepart);
  });

  daysContainerReturn.addEventListener('click', (e) => {
    rewriteDate(returnDay, e.target, monthContainerReturn, daysContainerReturn);
  });

  function changeVisibleCalendar(target, calendarHide, calendarShow) {
    if (target) {
      calendarHide.classList.remove('animated');
      calendarShow.classList.add('animated');
      calendarHide.classList.remove('show');
      calendarHide.classList.add('hide');
      calendarShow.classList.remove('hide');
      calendarShow.classList.add('show');
    }
  }

  function rewriteDate(dateField, eTarget, monthContainer, daysContainer) {
    if (eTarget && !eTarget.matches('ul.days')) {

      dateField.textContent = `${eTarget.textContent} ${monthContainer.textContent.slice('' , 3)}`;

      let curDay = daysContainer.querySelector('.date-now');
      if(curDay) {
        curDay.classList.remove('date-now');
      }
      eTarget.classList.add('date-now');

      if (dateField.matches('span[data-departingDay]')) {
        window.localStorage.setItem('departingDay', eTarget.textContent);
        window.localStorage.setItem('departingMonth', monthContainer.textContent);
      }
      if (dateField.matches('span[data-returningDay]')) {
        window.localStorage.setItem('returningDay', eTarget.textContent);
        window.localStorage.setItem('returningMonth', monthContainer.textContent);
      }
    }
  }

  //Закрытие окна
  window.addEventListener('beforeunload', (e) => {
    e.preventDefault();
    e.returnValue = '';
    window.localStorage.clear();
  });

  //Таб панель
  const tab = document.querySelector('.booking__tabs');

  tab.addEventListener('click', (e) => {
    if(e.target && e.target.matches('li.booking__item')) {
      let prevTab = tab.querySelector('.tab_active');
      prevTab.classList.remove('tab_active');
      e.target.classList.add('tab_active');
    }
  });
});