import * as $ from "jquery";
import * as dom_identifier from "./const/dom-identifier";
import './customShape'
import {paper} from './graph'
import {customNamespace, customShapeIdentifier} from "./customShape";

const maxLabelLengthRectangle = 12;
const maxLabelLengthCircle = 5;

const rectangleIdentifier = "standard.Rectangle";
const circleIdentifier = "standard.Circle";

const composedIdentifier = customNamespace + "." + customShapeIdentifier;

const pruneString = "...";
const pruneLength = pruneString.length;



function showEditPropertiesModal() {
    $("#" + dom_identifier.modalEditPropertyIdentifier).modal();
}

let currentCelLView = undefined;

paper.on('element:contextmenu',
    function (cellView) {
        currentCelLView = cellView;
        showEditPropertiesModal();
        let inputField = $("#"+dom_identifier.modalEditPropertyContent);
        inputField.val(cellView.model.attr("label/text"));
        // if this was not a proof of concept, listener should i) be removed again and ii) be on modal close event
        inputField.on("change", function (){
            let newLabel = inputField.val();

            let maxLabelLength = undefined;

            if(currentCelLView.model.attributes.type === rectangleIdentifier || currentCelLView.model.attributes.type === composedIdentifier){
                maxLabelLength = maxLabelLengthRectangle;
            }

            if(currentCelLView.model.attributes.type === circleIdentifier){
                maxLabelLength = maxLabelLengthCircle;
            }

            newLabel = newLabel.slice(0,maxLabelLength- pruneLength) + pruneString;
            currentCelLView.model.attr("label/text", newLabel);
        });
    });