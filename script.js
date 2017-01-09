$(function () {
  // Debug mode.
  window.log = (m) => {
    console.log(m);
  };

  // Create a new parser.
  /*var parser = new SemanticFormsParser({
   host: 'http://163.172.179.125:9111',
   user: 'sf_client',
   password: 'sf_client'
   });
   // Load data.
   parser.loadFormData('http://jmvanel.free.fr/jmv.rdf%23me', function (json) {
   // Render form.
   let domForm = parser.renderForm(json);
   // Append to dom.
   document.getElementById('myForm').appendChild(domForm);
   });*/

  var parserJQuery = new SemanticFormsParserJQuery({
    host: 'http://163.172.179.125:9111',
    user: 'sf_client',
    password: 'sf_client'
  });
  // Load data.
  parserJQuery.loadFormData('http://jmvanel.free.fr/jmv.rdf#me', function (json) {
    // Render form.
    let domForm = parserJQuery.renderForm(json);
    // Append to dom.
    $('#myFormJQuery').append(domForm);
  });

  /*var parserBootstrap = new SemanticFormsParserBootstrap();
   // Load data.
   parser.loadFormData('data.json', function (json) {
   // Render form.
   let domForm = parserBootstrap.renderForm(json);
   // Append to dom.
   document.getElementById('myFormBootstrap').appendChild(domForm);
   });*/
});
