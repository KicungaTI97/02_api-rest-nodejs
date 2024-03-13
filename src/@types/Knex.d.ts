//eslint-desable-next-line
import { Knex } from "knex";

declare module "knex/types/tables"{
  export interface Tables{
    transations:{
      id: string
      title: string
      amount: number
      create_ate: string
      session_id?:string
    }
  }
}