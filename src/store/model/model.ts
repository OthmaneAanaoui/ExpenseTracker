import currentSelectionModel, { CurrentSelectionModel } from "./CurrentSelection";

export interface StoreModel {
	currentSelectionModel: CurrentSelectionModel
}

const storeModel: StoreModel = {
	currentSelectionModel,
}

export default storeModel