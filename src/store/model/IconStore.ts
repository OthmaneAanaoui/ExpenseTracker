import { Action, action, Thunk, thunk} from 'easy-peasy'
import services from '../../services'
import { Icon } from '../../types/Icon'
import { StoreModel } from './model'

export interface IconStoreModel {
    /**
     * State
     */
    icons: Icon[],

    /**
     * Actions
     */
    setIcons: Action<IconStoreModel, Icon[]>,
  
    /**
     * Thunk
     */
    fetchIcons: Thunk<IconStoreModel, void, void, StoreModel, Promise<void>>

}

const iconStoreModel: IconStoreModel = {
    icons: [],

    setIcons: action((state, _icons) => {
        let listIcon:Icon[] = []
        _icons.forEach((icon => {
            if(icon.id) {
                listIcon = [...listIcon, icon]
            }
        }))
        state.icons = [...listIcon]
    }),

    fetchIcons: thunk(async actions => {
        let icons = await services.iconService.getIcons()
        if(icons === undefined) {
            icons = await services.iconService.getLocalIcons()
        }
		actions.setIcons(icons)
    })
}

export default iconStoreModel;