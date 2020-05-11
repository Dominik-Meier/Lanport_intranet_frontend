import {HtmlDisplayerConfigurationComponent} from "../../components/1_registerOptions-Component/html-displayer/html-displayer-configuration/html-displayer-configuration.component";
import {TournamentConfigurationComponent} from "../../components/1_registerOptions-Component/tournament/tournament-configuration/tournament-configuration.component";

/**
 * This are all Data Provider Configurations components each component in the map must implement:
 *    interface: componentWithName
 *    interfgace: dataDisplayer
 * The provided interfaces secure that each component has a name and a data variable.
 * The name is used to select the component and data to pass in any needed data
 */

export const navBarItemComponentConfigurationSelectorMap: Map<String, any> = new Map<String, any>();
navBarItemComponentConfigurationSelectorMap.set("HtmlDisplayerComponent", HtmlDisplayerConfigurationComponent);
navBarItemComponentConfigurationSelectorMap.set("TournamentComponent", TournamentConfigurationComponent);

