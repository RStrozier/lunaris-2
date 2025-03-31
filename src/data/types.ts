
  export interface Vehicle {
    id?: string; // Firestore document ID
    year: number; // Vehicle year
    make: string; // Vehicle make
    model: string; // Vehicle model
    type: "car" | "motorcycle" | "boat" | "other"; // Restrict type to specific values
    amountOwed: number; // Amount left owed
    currentWorth: number; // Current worth of the vehicle
  }

  export interface VehicleFormProps {
    newVehicle: Vehicle;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleAddVehicle: () => void;
  }

  export interface VehicleTotalProps {
    vehicleData: Vehicle[];
  }

  export interface VehicleListProps {
    vehicleData: Vehicle[];
    handleDeleteFromState: (id: string) => void;
  }

  export interface BankAccount {
    id?: string;
    name: string;
    type: "Checking" | "Savings" | "Investment";
    total: number;
  }

  export interface BankAccountFormProps {
    newBankAccount: BankAccount;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleAddBankAccount: () => void;
  }

  export interface BankAccountListProps {
    bankAccountData: BankAccount[]; // is a type of bank account
    userId: string;
    handleDeleteFromState: (id: string) => void;
  }

  export interface BankAccountTotalProps {
    bankAccountData: BankAccount[]; // Type of bank account
  }

  export interface RealEstate {
    id?: string; // Firestore document ID
    address: string; // Property address
    type: "residential" | "commercial" | "land" | "other"; // Type of property
    amountOwed: number; // Outstanding mortgage or loan
    currentWorth: number; // Current market value
  }

  export interface RealEstateListProps {
    realEstateData: RealEstate[];
    handleDeleteFromState: (id: string) => void;
  }

  export interface Investment {
    id?: string; // Firestore document ID
    name: string; // Name of the investment (e.g., stock name)
    type: "stocks" | "CDs" | "bonds" | "mutual funds" | "ETFs" | "cryptocurrency"; // Investment type
    amountInvested: number; // Total amount invested
    currentValue: number; // Current market value
  }

  export interface InvestmentFormProps {
    newInvestment: Investment;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleAddInvestment: () => void;
  }

  export interface InvestmentListProps {
    investmentData: Investment[];
    handleDeleteFromState: (id: string) => void;
  }

  export interface InvestmentTotalProps {
    investmentData: Investment[];
  }

  export interface OtherAsset {
    id?: string;
    name: string; 
    amountOwed: number; 
    worth: number;
  }

  export interface OtherAssetsFormProps {
    newOtherAsset: OtherAsset;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleAddOtherAsset: () => void;
  }

  export interface OtherAssetsListProps {
    otherAssetsData: OtherAsset[];
    handleDeleteFromState: (id: string) => void;
  }

  export interface OtherAssetsTotalProps {
    otherAssetsData: OtherAsset[];
  }

export interface SavingsFormProps {
  newSavings: {
    name: string;
    accountType: string;
    balance: number;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleAddSavings: () => void;
}

export interface SavingsListProps {
  savingsData: {
    id?: string;
    name: string;
    accountType: string;
    balance: number;
  }[];
  userId: string;
  handleDeleteFromState: (id: string) => void;
}

export interface SavingsTotalProps {
  savingsData: { balance: number }[];
}

export interface NetWorthProps {
  savingsData: any[];
  bankAccountData: any[];
  vehicleData: any[];
  realEstateData: any[];
  investmentData: any[];
  otherAssetsData: any[];
}

// Define the Debt interface
export interface Debt {
  id?: string; // Optional because Firestore assigns it
  name: string; // Name of the debt
  type: "Educational" | "Medical" | "Credit Card" | "Past Due Account" | "Other";
  totalAmount: number; // Total amount owed
  minPayment: number; // Minimum payment required
  interestRate: number; // Interest rate as a percentage
  dueDate: string; // Due date in "YYYY-MM-DD" format
}

export interface DebtFormProps {
  newDebt: Debt;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleAddDebt: () => void;
}

export interface DebtTotalProps {
  debtData: Debt[];
}
export interface Bill {
  id?: string;
  name: string;
  category: string;
  amount: number;
  dueDate: string;
  occurance: string;
}

export interface BillsListProps {
  billsData: Bill[];
  userId: string;
  handleDeleteFromState: (id: string) => void;
  calculateNextDueDate: (dueDate: string, occurance: string) => string;
}


export interface BillsFormProps {
  newBill: {
    name: string;
    category: string;
    amount: number;
    dueDate: string;
    occurance: string;
  };
  handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  handleAddBill: () => void;
}

export interface BillsTotalProps {
  totalMonthlyBills: number;
  totalYearlyBills: number;
}
