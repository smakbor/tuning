export const roles = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  MERCHANT: 'MERCHANT',
  RESELLER: 'RESELLER',
  SUB_RESELLER: 'SUB_RESELLER',
  EMPLOYEE: 'EMPLOYEE'
};

export const routeRoles = {
  dashboard: {
    dashboard: [roles.ADMIN, roles.MERCHANT, roles.EMPLOYEE, roles.SUB_RESELLER, roles.RESELLER]
  },
  profile: {
    viewProfile: [roles.MERCHANT, roles.RESELLER, roles.SUB_RESELLER, roles.EMPLOYEE],
    branch: [roles.MERCHANT, roles.RESELLER, roles.SUB_RESELLER, roles.EMPLOYEE]
  },
  configuration: {
    configuration: [roles.MERCHANT, roles.RESELLER, roles.SUB_RESELLER, roles.EMPLOYEE],
    zone: [roles.MERCHANT, roles.RESELLER, roles.SUB_RESELLER, roles.EMPLOYEE],
    subZone: [roles.MERCHANT, roles.RESELLER, roles.SUB_RESELLER, roles.EMPLOYEE],
    box: [roles.MERCHANT, roles.RESELLER, roles.SUB_RESELLER, roles.EMPLOYEE],
    clientType: [roles.MERCHANT, roles.RESELLER, roles.SUB_RESELLER, roles.EMPLOYEE],
    router: [roles.MERCHANT, roles.RESELLER, roles.SUB_RESELLER, roles.EMPLOYEE],
    package: [roles.MERCHANT, roles.RESELLER, roles.SUB_RESELLER, roles.EMPLOYEE],
    aliasPackage: [roles.MERCHANT, roles.EMPLOYEE],
    connectionType: [roles.MERCHANT]
  },
  client: {
    client: [roles.MERCHANT, roles.RESELLER, roles.SUB_RESELLER, roles.EMPLOYEE],
    pppoe: [roles.MERCHANT, roles.RESELLER, roles.SUB_RESELLER, roles.EMPLOYEE],
    activePPPoE: [roles.MERCHANT, roles.RESELLER, roles.SUB_RESELLER, roles.EMPLOYEE],
    newClient: [roles.MERCHANT, roles.RESELLER, roles.SUB_RESELLER, roles.EMPLOYEE],
    dueClient: [roles.MERCHANT, roles.RESELLER, roles.SUB_RESELLER, roles.EMPLOYEE],
    inactiveClient: [roles.MERCHANT, roles.RESELLER, roles.SUB_RESELLER, roles.EMPLOYEE],
    renewClient: [roles.MERCHANT, roles.RESELLER, roles.SUB_RESELLER, roles.EMPLOYEE],
    crossClient: [roles.MERCHANT, roles.RESELLER, roles.SUB_RESELLER, roles.EMPLOYEE],
    deletedClient: [roles.MERCHANT, roles.RESELLER, roles.SUB_RESELLER, roles.EMPLOYEE],
    recoveryClient: [roles.MERCHANT, roles.RESELLER, roles.SUB_RESELLER, roles.EMPLOYEE],
    freeClient: [roles.MERCHANT, roles.RESELLER, roles.SUB_RESELLER, roles.EMPLOYEE],
    pendingClient: [roles.MERCHANT, roles.RESELLER, roles.SUB_RESELLER, roles.EMPLOYEE],
    blacklistedClient: [roles.MERCHANT],
    liveBandwidth: [roles.MERCHANT, roles.EMPLOYEE, roles.RESELLER, roles.SUB_RESELLER],
    isUpdate: [roles.MERCHANT, roles.EMPLOYEE, roles.RESELLER, roles.SUB_RESELLER],
    clientProfile: [roles.MERCHANT, roles.EMPLOYEE, roles.RESELLER, roles.SUB_RESELLER],
    clientProfileUpdate: [roles.MERCHANT, roles.EMPLOYEE, roles.RESELLER, roles.SUB_RESELLER],
    clientProfileInformation: [roles.MERCHANT, roles.EMPLOYEE, roles.RESELLER, roles.SUB_RESELLER],
    clientProfileRecharge: [roles.MERCHANT, roles.EMPLOYEE, roles.RESELLER, roles.SUB_RESELLER],
    clientProfileConnectionFee: [roles.MERCHANT, roles.EMPLOYEE, roles.RESELLER, roles.SUB_RESELLER],
    clientProfilePermission: [roles.MERCHANT, roles.EMPLOYEE, roles.RESELLER, roles.SUB_RESELLER],
    clientPackageChange: [roles.MERCHANT, roles.EMPLOYEE, roles.RESELLER, roles.SUB_RESELLER]
  },

  hotspotClient: {
    client: [roles.MERCHANT, roles.RESELLER, roles.SUB_RESELLER, roles.EMPLOYEE],
    router: [roles.MERCHANT, roles.RESELLER, roles.SUB_RESELLER, roles.EMPLOYEE],
    routerInfo: [roles.MERCHANT, roles.RESELLER, roles.SUB_RESELLER, roles.EMPLOYEE]
  },
  reseller: {
    reseller: [roles.MERCHANT, roles.EMPLOYEE],
    addReseller: [roles.MERCHANT, roles.EMPLOYEE],
    updateReseller: [roles.MERCHANT, roles.EMPLOYEE],
    resellerClients: [roles.MERCHANT, roles.EMPLOYEE],
    allClients: [roles.MERCHANT, roles.EMPLOYEE]
  },
  subReseller: {
    subReseller: [roles.MERCHANT, roles.RESELLER, roles.EMPLOYEE],
    subResellerClients: [roles.MERCHANT, roles.RESELLER, roles.EMPLOYEE],
    addSubReseller: [roles.MERCHANT, roles.RESELLER, roles.EMPLOYEE],
    updateSubReseller: [roles.MERCHANT, roles.RESELLER, roles.EMPLOYEE]
  },
  employee: {
    employee: [roles.MERCHANT, roles.RESELLER, roles.SUB_RESELLER],
    employeeRole: [roles.MERCHANT, roles.RESELLER, roles.SUB_RESELLER],
    payHead: [roles.MERCHANT, roles.RESELLER, roles.SUB_RESELLER],
    employeeSalary: [roles.MERCHANT, roles.RESELLER, roles.SUB_RESELLER],
    profile: [roles.MERCHANT, roles.RESELLER, roles.SUB_RESELLER],
    information: [roles.MERCHANT, roles.RESELLER, roles.SUB_RESELLER],
    permission: [roles.MERCHANT, roles.RESELLER, roles.SUB_RESELLER]
  },
  report: {
    report: [roles.SUPER_ADMIN, roles.MERCHANT, roles.RESELLER, roles.SUB_RESELLER, roles.EMPLOYEE],
    resellerCollection: [roles.SUPER_ADMIN, roles.MERCHANT, roles.RESELLER, roles.SUB_RESELLER, roles.EMPLOYEE],
    billReport: [roles.SUPER_ADMIN, roles.MERCHANT, roles.RESELLER, roles.SUB_RESELLER, roles.EMPLOYEE],
    commission: [roles.SUPER_ADMIN, roles.MERCHANT, roles.RESELLER, roles.SUB_RESELLER, roles.EMPLOYEE],
    resellerBalanceStatment: [roles.RESELLER]
  },
  accounts: {
    account: [roles.MERCHANT, roles.EMPLOYEE, roles.RESELLER, roles.SUB_RESELLER],
    deposit: [roles.MERCHANT, roles.EMPLOYEE, roles.RESELLER, roles.SUB_RESELLER],
    expenditure: [roles.MERCHANT, roles.EMPLOYEE, roles.RESELLER, roles.SUB_RESELLER],
    expenditureType: [roles.MERCHANT, roles.EMPLOYEE, roles.RESELLER, roles.SUB_RESELLER],
    income: [roles.MERCHANT, roles.EMPLOYEE, roles.RESELLER, roles.SUB_RESELLER],
    incomeType: [roles.MERCHANT, roles.EMPLOYEE, roles.RESELLER, roles.SUB_RESELLER],
    cashBox: [roles.MERCHANT, roles.EMPLOYEE, roles.RESELLER, roles.SUB_RESELLER],
    merchantInvoice: [roles.MERCHANT, roles.EMPLOYEE]
  },
  message: {
    message: [roles.MERCHANT, roles.EMPLOYEE, roles.RESELLER, roles.SUB_RESELLER],
    smsSetting: [roles.MERCHANT, roles.EMPLOYEE, roles.RESELLER, roles.SUB_RESELLER],
    bulkMessage: [roles.MERCHANT, roles.EMPLOYEE, roles.RESELLER, roles.SUB_RESELLER],
    messageLog: [roles.MERCHANT, roles.EMPLOYEE, roles.RESELLER, roles.SUB_RESELLER],
    nonMasking: [roles.MERCHANT, roles.EMPLOYEE, roles.RESELLER, roles.SUB_RESELLER],
    masking: [roles.MERCHANT, roles.EMPLOYEE, roles.RESELLER, roles.SUB_RESELLER],
    fixedNumber: [roles.MERCHANT, roles.EMPLOYEE, roles.RESELLER, roles.SUB_RESELLER]
  },
  settings: {
    settings: [roles.MERCHANT, roles.EMPLOYEE, roles.RESELLER, roles.SUB_RESELLER],
    logo: [roles.MERCHANT, roles.EMPLOYEE, roles.RESELLER, roles.SUB_RESELLER],
    activityLogs: [roles.MERCHANT, roles.EMPLOYEE, roles.RESELLER, roles.SUB_RESELLER],
    trash: [roles.MERCHANT, roles.EMPLOYEE, roles.RESELLER, roles.SUB_RESELLER]
  },
  network: {
    network: [roles.MERCHANT, roles.EMPLOYEE, roles.RESELLER, roles.SUB_RESELLER],
    networkSetting: [roles.MERCHANT, roles.EMPLOYEE, roles.RESELLER, roles.SUB_RESELLER],
    diagram: [roles.MERCHANT, roles.EMPLOYEE, roles.RESELLER, roles.SUB_RESELLER],
    googleMap: [roles.MERCHANT, roles.EMPLOYEE, roles.RESELLER, roles.SUB_RESELLER],
    olt: [roles.MERCHANT, roles.EMPLOYEE, roles.RESELLER, roles.SUB_RESELLER],
    switch: [roles.MERCHANT, roles.EMPLOYEE, roles.RESELLER, roles.SUB_RESELLER],
    mikrotik: [roles.MERCHANT, roles.EMPLOYEE, roles.RESELLER, roles.SUB_RESELLER],
    splitter: [roles.MERCHANT, roles.EMPLOYEE, roles.RESELLER, roles.SUB_RESELLER],
    onu: [roles.MERCHANT, roles.EMPLOYEE, roles.RESELLER, roles.SUB_RESELLER]
  },
  support: {
    support: [roles.MERCHANT, roles.RESELLER, roles.SUB_RESELLER],
    bulletin: [roles.MERCHANT, roles.RESELLER, roles.SUB_RESELLER],
    resellerTicket: [roles.MERCHANT, roles.RESELLER, roles.SUB_RESELLER],
    subResellerTicket: [roles.MERCHANT, roles.RESELLER, roles.SUB_RESELLER],
    supportEmployee: [roles.MERCHANT, roles.EMPLOYEE, roles.RESELLER, roles.SUB_RESELLER, roles.SUPER_ADMIN],
    type: [roles.MERCHANT, roles.EMPLOYEE, roles.RESELLER, roles.SUB_RESELLER, roles.SUPER_ADMIN],
    category: [roles.MERCHANT, roles.EMPLOYEE, roles.RESELLER, roles.SUB_RESELLER, roles.SUPER_ADMIN],
    ticket: [roles.MERCHANT, roles.RESELLER, roles.SUB_RESELLER]
  },
  inventories: {
    inventory: [roles.MERCHANT, roles.RESELLER, roles.SUB_RESELLER, roles.EMPLOYEE]
  },
  admin: {
    merchant: [roles.ADMIN, roles.SUPER_ADMIN]
  },
  supperAdmin: {
    supperAdmin: [roles.SUPER_ADMIN]
  },
  merchantInvoices: {
    invoice: [roles.MERCHANT, roles.RESELLER, roles.SUB_RESELLER]
  }
};
