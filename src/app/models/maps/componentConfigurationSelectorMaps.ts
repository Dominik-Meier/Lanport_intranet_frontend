import {DynamicRegisterOptionsComponent} from "../../components/0_navBar-Item-Component/dynamic-register-options/dynamic-register-options.component";
import {ComponentWithNameComponent} from "../../components/interfaces/componentWithName.component";
import {DynamicRegisterOptionsConfigurationComponent} from "../../components/0_navBar-Item-Component/dynamic-register-options/dynamic-register-options-configuration/dynamic-register-options-configuration.component";

export const navBarComponentConfigurationSelectorMap: Map<String, ComponentWithNameComponent> = new Map<String, any>();
navBarComponentConfigurationSelectorMap.set("DynamicRegisterOptionsComponent", DynamicRegisterOptionsConfigurationComponent);

export const navBarItemComponentConfigurationSelectorMap: Map<String, ComponentWithNameComponent> = new Map<String, any>();
//navBarItemComponentConfigurationSelectorMap.set("HtmlDisplayerComponent", HtmlDisplayerComponent);

