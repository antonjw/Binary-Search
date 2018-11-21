/**
 * @author Azan Muhammad
 * Date of Information From JSON File: Decemeber 18th
 */
var restaurantFile = [];
var restaurantInfo = [];
var restaurantNames = [];
var nameSearch = "b";

function preload() {
  restaurantFile = loadJSON("Restaurant.json");
}

function setup() {
  for (var i = 0; i < restaurantFile.results.length; i++) {
    restaurantInfo.push(restaurantFile.results[i].name);
  }
  restaurantInfo.sort();
  binarySearch();
}

function binarySearch() {
  var max = restaurantInfo.length;
  var min = 0;
  var mid;
  var midName;
  var nameUp = true;
  var nameDown = true;
  var multipleName = 1;
  var nameCompare;
  nameSearch = nameSearch.toLowerCase();
  while (min < max) {
    mid = Math.floor((max + min) / 2);
    midName = restaurantInfo[mid].toString().substring(0, nameSearch.length).toLowerCase();
    nameCompare = midName.localeCompare(nameSearch);
    if (nameCompare < 0) {
      min = mid + 1
    } else if (nameCompare === 0) {
      restaurantNames.push(mid)

      try {

        while (nameUp || nameDown) {
          if (nameUp && midName === restaurantInfo[mid + multipleName].toString().substring(0, nameSearch.length).toLowerCase()) {
            restaurantNames.push(mid + multipleName);
          } else {
            nameUp = false;
          }
          if (nameDown && midName === restaurantInfo[mid - multipleName].toString().substring(0, nameSearch.length).toLowerCase()) {
            restaurantNames.push(mid - multipleName);
          } else {
            nameDown = false;
          }
          multipleName++;
        }

      } catch (e) {}

      break;
    } else if (nameCompare > 0) {
      max = mid
    }
  }
  if (nameCompare === 0) {
    for (var s = 0; s <= restaurantNames.length; s++) {
      console.log(restaurantInfo[restaurantNames[s]]);
    }
    return 0;
  } else {
    console.log('Does not exist');
    return 0;
  }
}