import React, { useEffect, useState } from 'react'

const AllAccounts = () => {
    const [account, setAccount] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        loadAccount();
    },[]);
    
    const loadAccount = async()=>{
        setIsLoading(true);
        try {
            const response = await getAccount();
            setAccount(response);
        } catch (error) {
            console.log(error);   
        }
        setIsLoading(false);
    }


  return (
    <div>
        {account.map((acc)=>{
            <div key={acc._id}>
                <h1>Account Number: {acc.accountName}</h1>
                <p>Balance: {acc.balance}</p>
                <p>IsDefault: {acc.isDefault}</p>
            </div>
        })}
    </div>
  )
}

export default AllAccounts