export interface user{
    id?: any,
    name?: string,
    email?: string,
    password?: any,
    dob?: string,
    phone?: any,
    address?: string
    is_active?: boolean
}
export interface userFilter{
    id?: any
    name?: string
    email?: string
    rc?: number
    page?: number
}

// ---------------- admin interfaces -------------

export interface admin{
    id?: number
    first_name?: string
    last_name?: string
    email?: string
    password?: string
    phone?: string
    is_active?: boolean
}

// ----------- country interfaces ---------------

export interface country {
    id?: number
    code?: any
    name?: string
    short_name?: string
  }
  export interface countryFilter{
    id?:any
    code?: any
    name?: string
    short_name?: string
    rc?: number
    page?: number
}

// ------------ state interfaces ----------------
export interface state{
    id?:number,
    country_id?:any,
    name?: string,
    short_name?:string,
    is_active?: boolean
  } 
  export interface stateFilter{
    id?:any
    name?: string
    short_name?: string
    rc?: number
    page?: number
}
  
//   -------------- destrict intrefaces -------------
export interface destrict{
    id?: number,
    state_id?: any,
    name?: string,
    short_name?: string,
    is_active?: boolean
}

// ------------ task interfaces -----------------
export interface task{
    id?:number
    name?: string
    description?: string
}