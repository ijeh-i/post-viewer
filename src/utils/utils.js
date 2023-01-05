import moment from 'moment';

export const calcViewMode = () => {
    let viewWidth = window.innerWidth;
    if (600 > viewWidth) {
      return "mobile";
    } else if (900 > viewWidth) {
      return "tablet";
    } else {
      return "desktop";
    }
  };

  export const timeElapsed = (thenProps, nowProps, endText) => {
    let then = thenProps
      ? moment(thenProps, "DD/MM/YYYY HH:mm:ss")
      : moment().utc();
    let now = nowProps ? moment(nowProps, "DD/MM/YYYY HH:mm:ss") : moment().utc();
    let thenString = then.format("DD/MM/YYYY HH:mm:ss");
    let nowString = now.format("DD/MM/YYYY HH:mm:ss");
  
    now = moment(nowString, "DD/MM/YYYY HH:mm:ss");
    then = moment(thenString, "DD/MM/YYYY HH:mm:ss");
  
    thenString = then.format("DD/MM/YYYY HH:mm:ss");
    nowString = now.format("DD/MM/YYYY HH:mm:ss");
  
    const elapsedTime = moment(now - then).utc();
    const months = elapsedTime.format("M") - 1;
    const days = elapsedTime.format("D") - 1;
    const hours = elapsedTime.format("HH");
    const minutes = elapsedTime.format("mm");
    const seconds = elapsedTime.format("ss");
  
    const statement = (value, type) => {
      return `${Number(value)} ${type}${value > 1 ? "s" : " "} ${endText ? endText : "ago"
        }`;
    };
  
    if (then > now) {
      return statement(0, "second");
    }
  
    if (months > 0) {
      return statement(months, "month");
    }
  
    if (days > 0) {
      return statement(days, "day");
    }
  
    if (hours > 0) {
      return statement(hours, "hour");
    }
  
    if (minutes > 0) {
      return statement(minutes, "min");
    }
  
    if (seconds > 0) {
      return statement(seconds, "second");
    }
  };
  
  export const formatCurrency = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  export const formatDate = (date) =>
    moment(date, "YYYY-MM-DD").format("DD MMM YYYY");
  
  export const truncateText = (text, limit, limitExtension) => {
    let extension = limitExtension ? limitExtension : "...";
    let extensionPlus = limitExtension ? limitExtension.length : 3;
    let extensionLimit = limit ? limit : 17;
  
    if (text) {
      let value =
        text.length > extensionLimit
          ? `${text.slice(0, extensionLimit + extensionPlus)}${extension}`
          : text;
      return value;
    } else {
      return text;
    }
  };