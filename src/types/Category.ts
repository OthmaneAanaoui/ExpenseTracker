export type Icon = {
    id?: string,
    name: string,
    link: string
  }

interface Category  {
    id?: string,
    icon: Icon,
    name: string,
    color:string
  }




  const categories : Category[] = [
    {
      id:"1",
      icon:{id:"1", name:"shop", link:"link_food"},
      name:"Vie Quotidienne",
      color:"green"
    },

    {
      id:"2",
      icon:{id:"2", name:"Home", link:"link_food"},
      name:"Habitation",
      color:"red"
    },
    {
      id:"3",
      icon:{id:"3", name:"food", link:"link_food"},
      name:"Santé",
      color:"orange"
    },
    {
      id:"4",
      icon:{id:"4", name:"car", link:"link_food"},
      name:"Transport",
      color:"yellow"
    },
    {
      id:"5",
      icon:{id:"5", name:"game", link:"link_game"},
      name:"Sport",
      color:"blue"
    },

    {
      id:"6",
      icon:{id:"6", name:"divers", link:"link_game"},
      name:"Loisirs",
      color:"pink"
    },
  ]
  
  export {Category,categories}

