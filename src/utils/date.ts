export const dateFormatDB = (type: string = "day", data: number = 0) => {
  /// input day of date ///
  let date = new Date(data);
  if (type == "minute") {
    date.setDate(date.getUTCMinutes() + data);
  } else if (type == "hour") {
    date.setDate(date.getUTCHours() + data);
  } else if (type == "day") {
    date.setDate(date.getUTCDate() + data);
  } else if (type == "month") {
    date.setDate(date.getUTCMonth() + data);
  }

  const dateString =
    date.getUTCFullYear() +
    "-" +
    ("0" + (date.getUTCMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getUTCDate()).slice(-2) +
    " " +
    ("0" + date.getUTCHours()).slice(-2) +
    ":" +
    ("0" + date.getUTCMinutes()).slice(-2) +
    ":" +
    ("0" + date.getUTCSeconds()).slice(-2);
  return dateString;
};

export const getDateNow = () => {
  const dateNow: any = new Date();
  const dateReturn: any = [];
  dateReturn["day"] = dateNow.getDate();
  dateReturn["month"] = ("0" + (dateNow.getMonth() + 1)).slice(-2);
  dateReturn["year"] = dateNow.getFullYear();
  return dateReturn;
};

export const getDateThai = (dateInput: any = new Date()) => {
  let date = new Date(dateInput);
  date.setTime(date.getTime() + 7 * 60 * 60 * 1000);
  date.toLocaleString("en-EN", { timeZone: "Asia/Bangkok" });
  return date;
};
