import Diagram from 'diagram-js';

import ConnectModule from 'diagram-js/lib/features/connect';
import ContextPadModule from 'diagram-js/lib/features/context-pad';
import CreateModule from 'diagram-js/lib/features/create';
import LassoToolModule from 'diagram-js/lib/features/lasso-tool';
import ModelingModule from 'diagram-js/lib/features/modeling';
import MoveCanvasModule from 'diagram-js/lib/navigation/movecanvas';
import MoveModule from 'diagram-js/lib/features/move';
import OutlineModule from 'diagram-js/lib/features/outline';
import PaletteModule from 'diagram-js/lib/features/palette';
import ResizeModule from 'diagram-js/lib/features/resize';
import RulesModule from 'diagram-js/lib/features/rules';
import SelectionModule from 'diagram-js/lib/features/selection';
import ZoomScrollModule from 'diagram-js/lib/navigation/zoomscroll';

import ProvidersModule from './providers';

import {CustomElementStyleModule} from './shapes/CustomElementStyleModule'






/**
 * Our editor constructor
 *
 * @param { { container: Element, additionalModules?: Array<any> } } options
 *
 * @return {Diagram}
 */
export default function Editor(options) {

  const {
    container,
    additionalModules = []
  } = options;

  // default modules provided by the toolbox
  const builtinModules = [
    ConnectModule,
    ContextPadModule,
    CreateModule,
    LassoToolModule,
    ModelingModule,
    MoveCanvasModule,
    MoveModule,
    OutlineModule,
    PaletteModule,
    ResizeModule,
    RulesModule,
    SelectionModule,
    ZoomScrollModule
  ];

  // our own modules, contributing controls, customizations, and more
  const customModules = [
    ProvidersModule,
    CustomElementStyleModule
  ];

  return new Diagram({
    canvas: {
      container
    },
    modules: [
      ...builtinModules,
      ...customModules,
      ...additionalModules
    ]
  });
}