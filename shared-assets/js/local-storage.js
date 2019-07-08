  // Specific save data
  let saveData = {
    modes: {}
  }

// Local storage functions
function testLocalStorage() {
    const doesItWork = 'test';
    try {
      localStorage.setItem(doesItWork, '1');
      localStorage.removeItem(doesItWork);
      return true;
    }
    catch (error) {
      return false;
    }
  }
  
  const supportsLocalStorage = testLocalStorage();

  if(supportsLocalStorage) {
    if (localStorage.getItem("soManyNumbersSaveData")) {
      const parsedData = JSON.parse(localStorage.getItem("soManyNumbersSaveData"));
      for (let i = 0; i < Object.keys(parsedData).length; i += 1) {
        if (saveData.hasOwnProperty(Object.getOwnPropertyNames(parsedData)[i])) {
          saveData[Object.keys(saveData)[Object.keys(saveData).indexOf(Object.getOwnPropertyNames(parsedData)[i])]]
          = parsedData[Object.keys(parsedData)[i]];
        }
      }
    }
  }
  
  function save() {
    if (supportsLocalStorage) {
      localStorage.setItem('soManyNumbersSaveData', JSON.stringify(saveData));
    }
  }
  