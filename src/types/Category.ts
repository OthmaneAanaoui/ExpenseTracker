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
      icon:{id:"44", name:"food", link:"link_food"},
      name:"Vie Quotidienne",
      color:"red"
    },

    {
      id:"2",
      icon:{id:"44", name:"food", link:"link_food"},
      name:"Habitation",
      color:"red"
    },
    {
      id:"3",
      icon:{id:"44", name:"food", link:"link_food"},
      name:"Santé",
      color:"red"
    },
    {
      id:"4",
      icon:{id:"44", name:"food", link:"link_food"},
      name:"Transport",
      color:"red"
    },
    {
      id:"5",
      icon:{id:"32", name:"game", link:"link_game"},
      name:"Loisirs",
      color:"blue"
    },

    {
      id:"5",
      icon:{id:"32", name:"game", link:"link_game"},
      name:"Animaux",
      color:"blue"
    },
  ]

  export {Category,categories}