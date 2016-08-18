// Your Client ID can be retrieved from your project in the Google
// Developer Console, https://console.developers.google.com
var CLIENT_ID     = '699453295417-cipc15lbqpetclu76sh7jl5fde8ah2he.apps.googleusercontent.com';
var SCOPES        = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

// TESTING setting
var USE_LIVE_DATA = true;

// Global scope functions
if (!window.console) console = {log: function() {}}; // console.log fix

////////////////////////////////////////////////////////////////////////////////////////////////////////////
var app = {};

app.$output = null;

app.init = function() {

  var fakeData = {"result":{"range":"'Raw Aquatic System Data'!A1:AB1003","majorDimension":"ROWS","values":[["Timestamp","Date at which you completed your sampling","Looking at the map above, which one of the Great Lake drainage basin (i.e. watershed) are you sampling in?","What is the name of the stream you are studying?","If you know (or can find out), what are your GPS coordinates of your study site?","Briefly describe the surrounding area around your stream (i.e. does it mostly run through deciduous woods?; is it in an open area?; are there any areas of concern such as point impact or non-point impact pollution?)","Name of smaller immediate drainage basin that your stream is a part of?  If you do not know, please leave blank.","Name of larger drainage basin that your stream is a part of (i.e. what major waterway will your water eventually get to)?","Please list all of the invertebrates that you have sampled as well as the number of each type.                                                                                                                                                                     Example:                                                                                       Hydropsychidae  4                                                                                      Amphipod             26      ","Total Number of Shredders (enter number values only)","Total Number of Filtering Collectors (enter number values only)","Total Number of Gathering Collectors (enter number values only)","Total Number of Scrapers (enter number values only)","Total Number of Predators (enter number values only)","Calculated Stream Discharge (m3/sec)","Estimated percentage of boulder (3'<) that make up your substrate type.","Estimated percentage of Cobble (6” - 3') that make up your substrate type.","Estimated percentage of gravel (1” - 6”) that make up your substrate type.","Estimated percentage of sand (1” >) that make up your substrate type.","Estimated percentage of bedrock that make up your substrate type.","Estimated percentage of sections that are pooled in your stream.","Estimated percentage of sections that are shaded in your stream.","Estimate amount of coniferous tree stream-side coverage ","Estimate amount of deciduous tree stream-side coverage ","Estimate amount of grass and/or shrubs stream-side coverage ","Estimate amount of instream woody debris that are logs ","Estimate amount of instream woody debris that are root wads ","Estimate amount of instream woody debris that are limbs "],[],["8/17/2016 19:12:13","8/17/2016","Lake Michigan","BizStream :) I mean Sand Creek","42.9847093,-85.8895391","deciduous woods","Sand Creek?","Grand River?","This data is not very structured... we may want to make a list of things...","33","55","44","33","22","22","0%, 10%, 20%","40%","60%","70%","10%","10%","","Moderate","Moderate","Moderate","Sparse","Sparse","Sparse"]]},"body":"{\n  \"range\": \"'Raw Aquatic System Data'!A1:AB1003\",\n  \"majorDimension\": \"ROWS\",\n  \"values\": [\n    [\n      \"Timestamp\",\n      \"Date at which you completed your sampling\",\n      \"Looking at the map above, which one of the Great Lake drainage basin (i.e. watershed) are you sampling in?\",\n      \"What is the name of the stream you are studying?\",\n      \"If you know (or can find out), what are your GPS coordinates of your study site?\",\n      \"Briefly describe the surrounding area around your stream (i.e. does it mostly run through deciduous woods?; is it in an open area?; are there any areas of concern such as point impact or non-point impact pollution?)\",\n      \"Name of smaller immediate drainage basin that your stream is a part of?  If you do not know, please leave blank.\",\n      \"Name of larger drainage basin that your stream is a part of (i.e. what major waterway will your water eventually get to)?\",\n      \"Please list all of the invertebrates that you have sampled as well as the number of each type.                                                                                                                                                                     Example:                                                                                       Hydropsychidae  4                                                                                      Amphipod             26      \",\n      \"Total Number of Shredders (enter number values only)\",\n      \"Total Number of Filtering Collectors (enter number values only)\",\n      \"Total Number of Gathering Collectors (enter number values only)\",\n      \"Total Number of Scrapers (enter number values only)\",\n      \"Total Number of Predators (enter number values only)\",\n      \"Calculated Stream Discharge (m3/sec)\",\n      \"Estimated percentage of boulder (3'\\u003c) that make up your substrate type.\",\n      \"Estimated percentage of Cobble (6” - 3') that make up your substrate type.\",\n      \"Estimated percentage of gravel (1” - 6”) that make up your substrate type.\",\n      \"Estimated percentage of sand (1” \\u003e) that make up your substrate type.\",\n      \"Estimated percentage of bedrock that make up your substrate type.\",\n      \"Estimated percentage of sections that are pooled in your stream.\",\n      \"Estimated percentage of sections that are shaded in your stream.\",\n      \"Estimate amount of coniferous tree stream-side coverage \",\n      \"Estimate amount of deciduous tree stream-side coverage \",\n      \"Estimate amount of grass and/or shrubs stream-side coverage \",\n      \"Estimate amount of instream woody debris that are logs \",\n      \"Estimate amount of instream woody debris that are root wads \",\n      \"Estimate amount of instream woody debris that are limbs \"\n    ],\n    [],\n    [\n      \"8/17/2016 19:12:13\",\n      \"8/17/2016\",\n      \"Lake Michigan\",\n      \"BizStream :) I mean Sand Creek\",\n      \"42.9847093,-85.8895391\",\n      \"deciduous woods\",\n      \"Sand Creek?\",\n      \"Grand River?\",\n      \"This data is not very structured... we may want to make a list of things...\",\n      \"33\",\n      \"55\",\n      \"44\",\n      \"33\",\n      \"22\",\n      \"22\",\n      \"0%, 10%, 20%\",\n      \"40%\",\n      \"60%\",\n      \"70%\",\n      \"10%\",\n      \"10%\",\n      \"\",\n      \"Moderate\",\n      \"Moderate\",\n      \"Moderate\",\n      \"Sparse\",\n      \"Sparse\",\n      \"Sparse\"\n    ]\n  ]\n}\n","headers":{"date":"Thu, 18 Aug 2016 00:35:46 GMT","content-encoding":"gzip","server":"ESF","vary":"Origin, X-Origin, Referer","content-type":"application/json; charset=UTF-8","cache-control":"private","content-length":"1105"},"status":200,"statusText":null}


  $(function() {
      app.$output = $("#output");

      USE_LIVE_DATA = (location.protocol != "file:");

      if (USE_LIVE_DATA) 
      {
          $.getScript("https://apis.google.com/js/client.js?onload=googleCheckAuth", function(){
             console.log("Script loaded: https://apis.google.com/js/client.js?onload=googleCheckAuth");
          });
      } 
      else 
      {
          app.loadData(fakeData);
      }

  }); // jquery ready

}
app.useSheetsApi = function() {
    app.ProcessRawData();
}

app.ProcessRawData = function() {
  gapi.client.sheets.spreadsheets.values
  .get({
    spreadsheetId: '1e5KLFI0l8YNMg2Fjqcdc-f-GJVFW1XG9t9gS5kbAsFk',
    range: 'Raw Aquatic System Data!A1:AB',
  })
  .then(
    function(response) {
      app.loadData(response);
    }, 
    function(response) {
      app.$output.append('Error: ' + response.result.error.message);
    }
  );

}

app.loadData = function(response) {
    var range = response.result;

    lsm.saveJson('lastResponse', response);


    if (range.values.length > 0) {
      app.$output.append('<table></table>');

      var $thead = $("<thead></thead>");
      app.$output.find("table").append($thead);
      var $tbody = $("<tbody></tbody>");
      app.$output.find("table").append($tbody);

      for (i = 0; i < range.values.length; i++) {
        var row = range.values[i];

        // if no data, skip
        if (row.length == 0)  
          continue;

        var trString = '<tr>';
        for (var cell = 0; cell < row.length; cell++) {
          trString = trString + '<td>'+ row[cell] + '</td>';
        }
        trString = trString + '</tr>';

        if (i == 0) 
          $thead.append(trString);
        else
          $tbody.append(trString);

     }
    } else {
      app.$output.append('No data found.');
    }

}






////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Google Authentication
var googleApiMgr = {};

 // Load Sheets API client library.
googleApiMgr.loadSheetsApi = function() {
  var discoveryUrl = 'https://sheets.googleapis.com/$discovery/rest?version=v4';
  gapi.client.load(discoveryUrl).then(app.useSheetsApi);
}


// Handle response from authorization server.
// @param {Object} authResult Authorization result.
googleApiMgr.handleAuthResult = function(authResult) {
  var authorizeDiv = document.getElementById('authorize-div');
  if (authResult && !authResult.error) {
    // Hide auth UI, then load client library.
    authorizeDiv.style.display = 'none';
    googleApiMgr.loadSheetsApi();
  } else {
    // Show auth UI, allowing the user to initiate authorization by
    // clicking authorize button.
    authorizeDiv.style.display = 'inline';
  }
}

// Initiate auth flow in response to user clicking authorize button.
googleApiMgr.handleAuthClick = function(event) {
    gapi.auth.authorize(
      {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
      googleApiMgr.handleAuthResult
    );
    return false;
}

// Check if current user has authorized this application.
googleApiMgr.checkAuth = function() {
  gapi.auth.authorize(
  {
    'client_id': CLIENT_ID,
    'scope': SCOPES.join(' '),
    'immediate': true
  }, googleApiMgr.handleAuthResult);
}

$(function() { 
  $("#authorize-button").on('click', googleApiMgr.handleAuthClick);
})


////////////////////////////////////////////////////////////////////////////////////////////////////////////
// localStorageManager
var lsm = {}; 
lsm.saveJson = function(name, jsonObject) {
      console.log(jsonObject)
      var strJson = JSON.stringify(jsonObject);
      console.log('saveJson: ', strJson);

      // Put the object into storage
      localStorage.setItem(name, strJson);
}

lsm.getJson = function(name) {
      // Retrieve the object from storage
      var retrievedObject = localStorage.getItem(name);

      var obj = JSON.parse(retrievedObject);

      console.log('getJson: ', obj);
      return obj;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GLOBAL SCOPE
app.init();

// This function has to be global due to the way google auth works
function googleCheckAuth() {
  googleApiMgr.checkAuth();
}
