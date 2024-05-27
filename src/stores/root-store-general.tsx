import SidebarStore from "./sidebar-strore";
import FilterStore from "./filter-store";
import EntityStore from "./entity-store";
import entitiesStore from "./entities-store";

class RootStoreGeneral{
     SideBar = SidebarStore;
     Filter = FilterStore;
     Entity = EntityStore;
     Entities = entitiesStore
}

export default RootStoreGeneral;
