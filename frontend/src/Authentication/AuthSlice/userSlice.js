import { createSlice } from "@reduxjs/toolkit";
import { getUserFromLocal, removeUserFromLocal, setUserToLocal } from "../Local/local";

//api bata state manage garna lai createapi
//locally state magae garna lai createslice

export const userSlice = createSlice({
  name: 'userSlice', //yo name bata connet huncha local storage sanga
  initialState: {
    //locally user saved cha bahen tancha
    user: getUserFromLocal(),
  },
  reducers: {
    //state:initial state (user object)
    //action: Tala pass gareko function action object bancha ani pachi pass gareko valur chaida 'action.payload' bata access garcha
    setUser: (state, action) => {
      state.user = action.payload; //pass gareko kura
      setUserToLocal(action.payload);
    },
    removeUser: (state, action) => {
      state.user = null;
      removeUserFromLocal();
    },

  }
});

//usselector- locally save bhako user get garna
//udedispatch- action call garna

export const { setUser, removeUser } = userSlice.actions;
