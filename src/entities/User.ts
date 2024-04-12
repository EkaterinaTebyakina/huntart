export interface IUserState {
  id: string | null
  username: string
  is_active: boolean
  profile: string | null
  followers: {id?:number, username?:string}[] | null
  followers_count: number | null
  subscriptions:  {id?:number, username?:string}[] | []
  subscriptions_count: number | null
}