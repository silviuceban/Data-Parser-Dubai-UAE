module.exports = (criterion, dataSet) => {
  const shareholdersWirdoTerm =
    "Shareholders:\n                                ";
  let dataObj;
  let dataArr = [];
  const multipleValues = (row) => {
    for (
      let j = 0;
      j < dataSet.eq(row).children().eq(1).children().length;
      j++
    ) {
      dataArr.push(dataSet.eq(row).children().eq(1).children().eq(j).text());
    }
  };
  for (let i = 0; i < dataSet.length; i++) {
    if (dataSet.eq(i).children().eq(0).children().eq(0).text() === criterion) {
      // console.log(dataSet.eq(i).children().eq(0).children().eq(0).text());
      if (criterion === "Directors:") {
        multipleValues(i);
        dataObj = dataArr;
        return dataObj;
      } else if (criterion === shareholdersWirdoTerm) {
        multipleValues(i);
        dataObj = dataArr;
        return dataObj;
      } else if (criterion === "Business activities:") {
        multipleValues(i);
        dataObj = dataArr;
        return dataObj;
      } else {
        dataObj = dataSet
          .eq(i)
          .children()
          .eq(1)
          .children()
          .eq(0)
          .text()
          .replace(/\s+/g, " ")
          .trim();
        break;
      }
    }
  }

  return dataObj;
};
