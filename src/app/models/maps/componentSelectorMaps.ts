import {DynamicRegisterOptionsComponent} from "../../components/0_navBar-Item-Component/dynamic-register-options/dynamic-register-options.component";
import {HtmlDisplayerComponent} from "../../components/1_registerOptions-Component/html-displayer/html-displayer.component";
import {ComponentWithNameComponent} from "../../components/interfaces/componentWithName.component";
import {TournamentComponent} from "../../components/1_registerOptions-Component/tournament/tournament.component";

/**
 * This are all Data Provider components each component in the map must implement:
 *    interface: componentWithName
 *    interfgace: dataDisplayer
 * The provided interfaces secure that each component has a name and a data variable.
 * The name is used to select the component and data to pass in any needed data
 */

export const navBarComponentSelectorMap: Map<String, ComponentWithNameComponent> = new Map<String, any>();
navBarComponentSelectorMap.set("DynamicRegisterOptionsComponent", DynamicRegisterOptionsComponent);

export const navBarItemComponentSelectorMap: Map<String, ComponentWithNameComponent> = new Map<String, any>();
navBarItemComponentSelectorMap.set("HtmlDisplayerComponent", HtmlDisplayerComponent);
navBarItemComponentSelectorMap.set("TournamentComponent", TournamentComponent);

