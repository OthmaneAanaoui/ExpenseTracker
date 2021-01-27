import { Action, action, Thunk, thunk} from 'easy-peasy'
import services from '../../services'
import { Solde } from '../../types/Solde';
import { StoreModel } from './model';
 
export interface SoldeStoreModel {
    /**
     * State
     */
    solde: Solde,

    /**
     * Actions
     */
    setSolde: Action<SoldeStoreModel, Solde>,
  
    /**
     * Thunk
     */
    fetchSolde: Thunk<SoldeStoreModel, string, void, StoreModel, Promise<void>>,
    pushSolde: Thunk<SoldeStoreModel, {uid:string, solde:Solde}, void, StoreModel, Promise<void>>
}

const soldeStoreModel: SoldeStoreModel = {
    solde: {id:undefined, montant:0},

    setSolde: action((state, _solde) => {
        state.solde = _solde
    }),

    pushSolde: thunk(async (actions, payload) => {
        const {uid, solde} = payload
        await services.soldeService.updateSolde(uid, solde)
        services.soldeService.setLocalSolde(solde)
        actions.setSolde(solde)
    }),

    fetchSolde: thunk(async (actions, uid) => {
        let solde = await services.soldeService.getSolde(uid)
        if(solde === undefined) {
            solde = await services.soldeService.getLocalSolde()
            await services.soldeService.updateSolde(uid, {id:undefined, montant:0})
            solde = await services.soldeService.getSolde(uid)
        } else {
            await services.soldeService.setLocalSolde(solde)
        }
		actions.setSolde(solde)
    })
}

export default soldeStoreModel;