import currentSelectionModel, { CurrentSelectionModel } from "./CurrentSelection";
import iconStoreModel, { IconStoreModel } from "./IconStore";
import soldeStoreModel, { SoldeStoreModel } from "./SoldeStore";
export interface StoreModel {
	currentSelectionModel: CurrentSelectionModel;
	iconStoreModel: IconStoreModel;
	soldeStoreModel: SoldeStoreModel
}

const storeModel: StoreModel = {
	currentSelectionModel,
	iconStoreModel,
	soldeStoreModel
}

export default storeModel