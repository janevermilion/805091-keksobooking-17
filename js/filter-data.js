'use strict';
(function () {
  var valuesOfFilter = [];
  var checkValues = function (array, newFilterData) {
    array.forEach(function (element, i) {
      if (element.typeOfFilter === newFilterData.name) {
        array.splice(i, 1);
      }
    });
    return array;
  };
  var createArrayOfFiltersResults = function (newFiltersValue) {
    var newObject = {};
    if (newFiltersValue.value === 'any') {
      checkValues(valuesOfFilter, newFiltersValue);
    } else {
      newObject.typeOfFilter = newFiltersValue.name;
      if (newFiltersValue.type !== 'checkbox') {
        checkValues(valuesOfFilter, newFiltersValue);
        newObject.value = newFiltersValue.value;
        valuesOfFilter.push(newObject);
      } else {
        newObject.value = [];
        var checkedCheckboxes = document.querySelectorAll('.map__checkbox:checked');
        checkedCheckboxes.forEach(function (element) {
          newObject.value.push(element.value);
        });
        checkValues(valuesOfFilter, newFiltersValue);
        valuesOfFilter.push(newObject);
      }
    }
    return valuesOfFilter;
  };
  var checkboxChecking = function (data, arrayOfCheckedCheckboxes) {
    var checkedFilters = arrayOfCheckedCheckboxes.find(function (element) {
      return element.typeOfFilter === 'features';
    });
    if (checkedFilters === undefined) {
      return data;
    } else {
      var checkedFiltersValues = checkedFilters.value;
      checkedFiltersValues.forEach(function (currentCheckedFilter) {
        data = data.filter(function (element) {
          var isFeatureInElement = false;
          var elementFeatures = element.offer.features;
          isFeatureInElement = elementFeatures.some(function (feature) {
            return feature === currentCheckedFilter;
          });
          return isFeatureInElement === true;
        });
      });
      return data;
    }
  };
  var filterByFeatures = 'features';
  var filterByType = 'housing-type';
  var filterByRooms = 'housing-rooms';
  var filterByGuests = 'housing-guests';
  var filterByPrice = 'housing-price';
  var lowPrice = {
    'value': 'low',
    'price': 10000
  };
  var highPrice = {
    'value': 'high',
    'price': 50000
  };
  var middlePrice = {
    'value': 'middle',
    'min': lowPrice.price,
    'max': highPrice.price
  };
  var filterPins = function (arrayOfPins, arrayOfFilters) {
    var numberOfFilters = arrayOfFilters.length;
    if (arrayOfFilters === undefined || numberOfFilters === 0) {
      return arrayOfPins;
    }
    var filteredPins = [];
    arrayOfPins.forEach(function (element) {
      var filterCounter = 0;
      arrayOfFilters.forEach(function (filter) {
        if (filter.typeOfFilter === filterByFeatures) {
          filterCounter += 1;
        }
        if (filter.typeOfFilter === filterByType && element.offer.type === filter.value) {
          filterCounter += 1;
        }
        if (filter.typeOfFilter === filterByRooms && element.offer.rooms === Number(filter.value)) {
          filterCounter += 1;
        }
        if (filter.typeOfFilter === filterByGuests && element.offer.guests === Number(filter.value)) {
          filterCounter += 1;
        }
        if (filter.typeOfFilter === filterByPrice) {
          if (filter.value === middlePrice.value && element.offer.price > middlePrice.min && element.offer.price < middlePrice.max) {
            filterCounter += 1;
          }
          if (filter.value === lowPrice.value && element.offer.price < lowPrice.price) {
            filterCounter += 1;
          }
          if (filter.value === highPrice.value && element.offer.price > highPrice.price) {
            filterCounter += 1;
          }
        }
      });
      if (filterCounter === numberOfFilters) {
        filteredPins.push(element);
      }
    });
    filteredPins = checkboxChecking(filteredPins, arrayOfFilters);
    return filteredPins;
  };
  window.filterData = function (currentFilter) {
    window.pinsActions.clear();
    var arrayOfFiltersResults = createArrayOfFiltersResults(currentFilter);
    var filterResult = filterPins(window.pinsData, arrayOfFiltersResults);
    return filterResult;
  };
})();
