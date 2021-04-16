import * as $ from "jquery";
import * as dom_identifier from "./const/dom-identifier";
import {paper} from './graph'

function showEditPropertiesModal() {
    $("#" + dom_identifier.modalEditPropertyIdentifier).modal();
}

paper.on('element:contextmenu',
    function (cellView) {
        showEditPropertiesModal();
        let inputField = $("#"+dom_identifier.modalEditPropertyContent);
        inputField.val(cellView.model.attr("label/text"));
        // if this was not a proof of concept, listener should be removed again
        inputField.on("change", function (){
            cellView.model.attr("label/text", inputField.val());
        });
    });