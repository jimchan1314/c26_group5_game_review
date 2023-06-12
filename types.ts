export type User = {
    id?:string,
    username:string,
    users_name?:string,
    email:string,
    password:string,
    confirmPassword?:string,
    userIcon?:string,
    users_icon?:string,
}

export type NewUser = {
  id:string,
  users_name:string,
  email:string,
  password:string,
  users_icon:string,
  confirmPassword:string
  create_at:Date
}

export type Profile = {
  profileConfirmPassword: any;
  profileUsername:string,
  profilePassword:string,
  profileIcon?:any
}


export type Game = {
  gameName:string,
  game_type:string,
  description:string,
  gameCover?:string,
}

export type EditGame = {
  gameName:string,
  game_type:string,
  description:string,
  gameCover?:string,
}

export type Message = {
  text: string
}

export type EditedMessage = {
  edittext: string
}