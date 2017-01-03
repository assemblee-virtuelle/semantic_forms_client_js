class SemanticFormsParserJQuery extends SemanticFormsParser {
  ajax(options) {
    // Use the full power of JQuery AJAX.
    $.ajax(options);
  }

  loadFormDataSuccess(success, data) {
    // With jQuery, data has already parsed.
    success.call(this, data);
  }
}
