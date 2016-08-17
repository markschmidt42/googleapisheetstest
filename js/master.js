    $(function() {



    }); // jquery ready

    saveJsonToLocalStorage = function(name, jsonObject) {
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
        var $output = $("#output");

        gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: '1e5KLFI0l8YNMg2Fjqcdc-f-GJVFW1XG9t9gS5kbAsFk',
          range: 'Raw Aquatic System Data!A1:F',
        }).then(function(response) {
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

              var trString = '<tr><td>'+ i + '</td><td>'+ row[0] + '</td><td>' + row[1]+ '</td><td>' + row[2]+ '</td><td>' + row[3]+ '</td><td>' + row[4]+ '</td><td>' + row[5] + '</td></tr>'
              
              if (i == 0) 
                $thead.append(trString);
              else
                $tbody.append(trString);

           }
          } else {
            $output.append('No data found.');
          }
        }, function(response) {
          $output.append('Error: ' + response.result.error.message);
        });
      }

