class SemanticFormsParserBootstrap extends SemanticFormsParser {

  renderFieldSection(field) {
    let domFieldSection = super.renderFieldSection(field);
    domFieldSection.classList.add('input-group');
    return domFieldSection;
  }

  renderLabel(field) {
    let domLabel = super.renderLabel(field);
    let domLabelWrapper = this.doc.createElement('div');
    domLabelWrapper.appendChild(domLabel);
    domLabelWrapper.classList.add('input-group-addon');
    return domLabelWrapper;
  }

  renderField(field) {
    let domField = super.renderField(field);
    domField.classList.add('form-control');
    return domField;
  }
}
