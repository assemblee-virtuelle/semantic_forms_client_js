$(function () {
  // Debug mode.
  window.log = (m) => {
    console.log(m);
  };

  // Create a new parser.
  var parser = new SemanticFormsParser();
  // Load data.
  parser.loadFormData('data.json', function (json) {
    // Render form.
    let domForm = parser.renderForm(json);
    // Append to dom.
    document.getElementById('myForm').appendChild(domForm);
  });

  var parserJQuery = new SemanticFormsParserJQuery();
  // Load data.
  parser.loadFormData('data.json', function (json) {
    // Render form.
    let domForm = parserJQuery.renderForm(json);
    // Append to dom.
    $('#myFormJQuery').append(domForm);
  });

  var parserBootstrap = new SemanticFormsParserBootstrap();
  // Load data.
  parser.loadFormData('data.json', function (json) {
    // Render form.
    let domForm = parserBootstrap.renderForm(json);
    // Append to dom.
    document.getElementById('myFormBootstrap').appendChild(domForm);
  });
});
