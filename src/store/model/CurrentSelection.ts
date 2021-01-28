import { Action, action} from 'easy-peasy'

export const SelectionTypeEnum = {
    none:0,
    month:1,
    category:2
}

export type CurrentSelection = {
    selectionType:number;
    id:string;
    value:number
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
    currentSelection: {selectionType:SelectionTypeEnum.none, id:'0', value:0},
    
    setCurrentSelection: action((state, selection) => {
        state.currentSelection = selection
    })

}

export default currentSelectionModel;