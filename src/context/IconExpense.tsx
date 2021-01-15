import React from "react"
import { createContext, useContext } from "react"
import services from "../services/index"
import { Icon } from "../types/Category"

type IconContextType = {
    icons: Icon[],
    asyncGetAll: () => Promise<Icon[]>,
    getIconById: (id:string) => Icon,
    getIcons: () => Icon[]
}

const defaultIconState = {
    icons: [],
    asyncGetAll: async () => undefined,
    getIconById: () => undefined,
    getIcons: () => undefined
}

const IconContext = createContext<IconContextType | null>(null)

export const IconContextProvider: React.FC = ({ children }) => {

    const [icons, setIcons] = React.useState<Icon[]>([])

    const asyncGetAll: () => Promise<Icon[]> = async () => {
        try {
            const listIcon: Icon[] = await services.iconService.getIcons()
            setIcons(listIcon)
        } catch (err) {
            throw err
        }
        return icons
    }

    const getIconById = (id:string) => {
        const index = icons.findIndex(icon => id === icon.id)
        return icons[index]
    }

    const getIcons = () => {
        return icons
    }

    return (
        <IconContext.Provider
            value={{
                icons: icons,
                asyncGetAll,
                getIconById,
                getIcons
            }}>
            {children}
        </IconContext.Provider>
    );
}

export const useIcon = () => {
    const icon = useContext(IconContext)
    return icon
}
