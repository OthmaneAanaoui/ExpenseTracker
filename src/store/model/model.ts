import currentSelectionModel, { CurrentSelectionModel } from "./CurrentSelection";
import iconStoreModel, { IconStoreModel } from "./IconStore";
export interface StoreModel {
	currentSelectionModel: CurrentSelectionModel;
	iconStoreModel: IconStoreModel;
}

const storeModel: StoreModel = {
	currentSelectionModel,
	iconStoreModel
}

export default storeModel