import SidebarStore from "./sidebar-strore";
import FilterStore from "./filter-store";
import EntityStore from "./entity-store";

class RootStoreGeneral{
     SideBar = SidebarStore;
     Filter = FilterStore;
     Entity = EntityStore;
}


export default RootStoreGeneral;
