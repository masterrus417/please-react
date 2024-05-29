import SidebarStore from "./sidebar-strore";
import FilterStore from "./filter-store";
import EntityStore from "./entity-store";
import entitiesStore from "./entities-store";
import StageAction from "./stage-actions.tsx"

class RootStoreGeneral{
     SideBar = SidebarStore;
     Filter = FilterStore;
     Entity = EntityStore;
     Entities = entitiesStore;
     StageActions = StageAction;
}

export default RootStoreGeneral;
