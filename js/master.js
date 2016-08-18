    if (!window.console) console = {log: function() {}}; // console.log fix

    var fakeData = {"result":{"range":"'Raw Aquatic System Data'!A1:F1003","majorDimension":"ROWS","values":[["Timestamp","Date at which you completed your sampling","Looking at the map above, which one of the Great Lake drainage basin (i.e. watershed) are you sampling in?","What is the name of the stream you are studying?","If you know (or can find out), what are your GPS coordinates of your study site?","Briefly describe the surrounding area around your stream (i.e. does it mostly run through deciduous woods?; is it in an open area?; are there any areas of concern such as point impact or non-point impact pollution?)"],[],["8/17/2016 19:12:13","8/17/2016","Lake Michigan","BizStream :) I mean Sand Creek","42.9847093,-85.8895391","deciduous woods"]]},"body":"{\n  \"range\": \"'Raw Aquatic System Data'!A1:F1003\",\n  \"majorDimension\": \"ROWS\",\n  \"values\": [\n    [\n      \"Timestamp\",\n      \"Date at which you completed your sampling\",\n      \"Looking at the map above, which one of the Great Lake drainage basin (i.e. watershed) are you sampling in?\",\n      \"What is the name of the stream you are studying?\",\n      \"If you know (or can find out), what are your GPS coordinates of your study site?\",\n      \"Briefly describe the surrounding area around your stream (i.e. does it mostly run through deciduous woods?; is it in an open area?; are there any areas of concern such as point impact or non-point impact pollution?)\"\n    ],\n    [],\n    [\n      \"8/17/2016 19:12:13\",\n      \"8/17/2016\",\n      \"Lake Michigan\",\n      \"BizStream :) I mean Sand Creek\",\n      \"42.9847093,-85.8895391\",\n      \"deciduous woods\"\n    ]\n  ]\n}\n","headers":{"date":"Wed, 17 Aug 2016 23:58:12 GMT","content-encoding":"gzip","server":"ESF","vary":"Origin, X-Origin, Referer","content-type":"application/json; charset=UTF-8","cache-control":"private","content-length":"506"},"status":200,"statusText":null}

    var $output;

    var USE_LIVE_DATA = true;

    $(function() {
        $output = $("#output");

        USE_LIVE_DATA = (location.protocol != "file:");

        if (USE_LIVE_DATA) {
          $.getScript("https://apis.google.com/js/client.js?onload=checkAuth", function(){

             console.log("Script loaded: https://apis.google.com/js/client.js?onload=checkAuth");

          });
        } else {
          loadData(fakeData);
        }



    }); // jquery ready

    saveJsonToLocalStorage = function(name, jsonObject) {
      console.log(jsonObject)
      var strJson = JSON.stringify(jsonObject);
      console.log('saveJsonToLocalStorage: ', strJson);

      // Put the object into storage
      localStorage.setItem(name, strJson);
    }

    getJsonObjectFromLocalStorage = function(name) {
      // Retrieve the object from storage
      var retrievedObject = localStorage.getItem(name);

      var obj = JSON.parse(retrievedObject);

      console.log('getJsonObjectFromLocalStorage: ', obj);
      return obj;
    }



      // Your Client ID can be retrieved from your project in the Google
      // Developer Console, https://console.developers.google.com
      var CLIENT_ID = '699453295417-cipc15lbqpetclu76sh7jl5fde8ah2he.apps.googleusercontent.com';

      var SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

      /**
       * Check if current user has authorized this application.
       */
      function checkAuth() {
        gapi.auth.authorize(
          {
            'client_id': CLIENT_ID,
            'scope': SCOPES.join(' '),
            'immediate': true
          }, handleAuthResult);
      }

      /**
       * Handle response from authorization server.
       *
       * @param {Object} authResult Authorization result.
       */
      function handleAuthResult(authResult) {
        var authorizeDiv = document.getElementById('authorize-div');
        if (authResult && !authResult.error) {
          // Hide auth UI, then load client library.
          authorizeDiv.style.display = 'none';
          loadSheetsApi();
        } else {
          // Show auth UI, allowing the user to initiate authorization by
          // clicking authorize button.
          authorizeDiv.style.display = 'inline';
        }
      }

      /**
       * Initiate auth flow in response to user clicking authorize button.
       *
       * @param {Event} event Button click event.
       */
      function handleAuthClick(event) {
        gapi.auth.authorize(
          {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
          handleAuthResult);
        return false;
      }

      /**
       * Load Sheets API client library.
       */
      function loadSheetsApi() {
        var discoveryUrl =
            'https://sheets.googleapis.com/$discovery/rest?version=v4';
        gapi.client.load(discoveryUrl).then(listMajors);
      }

      /**
       * Print the names and majors of students in a sample spreadsheet:
       * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
       */
      function listMajors() {
        gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: '1e5KLFI0l8YNMg2Fjqcdc-f-GJVFW1XG9t9gS5kbAsFk',
          range: 'Raw Aquatic System Data!A1:AB',
        })
        .then(
          function(response) {
            loadData(response);

          }, 
          function(response) {
            $output.append('Error: ' + response.result.error.message);
          }
        );
      }

      function loadData(response) {
          var range = response.result;

          saveJsonToLocalStorage('lastResponse', response);


          if (range.values.length > 0) {
            $output.append('<table></table>');

            var $thead = $("<thead></thead>");
            $output.find("table").append($thead);
            var $tbody = $("<tbody></tbody>");
            $output.find("table").append($tbody);

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
            $output.append('No data found.');
          }

      }

