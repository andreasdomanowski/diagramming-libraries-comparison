import * as $ from "jquery";
import * as dom_identifier from "./const/dom-identifier";
import {paper} from './graph'

const maxLabelLength = 12;

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
            let newLabel = inputField.val();
            if(newLabel.length > maxLabelLength){
                newLabel = newLabel.slice(0,maxLabelLength-3) + "...";
            }
            cellView.model.attr("label/text", newLabel);
        });
    });