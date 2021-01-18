import * as React from 'react';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import { useStoreState } from '../store/hooks';

interface IconComponentProps {
    import?:string;
    iconName?:string;
    size?:number;
    color?:string;
    iconId?:string;
}

const IconComponent = (props: IconComponentProps) => {
    const iconStore = useStoreState(state => state.iconStoreModel)

const getIconById = (id:string) => {
    const icon = iconStore.icons.find(icon => icon.id === id)
    return icon
}

const getIconTags = (lib?: string, name?: any, _size?: number, _color?: string, iconId?: string) => {
    let tag:any =<></>;
    let icon;
    if(iconId !== undefined) {
        icon = getIconById(iconId)
    }
    const nameIcon = icon?.iconName !== undefined ? icon.iconName : name;
    const importIcon = icon?.import !== undefined ? icon.import : lib;
    const size = _size !== undefined ? _size : 24
    const color = _color !== undefined ? _color : 'white' 
    switch (importIcon) {
        case 'Entypo':
            tag = <Entypo name={nameIcon} size={size} color={color} />
            break;
        case 'AntDesign':
            tag = <AntDesign name={nameIcon} size={size} color={color} />
            break;
        case 'MaterialCommunityIcons':
            tag = <MaterialCommunityIcons name={nameIcon} size={size} color={color} />
            break;
        case 'MaterialIcons':
            tag = <MaterialIcons name={nameIcon} size={size} color={color} />
            break;
        case 'SimpleLineIcons':
            tag = <SimpleLineIcons name={nameIcon} size={size} color={color} />
            break;
        case 'FontAwesome5':
            tag = <FontAwesome5 name={nameIcon} size={size} color={color} />
            break;
    }
    return tag
}

  return (
    <>
        {getIconTags(props.import, props.iconName, props.size, props.color, props.iconId)}
    </>
  );
};

export default IconComponent;
