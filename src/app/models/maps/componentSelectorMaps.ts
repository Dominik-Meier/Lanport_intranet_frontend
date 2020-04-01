import {DynamicRegisterOptionsComponent} from "../../components/0_navBar-Item-Component/dynamic-register-options/dynamic-register-options.component";
import {HtmlDisplayerComponent} from "../../components/1_registerOptions-Component/html-displayer/html-displayer.component";
import {ComponentWithNameComponent} from "../../components/interfaces/componentWithName.component";

export const navBarComponentSelectorMap: Map<String, ComponentWithNameComponent> = new Map<String, any>();
navBarComponentSelectorMap.set("DynamicRegisterOptionsComponent", DynamicRegisterOptionsComponent);

export const navBarItemComponentSelectorMap: Map<String, ComponentWithNameComponent> = new Map<String, any>();
navBarItemComponentSelectorMap.set("HtmlDisplayerComponent", HtmlDisplayerComponent);

