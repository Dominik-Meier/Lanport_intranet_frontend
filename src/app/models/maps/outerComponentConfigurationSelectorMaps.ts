import {DynamicRegisterOptionsComponent} from "../../components/0_navBar-Item-Component/dynamic-register-options/dynamic-register-options.component";
import {ComponentWithNameComponent} from "../../components/interfaces/componentWithName.component";
import {DynamicRegisterOptionsConfigurationComponent} from "../../components/0_navBar-Item-Component/dynamic-register-options/dynamic-register-options-configuration/dynamic-register-options-configuration.component";

/**
 * This are all Data Provider Configurations components each component in the map must implement:
 *    interface: componentWithName
 *    interface: dataDisplayer
 * The provided interfaces secure that each component has a name and a data variable.
 * The name is used to select the component and data to pass in any needed data
 */

export const navBarComponentConfigurationSelectorMap: Map<String, ComponentWithNameComponent> = new Map<String, any>();
navBarComponentConfigurationSelectorMap.set("DynamicRegisterOptionsComponent", DynamicRegisterOptionsConfigurationComponent);

