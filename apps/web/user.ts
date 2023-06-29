'use client'

import { createContext, useContext } from "react";

const CurrentUserContext = createContext<any>({})

export {
  CurrentUserContext,
  useContext
}
