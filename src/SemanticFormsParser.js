class SemanticFormsParser {

  constructor(options) {
    Object.assign(this, options);
    this.doc = window.document;
  }

  /**
   * Simple AJAX request
   * @param {Object} options Contain various ajax options.
   */
  ajax(options) {
    var xhr = new window.XMLHttpRequest(),
      data = options.data ? this.param(options.data) : undefined,
      method = options.method || 'GET', success = options.success,
      url = options.url;
    // Create xhr.
    xhr.open(method,
      // On GET mode append data as query strings.
      method === 'GET' && data ? url + '?' + data : url,
      // Async by default.
      options.async !== undefined ? options.async : true);
    // Define callback.
    xhr.onreadystatechange = function () {
      // Process complete.
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // Callback function specified.
          if (success && typeof success === 'function') {
            success(xhr);
          }
        }
        else if (options.error) {
          options.error(xhr);
        }
      }
    };
    // Requested headers.
    if (method === 'POST') {
      xhr.setRequestHeader('Content-type',
        'application/x-www-form-urlencoded');
    }
    // Lets go.
    xhr.send(data);
  }

  auth(callback) {
    if (!this.authenticated) {
      this.ajax({
        url: this.host + '/authenticate?xhr=1&userid=' + this.user + '&password=' + this.password + '&confirmPassword=' + this.password,
        xhrFields: {
          withCredentials: true
        },
        /*success:() => {

        },*/
        complete:(e) => {
          console.log(e);
        }
      });
      this.authenticated = true;
    }
  }

  loadFormData(url, success = false, options = {}) {
    this.auth(() => {
      // Give priority to options object.
      options = Object.assign({
        url: this.host + '/form-data?displayuri=' + window.encodeURIComponent(url),
        beforeSend: function (xhr) {
          xhr.setRequestHeader("Authorization", "Basic " + btoa(this.username + ":" + this.password));
        },
        success: (data) => {
          success && this.loadFormDataSuccess(success, data);
        }
      }, options);
      this.ajax(options);
    });
  }

  loadFormDataSuccess(success, data) {
    success.call(this, JSON.parse(data.responseText));
  }

  renderForm(object) {
    var domForm = this.doc.createElement('form');
    for (let field of object.fields) {
      domForm.appendChild(this.renderFieldSection(field));
    }
    return domForm;
  }

  renderFieldSection(field) {
    let domSection = this.doc.createElement('div');
    domSection.appendChild(this.renderLabel(field));
    domSection.appendChild(this.renderField(field));
    return domSection;
  }

  renderLabel(field) {
    let domLabel = this.doc.createElement('label');
    domLabel.innerHTML = field.label;
    return domLabel;
  }

  renderField(field) {
    let domField = this.doc.createElement('input');

    switch (field.widgetType) {
      case 'URI WidgetType' :
        domField.setAttribute('type', 'url');
        break;
      default :
        domField.setAttribute('type', 'text');
    }

    domField.setAttribute('value', field.value);
    field.comment && domField.setAttribute('placeholder', field.comment);
    field.mandatory && domField.setAttribute('required', 'url');
    return domField;
  }
}
