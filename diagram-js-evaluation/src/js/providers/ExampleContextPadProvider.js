import * as domIdentifier from './../const/dom-identifier'
import * as $ from "jquery";
import * as dom_identifier from "../../../../joint-js-evaluation/src/js/const/dom-identifier";

/**
 * A example context pad provider.
 */
export default function ExampleContextPadProvider(connect, contextPad, modeling) {
  this._connect = connect;
  this._modeling = modeling;

  contextPad.registerProvider(this);
}

ExampleContextPadProvider.$inject = [
  'connect',
  'contextPad',
  'modeling'
];


ExampleContextPadProvider.prototype.getContextPadEntries = function(element) {
  let connect = this._connect,
      modeling = this._modeling;

  function removeElement() {
    modeling.removeElements([ element ]);
  }

  function startConnect(event, element, autoActivate) {
    connect.start(event, element, autoActivate);
  }

  function editLabel(event, element, autoActivate) {
    showEditPropertiesModal();

    let inputField = $("#"+dom_identifier.modalEditPropertyContent);
    inputField.val(element.customLabel);
    // if this was not a proof of concept, listener should i) be removed again and ii) be on modal close event
    inputField.on("change", function (){
      element.customLabel = inputField.val();
      modeling._eventBus.fire('element.changed', { element: element });
    });

  }

  return {
    'delete': {
      group: 'edit',
      className: 'context-pad-icon-remove',
      title: 'Remove',
      action: {
        click: removeElement,
        dragstart: removeElement
      }
    },
    'connect': {
      group: 'edit',
      className: 'context-pad-icon-connect',
      title: 'Connect',
      action: {
        click: startConnect,
        dragstart: startConnect
      }
    },
    'editLabel':{
      group: 'edit',
      className: 'context-pad-icon-edit',
      title: 'Edit',
      action: {
        click: editLabel,
        dragstart: editLabel
      }
    }
  };
};

function showEditPropertiesModal() {
  $("#" + domIdentifier.modalEditPropertyIdentifier).modal();
}