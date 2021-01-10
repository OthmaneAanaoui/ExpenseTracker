import { Action, action} from 'easy-peasy'

export const SelectionTypeEnum = {
    none:0,
    month:1,
    category:2
}

export type CurrentSelection = {
    selectionType:number;
    id:number;
}

export interface CurrentSelectionModel {
    /**
     * State
     */
    currentSelection: CurrentSelection,

    /**
     * Actions
     */
    setCurrentSelection: Action<CurrentSelectionModel, CurrentSelection>
}

const currentSelectionModel: CurrentSelectionModel = {
    currentSelection: {selectionType:SelectionTypeEnum.none, id:0},
    setCurrentSelection: action((state, selection) =>{
        state.currentSelection = selection
        return ({selectionType:selection.selectionType, id:selection.id})
    })
}

export default currentSelectionModel;