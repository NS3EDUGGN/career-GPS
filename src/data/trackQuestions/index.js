import web from "./web"
import ai from "./ai"
import data from "./data"
import network from "./network"
import security from "./security"
import hr from "./hr"
import marketing from "./marketing"
import logistics from "./logistics"
import cloud from "./cloud"
import finance from "./finance"
import content from "./content"      

const trackQuestions = {

  tech_coding: [
    ...web,
    ...ai,
    ...data
  ],

  tech_noncoding: [
    ...network,
    ...security
  ],

  non_technical: [
    ...marketing,
    ...hr,
    ...logistics
  ],

  web,
  ai,
  data,
  network,
  security,
  hr,
  marketing,
  logistics,
  cloud,
  finance,
  content
}

export default trackQuestions
